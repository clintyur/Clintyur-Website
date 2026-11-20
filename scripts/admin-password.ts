/**
 * Sets the password that protects /admin.
 *
 *   npm run admin:password -- 'your chosen password'          print the values
 *   npm run admin:password -- 'your chosen password' --push   send them to Vercel
 *
 * The password itself is never stored or transmitted — only its scrypt hash,
 * which cannot be reversed back into the password. Nobody but you ever knows it,
 * which also means nobody can recover it for you: run this again to change it.
 */
import { randomBytes } from 'crypto'
import { execFileSync } from 'child_process'
import './load-env'
import { hashPassword } from '../lib/admin-auth'

const args = process.argv.slice(2)
const push = args.includes('--push')
const password = args.find((a) => !a.startsWith('--'))

if (!password) {
  console.error("Usage: npm run admin:password -- 'your password' [--push]")
  process.exit(1)
}
if (password.length < 12) {
  console.error(`That password is ${password.length} characters. Use at least 12.`)
  process.exit(1)
}

const hash = hashPassword(password)

if (!push) {
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
  if (!process.env.ADMIN_SESSION_SECRET) {
    console.log(`ADMIN_SESSION_SECRET=${randomBytes(32).toString('hex')}`)
  }
  console.log('\nPaste into Vercel → Settings → Environment Variables,')
  console.log('or re-run with --push to send them automatically.')
  process.exit(0)
}

for (const env of ['production', 'preview', 'development']) {
  try {
    execFileSync(
      'vercel',
      ['env', 'add', 'ADMIN_PASSWORD_HASH', '-e', env, '--sensitive', '--force'],
      { input: hash, stdio: ['pipe', 'ignore', 'pipe'] },
    )
    console.log(`set for ${env}`)
  } catch (e: any) {
    console.error(`failed for ${env}: ${e?.stderr?.toString().trim() ?? e?.message}`)
    process.exit(1)
  }
}

console.log('\nPassword set. Redeploy for it to take effect:')
console.log('  vercel deploy --prod')
