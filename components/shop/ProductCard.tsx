'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useCart } from './CartProvider'

interface Variant {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  size?: string
  color?: string
}

interface ProductCardProps {
  product: {
    id: string
    slug: string
    name: string
    description: string
    heroImage: string
    category: string
    isFeatured: boolean
    variants: Variant[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const cheapest = product.variants.reduce((a, b) => a.price < b.price ? a : b)
  const hasMultipleVariants = product.variants.length > 1

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    // If only one variant, add directly; otherwise let user pick on PDP
    if (product.variants.length === 1) {
      addItem({ variantId: cheapest.id, productId: product.id, quantity: 1, name: product.name, price: cheapest.price, image: product.heroImage, variantName: cheapest.name })
    } else {
      window.location.href = `/shop/${product.slug}`
    }
  }

  return (
    <article className="card group relative animate-slide-up">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
          <button
            onClick={handleQuickAdd}
            className="btn-primary btn-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingBag size={14} />
            {hasMultipleVariants ? 'Choose options' : 'Add to bag'}
          </button>
        </div>
        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="badge bg-white/90 backdrop-blur-sm text-stone-600 shadow-sm capitalize text-xs">
            {product.category.toLowerCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-stone-900 mb-1 leading-snug group-hover:text-brand-700 transition-colors">
          <Link href={`/shop/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-stone-900">{formatPrice(cheapest.price)}</span>
            {hasMultipleVariants && (
              <span className="text-xs text-stone-400 ml-1">from</span>
            )}
          </div>
          {cheapest.stock <= 5 && cheapest.stock > 0 && (
            <span className="text-xs font-medium text-terracotta-600">
              Only {cheapest.stock} left
            </span>
          )}
          {cheapest.stock === 0 && (
            <span className="text-xs font-medium text-stone-400">Out of stock</span>
          )}
        </div>
      </div>
    </article>
  )
}
