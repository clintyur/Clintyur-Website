'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

const CATEGORY_LABELS: Record<string, string> = {
  COOKWARE: 'Cookware',
  APPAREL: 'Apparel',
  ACCESSORIES: 'Accessories',
  DIGITAL: 'Digital',
}

/**
 * The interactive half of the shop. Products are fetched on the server and
 * passed in, so the catalogue is never bundled into the client and a product
 * added in /admin shows up without a redeploy.
 */
export function ShopBrowser({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('All')

  // Derived from the products actually on hand, not a fixed list.
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Category filter — pointless with nothing to filter */}
      {products.length > 0 && (
        <section className="container" style={{ padding: 'clamp(40px, 6vw, 72px) 0' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`form pill${activeCategory === cat ? ' active' : ''}`}
                style={{ margin: 0 }}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>
        </section>
      )}

      <section
        className="container"
        style={{ padding: 'clamp(40px, 6vw, 72px) 0 clamp(72px, 10vw, 140px)' }}
      >
        {filtered.length === 0 ? (
          <div className="shop-empty">
            <h2 className="section-title" style={{ fontSize: 'clamp(26px,3.5vw,40px)' }}>
              Nothing in the shop <span className="it">yet</span>
            </h2>
            <p className="book-desc" style={{ maxWidth: '520px', marginTop: '16px' }}>
              New goods are on the way. In the meantime there are{' '}
              <Link href="/recipes" style={{ color: 'var(--accent)' }}>recipes to cook</Link>.
            </p>
          </div>
        ) : (
          <div className="shop-grid">
            {filtered.map((product) => {
              const price = Math.min(...product.variants.map((v) => v.price))
              const inStock = product.variants.some((v) => v.stock > 0)
              return (
                <Link key={product.id} href={`/shop/${product.slug}`} className="product">
                  <div className="product-img">
                    {(product.isFeatured || !inStock) && (
                      <div className="product-tag-row">
                        <span className="product-tag">{inStock ? 'Featured' : 'Sold out'}</span>
                      </div>
                    )}
                    <Image
                      src={product.heroImage}
                      alt={product.name}
                      width={800}
                      height={1000}
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                    <span className="quick">Quick view</span>
                  </div>
                  <div className="product-meta">
                    <h3 className="product-name">{product.name}</h3>
                    <span className="product-price">{formatPrice(price)}</span>
                  </div>
                  <p className="product-cat">
                    {CATEGORY_LABELS[product.category] ?? product.category}
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
