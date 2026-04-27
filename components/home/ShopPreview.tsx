import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/shop/ProductCard'
import { MOCK_PRODUCTS } from '@/lib/mock-data'

export function ShopPreview() {
  const featured = MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, 3)

  return (
    <section className="section-pad">
      <div className="section">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
              The Provecho shop
            </p>
            <h2 className="text-display-md font-serif text-stone-900">
              Made to last
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors group"
          >
            Shop all
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link
          href="/shop"
          className="flex sm:hidden items-center justify-center gap-2 mt-8 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
        >
          Shop all products
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
