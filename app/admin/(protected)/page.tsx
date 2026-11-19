import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MOCK_RECIPES, MOCK_PRODUCTS, MOCK_POSTS } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Content review',
  robots: { index: false, follow: false },
}

type Row = {
  title: string
  slug: string
  href: string
  image: string | null
  issues: string[]
  ok: boolean
}

function recipeRows(): Row[] {
  return MOCK_RECIPES.map((r) => {
    const hasMethod =
      ('sections' in r && (r.sections?.length ?? 0) > 0) ||
      ('stepGroups' in r && (r.stepGroups?.length ?? 0) > 0)
    const issues: string[] = []
    if (!hasMethod) issues.push('no ingredients or method')
    if (!r.heroImage) issues.push('no photo')
    else if (r.heroImage.startsWith('http')) issues.push('stock photo')
    if (r.prepTime == null && r.cookTime == null) issues.push('no times')
    if (r.servings == null) issues.push('no yield')
    if (r.description.trim().endsWith('.') && r.description.replace(/\.$/, '') === r.title)
      issues.push('description is just the title')
    return {
      title: r.title, slug: r.slug, href: `/recipes/${r.slug}`,
      image: r.heroImage, issues, ok: issues.length === 0,
    }
  })
}

function Section({ title, rows }: { title: string; rows: Row[] }) {
  const clean = rows.filter((r) => r.ok).length
  return (
    <section style={{ marginBottom: 'clamp(48px, 7vw, 88px)' }}>
      <div className="admin-head">
        <h2 className="section-title" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>{title}</h2>
        <span className="admin-count">{clean} / {rows.length} complete</span>
      </div>
      <div className="admin-grid">
        {rows.map((r) => (
          <Link key={r.slug} href={r.href} className={`admin-card${r.ok ? ' is-ok' : ''}`}>
            <div className="admin-thumb">
              {r.image ? (
                <Image src={r.image} alt="" width={240} height={240} sizes="120px" />
              ) : (
                <span className="admin-nophoto">no photo</span>
              )}
            </div>
            <div className="admin-body">
              <h3 className="admin-title">{r.title}</h3>
              <p className="admin-slug">{r.slug}</p>
              {r.ok ? (
                <p className="admin-ok">Complete</p>
              ) : (
                <ul className="admin-issues">
                  {r.issues.map((i) => <li key={i}>{i}</li>)}
                </ul>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function AdminPage() {
  const recipes = recipeRows()

  const products: Row[] = MOCK_PRODUCTS.map((p) => {
    const issues: string[] = []
    if (p.heroImage.startsWith('http')) issues.push('stock photo')
    if (!p.variants.length) issues.push('no variants')
    if (p.variants.every((v) => v.stock === 0)) issues.push('out of stock')
    return { title: p.name, slug: p.slug, href: `/shop/${p.slug}`, image: p.heroImage, issues, ok: issues.length === 0 }
  })

  const posts: Row[] = MOCK_POSTS.map((b) => {
    const issues: string[] = []
    if (!b.body?.length) issues.push('no article body')
    if (b.heroImage.startsWith('http')) issues.push('stock photo')
    return { title: b.title, slug: b.slug, href: `/blog/${b.slug}`, image: b.heroImage, issues, ok: issues.length === 0 }
  })

  const all = [...recipes, ...products, ...posts]
  const outstanding = all.filter((r) => !r.ok).length

  return (
    <div className="container" style={{ padding: 'clamp(96px,12vw,150px) 0 clamp(72px,10vw,120px)' }}>
      <div className="eyebrow"><span className="dot"></span>Internal</div>
      <h1 className="book-title" style={{ marginBottom: '16px' }}>
        Content <span className="it">review</span>
      </h1>
      <p className="book-desc" style={{ maxWidth: '620px' }}>
        Everything the site publishes, with whatever is missing from each item.
        {outstanding > 0
          ? ` ${outstanding} of ${all.length} entries still need something.`
          : ' Everything is complete.'}{' '}
        This page is set to noindex and is not linked from the site.
      </p>

      <div style={{ marginTop: 'clamp(40px,6vw,72px)' }}>
        <Section title="Recipes" rows={recipes} />
        <Section title="Shop" rows={products} />
        <Section title="Journal" rows={posts} />
      </div>
    </div>
  )
}
