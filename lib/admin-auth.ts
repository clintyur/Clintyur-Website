/**
 * Admin authentication — deliberately separate from NextAuth.
 *
 * NextAuth handles *public* sign-in (Google/GitHub) for comments and
 * memberships. That is the wrong tool for the one person who edits the site:
 * it would mean registering an OAuth app just to log in, and it would tie the
 * ability to publish to a third party's account. This is a single password,
 * held as a scrypt hash in an environment variable, plus a signed cookie.
 *
 * Uses only node:crypto — no new dependency, no native build step.
 */
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'yc_admin'
const SESSION_HOURS = 12
const SCRYPT_KEYLEN = 64

/**
 * "scrypt:<saltHex>:<keyHex>" — the format stored in ADMIN_PASSWORD_HASH.
 *
 * Colon-separated, not the conventional "$", because this value lives in an
 * environment variable: dotenv (and most shells and CI systems) treat "$name"
 * as a variable reference and silently expand it to nothing, which corrupts the
 * hash and makes the right password look wrong.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16)
  const key = scryptSync(password, salt, SCRYPT_KEYLEN)
  return `scrypt:${salt.toString('hex')}:${key.toString('hex')}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, saltHex, keyHex] = stored.split(':')
  if (scheme !== 'scrypt' || !saltHex || !keyHex) return false

  let expected: Buffer
  try {
    expected = Buffer.from(keyHex, 'hex')
  } catch {
    return false
  }
  if (expected.length !== SCRYPT_KEYLEN) return false

  const actual = scryptSync(password, Buffer.from(saltHex, 'hex'), SCRYPT_KEYLEN)
  return timingSafeEqual(actual, expected)
}

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET
  if (!s) throw new Error('ADMIN_SESSION_SECRET is not set')
  return s
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('hex')
}

/** Cookie value is "<expiryEpochMs>.<hmac>" — stateless, so no session table. */
export function createSessionValue(): string {
  const exp = String(Date.now() + SESSION_HOURS * 60 * 60 * 1000)
  return `${exp}.${sign(exp)}`
}

export function isValidSessionValue(value: string | undefined): boolean {
  if (!value) return false
  const [exp, mac] = value.split('.')
  if (!exp || !mac) return false

  const expected = sign(exp)
  // Compare as equal-length buffers so a wrong-length forgery cannot throw.
  if (mac.length !== expected.length) return false
  if (!timingSafeEqual(Buffer.from(mac, 'hex'), Buffer.from(expected, 'hex'))) return false

  const expiry = Number(exp)
  return Number.isFinite(expiry) && expiry > Date.now()
}

/** True when the caller holds a valid, unexpired admin cookie. */
export async function isAdmin(): Promise<boolean> {
  try {
    const jar = await cookies()
    return isValidSessionValue(jar.get(ADMIN_COOKIE)?.value)
  } catch {
    return false
  }
}

/** Is admin access configured at all? Lets the UI show an honest setup message. */
export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_SESSION_SECRET)
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_HOURS * 60 * 60,
}
