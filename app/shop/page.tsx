import type { Metadata } from 'next'
import { ProductCard } from '@/components/shop/ProductCard'
import { MOCK_PRODUCTS } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Cookware, aprons, and apparel built for serious home cooks. Made with care.',
}

const CATEGORY_LABELS: Record<string, string> = {
  APPAREL: 'Apparel',
  COOKWARE: 'Cookware',
  ACCESSORIES: 'Accessories',
}

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { category } = params

  const filtered = MOCK_PRODUCTS.filter((p) => {
    if (category && p.category.toLowerCase() !== category.toLowerCase()) return false
    return true
  })

  const CATS = ['APPAREL', 'COOKWARE', 'ACCESSORIES']

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="section py-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
            The shop
          </p>
          <h1 className="text-display-lg font-serif text-stone-900 mb-4">
            Built to last
          </h1>
          <p className="text-stone-500 text-lg max-w-xl">
            Cookware you pass down. Aprons that tell a story. T-shirts soft enough to cook in on a Sunday.
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="border-b border-stone-100 bg-white sticky top-16 z-20">
        <div className="section flex gap-1 py-2 overflow-x-auto">
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
