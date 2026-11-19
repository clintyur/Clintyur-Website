import type { Metadata } from 'next'
import Image from 'next/image'
import { getProducts } from '@/lib/content'
import { ShopBrowser } from '@/components/shop/ShopBrowser'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Cookware and goods chosen because they are useful, well made, and actually used in my own kitchen.',
}

export default async function ShopPage() {
  const products = await getProducts()

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

      <ShopBrowser products={products} />
    </div>
  )
}
