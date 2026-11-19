/**
 * Loads .env.local then .env into process.env for standalone scripts.
 *
 * The Prisma CLI reads .env on its own, but a plain `tsx scripts/foo.ts` does
 * not, which is how you end up staring at "DATABASE_URL is not set" with the
 * variable sitting right there in the file. Deliberately dependency-free.
 *
 * Values already in the environment win, so an explicit
 * `DATABASE_URL=... npx tsx ...` still overrides the file.
 */
import { readFileSync, existsSync } from 'fs'
import path from 'path'

function loadFile(file: string) {
  if (!existsSync(file)) return
  for (const raw of readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue

    const eq = line.indexOf('=')
    if (eq === -1) continue

    const key = line.slice(0, eq).trim()
    if (!key || key in process.env) continue

    let value = line.slice(eq + 1).trim()
    // Strip one layer of matching quotes, the way dotenv does.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    process.env[key] = value
  }
}

loadFile(path.join(process.cwd(), '.env.local'))
loadFile(path.join(process.cwd(), '.env'))
