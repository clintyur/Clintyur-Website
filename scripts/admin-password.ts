/**
 * Sets the password that protects /admin.
 *
 *   npm run admin:password -- --push     asks for the password, sends it to Vercel
 *   npm run admin:password               asks, then prints the values to paste
 *
 * With no password argument it prompts, with the typing hidden. That is the way
 * to use it: a password typed as a command-line argument is left behind in your
 * shell history and is visible to anything reading the terminal.
 *
 * The password itself is never stored or transmitted — only its scrypt hash,
 * which cannot be reversed back into the password.
 */
import { randomBytes } from 'crypto'
import { execFileSync } from 'child_process'
import { createInterface } from 'readline'
import './load-env'
import { hashPassword } from '../lib/admin-auth'

const MIN_LENGTH = 12

/** Reads a line from the terminal without echoing what is typed. */
function askHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true })

    // readline echoes each keystroke through _writeToOutput. Replacing it with
    // a version that only ever writes the prompt keeps the password off screen.
    let prompted = false
    ;(rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput = (s: string) => {
      if (!prompted) {
        process.stdout.write(question)
        prompted = true
      }
      if (s.includes('\n')) process.stdout.write('\n')
    }

    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

async function readPassword(): Promise<string> {
  if (!process.stdin.isTTY) {
    console.error('No terminal available to ask for a password.')
    process.exit(1)
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    const first = await askHidden('New admin password: ')
    if (first.length < MIN_LENGTH) {
      console.error(`That is ${first.length} characters. Use at least ${MIN_LENGTH}.\n`)
      continue
    }
    // Asked twice on purpose: a typo here locks you out of your own site, and
    // the hash is one-way so nobody can tell you what you actually typed.
    const second = await askHidden('Type it again to confirm: ')
    if (first !== second) {
      console.error('Those did not match. Try again.\n')
      continue
    }
    return first
  }

  console.error('Giving up after three attempts.')
  process.exit(1)
}

async function main() {
  const args = process.argv.slice(2)
  const push = args.includes('--push')
  const fromArg = args.find((a) => !a.startsWith('--'))

  if (fromArg) {
    console.warn(
      'Warning: passing the password as an argument leaves it in your shell history.\n' +
        '         Run without it next time and you will be asked instead.\n',
    )
    if (fromArg.length < MIN_LENGTH) {
      console.error(`That password is ${fromArg.length} characters. Use at least ${MIN_LENGTH}.`)
      process.exit(1)
    }
  }

  const password = fromArg ?? (await readPassword())
  const hash = hashPassword(password)

  if (!push) {
    console.log(`\nADMIN_PASSWORD_HASH=${hash}`)
    if (!process.env.ADMIN_SESSION_SECRET) {
      console.log(`ADMIN_SESSION_SECRET=${randomBytes(32).toString('hex')}`)
    }
    console.log('\nPaste into Vercel → Settings → Environment Variables,')
    console.log('or re-run with --push to send it automatically.')
    return
  }

  console.log('')
  for (const env of ['production', 'preview', 'development']) {
    try {
      execFileSync(
        'vercel',
        ['env', 'add', 'ADMIN_PASSWORD_HASH', '-e', env, '--sensitive', '--force'],
        { input: hash, stdio: ['pipe', 'ignore', 'pipe'] },
      )
      console.log(`  set for ${env}`)
    } catch (e: unknown) {
      const err = e as { stderr?: Buffer; message?: string }
      console.error(`  failed for ${env}: ${err.stderr?.toString().trim() ?? err.message}`)
      process.exit(1)
    }
  }

  console.log('\nPassword set. Now redeploy so it takes effect:')
  console.log('  vercel deploy --prod')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
