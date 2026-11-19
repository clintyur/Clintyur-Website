/**
 * Generates the two environment variables that protect /admin.
 *
 *   npx tsx scripts/admin-password.ts 'your chosen password'
 *
 * Prints the values to paste into Vercel. The password itself is never stored
 * anywhere — only its scrypt hash, which cannot be reversed back into it.
 */
import { randomBytes } from 'crypto'
import { hashPassword } from '../lib/admin-auth'

const password = process.argv[2]

if (!password || password.length < 12) {
  console.error('Usage: npx tsx scripts/admin-password.ts <password>')
  console.error('Use at least 12 characters.')
  process.exit(1)
}

console.log(`ADMIN_PASSWORD_HASH=${hashPassword(password)}`)
console.log(`ADMIN_SESSION_SECRET=${randomBytes(32).toString('hex')}`)
