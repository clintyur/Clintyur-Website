import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import sharp from 'sharp'
import { isAdmin } from '@/lib/admin-auth'
import { slugify } from '@/lib/utils'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BYTES = 25 * 1024 * 1024
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/heic', 'image/heif']

/** Matches the ceiling every other recipe photo on the site already respects. */
const MAX_EDGE = 2000

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          'Photo uploads are not switched on yet. Until then you can pick a photo that is already on the site.',
      },
      { status: 503 },
    )
  }

  const form = await req.formData().catch(() => null)
  const file = form?.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file received.' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'That photo is larger than 25MB.' }, { status: 413 })
  }
  if (file.type && !ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: `${file.type} is not an image type we can use.` }, { status: 415 })
  }

  const input = Buffer.from(await file.arrayBuffer())

  let output: Buffer
  try {
    // rotate() applies the EXIF orientation flag and then clears it, so photos
    // taken on a phone do not arrive sideways. Re-encoding to JPEG also strips
    // location data out of the EXIF before anything is published.
    output = await sharp(input)
      .rotate()
      .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()
  } catch {
    return NextResponse.json(
      { error: 'That file could not be read as a photo.' },
      { status: 422 },
    )
  }

  const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'photo'
  const blob = await put(`recipes/${base}.jpg`, output, {
    access: 'public',
    contentType: 'image/jpeg',
    addRandomSuffix: true,
  })

  return NextResponse.json({ url: blob.url })
}
