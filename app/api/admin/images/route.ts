import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import path from 'path'
import { isAdmin } from '@/lib/admin-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i

/**
 * Lists the photos committed under public/images so the editor can pick one
 * without an upload. Ingredient thumbnails live in a subfolder and are excluded
 * — they are never a recipe's main photo.
 */
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 })
  }

  try {
    const dir = path.join(process.cwd(), 'public', 'images')
    const entries = await readdir(dir, { withFileTypes: true })
    const images = entries
      .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
      .map((e) => `/images/${e.name}`)
      .sort()

    return NextResponse.json({ images })
  } catch {
    // A read-only or missing directory is not an error worth breaking the
    // editor over — it just means there is nothing to pick from.
    return NextResponse.json({ images: [] })
  }
}
