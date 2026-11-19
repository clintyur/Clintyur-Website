import Link from 'next/link'
import { db } from '@/lib/db'
import { databaseEnabled } from '@/lib/content'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminShopPage() {
  const live = databaseEnabled()

  const products = live
    ? await db.product.findMany({
        orderBy: { createdAt: 'asc' },
        include: { variants: { orderBy: { price: 'asc' } } },
      })
    : []

  return (
    <div className="container admin-page">
      <div className="admin-page-head">
        <div>
          <h1 className="admin-h1">Shop</h1>
          <p className="admin-hint">
            {live ? `${products.length} product${products.length === 1 ? '' : 's'}` : 'Not connected'}
          </p>
        </div>
        {live && <Link href="/admin/shop/new" className="btn-primary">New product</Link>}
      </div>

      {!live && (
        <p className="admin-notice">
          The shop can&apos;t be edited because no database is connected to this
          deployment.
        </p>
      )}

      {live && products.length === 0 && (
        <p className="admin-notice">
          The shop is empty. Anything you add here appears on the shop page, in the
          sitemap and at checkout automatically.
        </p>
      )}

      <div className="admin-list">
        {products.map((p) => {
          const prices = p.variants.map((v) => v.price)
          const stock = p.variants.reduce((n, v) => n + v.stock, 0)
          const range =
            prices.length === 0
              ? '—'
              : Math.min(...prices) === Math.max(...prices)
                ? formatPrice(Math.min(...prices))
                : `${formatPrice(Math.min(...prices))}–${formatPrice(Math.max(...prices))}`

          return (
            <div key={p.id} className="admin-row">
              <div className="admin-row-thumb">
                {p.heroImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.heroImage} alt="" loading="lazy" />
                ) : (
                  <span className="admin-row-nothumb">no photo</span>
                )}
              </div>

              <div className="admin-row-main">
                <h2>{p.name}</h2>
                <p className="admin-row-meta">
                  {range} · {p.variants.length} option{p.variants.length === 1 ? '' : 's'} ·{' '}
                  {stock} in stock
                </p>
                <div className="admin-row-flags">
                  {!p.isActive && <span className="admin-flag is-warn">hidden</span>}
                  {stock === 0 && p.isActive && (
                    <span className="admin-flag is-warn">sold out</span>
                  )}
                  {p.isFeatured && <span className="admin-flag">featured</span>}
                </div>
              </div>

              <div className="admin-row-actions">
                <Link href={`/shop/${p.slug}`} className="admin-btn-ghost">View</Link>
                <Link href={`/admin/shop/${p.id}`} className="admin-btn-ghost">Edit</Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
