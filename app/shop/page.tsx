'use client'

import { useState } from 'react'

const PRODUCTS = [
  { id: '1', name: 'Cast Iron Pan', price: '$65', category: 'Cookware', tag: 'Essential' },
  { id: '2', name: 'Chef Knife', price: '$140', category: 'Cookware', tag: null },
  { id: '3', name: 'Apron', price: '$48', category: 'Apparel', tag: 'New' },
  { id: '4', name: 'Cutting Board', price: '$85', category: 'Cookware', tag: null },
  { id: '5', name: 'Cookbook', price: '$42', category: 'Books', tag: 'Limited' },
  { id: '6', name: 'Kitchen Towel', price: '$16', category: 'Apparel', tag: null },
]

const CATEGORIES = ['All', 'Cookware', 'Apparel', 'Books']

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <div>
      {/* Shop hero */}
      <section className="book-hero">
        <div className="book-hero-img">
          <image-slot></image-slot>
        </div>
        <div className="book-hero-info">
          <div className="book-meta">
            <span>Shop</span>
            <span>Curated</span>
          </div>
          <h1 className="book-title">Goods that <span className="it">matter</span></h1>
          <p className="book-desc">
            Everything in the shop has been chosen because it's useful, well-made, and something I actually use in my own kitchen.
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
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Shop grid */}
      <section className="container" style={{ padding: '0 0 clamp(72px, 10vw, 140px)' }}>
        <div className="shop-grid">
          {filtered.map((product) => (
            <a key={product.id} href={`/shop/${product.id}`} className="product">
              <div className="product-img">
                {product.tag && (
                  <div className="product-tag-row">
                    <span className="product-tag">{product.tag}</span>
                  </div>
                )}
                <image-slot></image-slot>
                <span className="product-img quick">Quick view</span>
              </div>
              <div className="product-meta">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">{product.price}</span>
              </div>
              <p className="product-cat">{product.category}</p>
            </a>
          ))}
        </div>
      </section>
          <a
            href="/shop"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${!category ? 'bg-stone-100 text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
          >
            All products
          </a>
          {CATS.map((cat) => (
            <a
              key={cat}
              href={`/shop?category=${cat.toLowerCase()}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${category?.toUpperCase() === cat ? 'bg-stone-100 text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
            >
              {CATEGORY_LABELS[cat]}
            </a>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="section py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <p className="text-5xl mb-4">🛍️</p>
            <p className="font-serif text-xl text-stone-600">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
