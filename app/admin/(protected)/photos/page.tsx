import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import { MOCK_RECIPES, MOCK_PRODUCTS, MOCK_POSTS } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Photo review',
  robots: { index: false, follow: false },
}

interface Photo {
  file: string
  usedBy: string[]
}

/** Every photo in public/images, and what currently points at it. */
function photos(): Photo[] {
  const dir = path.join(process.cwd(), 'public', 'images')
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))

  // Collect every reference from the data and from the source that hardcodes paths.
  const refs = new Map<string, string[]>()
  const add = (src: string | null | undefined, label: string) => {
    if (!src?.startsWith('/images/')) return
    const key = src.replace('/images/', '')
    refs.set(key, [...(refs.get(key) ?? []), label])
  }

  for (const r of MOCK_RECIPES) add(r.heroImage, r.title)
  for (const p of MOCK_PRODUCTS) add(p.heroImage, p.name)
  for (const b of MOCK_POSTS) add(b.heroImage, b.title)

  // Paths written directly into page components.
  const hardcoded: Record<string, string> = {
    'hero-clint-wagyu.jpg': 'Home hero',
    'recipe-short-ribs.jpg': 'Recipes hero / Home preview',
    'wagyu-prep.jpg': 'Shop hero / Home preview',
    'clint-kitchen-line.jpg': 'About hero / Home preview',
    'logo-yurr.png': 'Brand mark (About page)',
  }
  for (const [file, label] of Object.entries(hardcoded)) {
    refs.set(file, [...(refs.get(file) ?? []), label])
  }

  return files
    .map((file) => ({ file, usedBy: refs.get(file) ?? [] }))
    .sort((a, b) => Number(a.usedBy.length === 0) - Number(b.usedBy.length === 0) || a.file.localeCompare(b.file))
}

export default function PhotoReviewPage() {
  const all = photos()
  const used = all.filter((p) => p.usedBy.length > 0)
  const unused = all.filter((p) => p.usedBy.length === 0)

  return (
    <div className="container" style={{ padding: 'clamp(96px,12vw,150px) 0 clamp(72px,10vw,120px)' }}>
      <div className="eyebrow"><span className="dot"></span>Internal</div>
      <h1 className="book-title" style={{ marginBottom: '16px' }}>
        Photo <span className="it">review</span>
      </h1>
      <p className="book-desc" style={{ maxWidth: '640px' }}>
        Every photo in the project and what points at it. {used.length} in use,{' '}
        {unused.length} sitting unused. Tell me which to delete and what the
        unused ones actually are, and I&apos;ll wire them up.{' '}
        <Link href="/admin" style={{ color: 'var(--accent)' }}>Content review →</Link>
      </p>

      {[{ title: 'In use', rows: used }, { title: 'Not used anywhere', rows: unused }].map((group) => (
        <section key={group.title} style={{ marginTop: 'clamp(40px,6vw,72px)' }}>
          <div className="admin-head">
            <h2 className="section-title" style={{ fontSize: 'clamp(26px,3.5vw,40px)' }}>{group.title}</h2>
            <span className="admin-count">{group.rows.length} photos</span>
          </div>
          <div className="photo-grid">
            {group.rows.map((p) => (
              <figure key={p.file} className="photo-card">
                <div className="photo-thumb">
                  <Image src={`/images/${p.file}`} alt="" width={420} height={420} sizes="200px" />
                </div>
                <figcaption>
                  <code>{p.file}</code>
                  {p.usedBy.length > 0
                    ? <span className="photo-use">{p.usedBy.join(' · ')}</span>
                    : <span className="photo-unused">unused</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
