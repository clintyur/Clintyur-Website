import { NextResponse } from 'next/server'
import {
  ADMIN_COOKIE,
  adminConfigured,
  createSessionValue,
  sessionCookieOptions,
  verifyPassword,
} from '@/lib/admin-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Blunt brake on guessing. Serverless means this is per-instance, not global —
 *  it slows an attacker down without pretending to be real rate limiting. */
const FAILURE_DELAY_MS = 600

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: 'Admin access is not configured on this deployment.' },
      { status: 503 },
    )
  }

  let password: unknown
  try {
    const body = await req.json()
    password = body?.password
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (typeof password !== 'string' || password.length === 0) {
    return NextResponse.json({ error: 'Enter your password.' }, { status: 400 })
  }

  const ok = verifyPassword(password, process.env.ADMIN_PASSWORD_HASH!)
  if (!ok) {
    await new Promise((r) => setTimeout(r, FAILURE_DELAY_MS))
    // Deliberately vague: no hint about whether anything matched.
    return NextResponse.json({ error: 'That password is not right.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, createSessionValue(), sessionCookieOptions)
  return res
}
