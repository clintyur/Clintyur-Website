'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

const CATEGORY_LABELS: Record<string, string> = {
  COOKWARE: 'Cookware',
  APPAREL: 'Apparel',
  ACCESSORIES: 'Accessories',
}

const CATEGORIES = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category)))]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((p) => p.category === activeCategory)

  return (
    <div>
      {/* Shop hero */}
      <section className="book-hero">
        <div className="book-hero-img">
          <Image
            src="/images/wagyu-prep.jpg"
            alt="Knives and cookware laid out on the prep counter"
            width={1200}
            height={1600}
            priority
            sizes="(max-width: 880px) 100vw, 50vw"
          />
        </div>
        <div className="book-hero-info">
          <div className="book-meta">
            <span>Shop</span>
            <span>Curated</span>
          </div>
          <h1 className="book-title">Goods that <span className="it">matter</span></h1>
          <p className="book-desc">
            Everything in the shop has been chosen because it&apos;s useful, well-made, and something I actually use in my own kitchen.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="container" style={{ padding: 'clamp(40px, 6vw, 72px) 0' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
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

      {/* Shop grid */}
      <section className="container" style={{ padding: '0 0 clamp(72px, 10vw, 140px)' }}>
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
                <p className="product-cat">{CATEGORY_LABELS[product.category] ?? product.category}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
