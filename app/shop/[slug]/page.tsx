'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ShoppingBag, Check, Truck, RotateCcw, Shield } from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/components/shop/CartProvider'
import { cn } from '@/lib/utils'

const GUARANTEES = [
  { icon: Truck,      label: 'Free shipping over $75' },
  { icon: RotateCcw,  label: '30-day returns' },
  { icon: Shield,     label: '1-year warranty' },
]

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const colors = [...new Set(product.variants.map((v) => v.color).filter(Boolean))]
  const sizes  = [...new Set(product.variants.map((v) => v.size).filter(Boolean))]

  const selectVariant = (color?: string, size?: string) => {
    const match = product.variants.find((v) => {
      const matchColor = !color || v.color === color
      const matchSize  = !size  || v.size === size
      return matchColor && matchSize
    })
    if (match) setSelectedVariant(match)
  }

  const handleAddToCart = () => {
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      name: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      image: product.heroImage,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }


  return (
    <div className="pt-16 container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image gallery */}
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 mb-3">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                    selectedImage === i ? 'border-brand-500' : 'border-transparent'
                  )}
                >
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <span className="badge badge-stone mb-4 capitalize">{product.category.toLowerCase()}</span>

          <h1 className="font-serif text-display-sm text-stone-900 mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-stone-900 mb-2">{formatPrice(selectedVariant.price)}</p>
          <p className="text-stone-500 mb-6 leading-relaxed">{product.description}</p>

          {/* Color selector */}
          {colors.length > 0 && (
            <div className="mb-5">
              <p className="label mb-2">
                Color: <span className="text-stone-500 font-normal">{selectedVariant.color}</span>
              </p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => selectVariant(color ?? undefined, selectedVariant.size ?? undefined)}
                    className={cn(
                      'px-4 py-2 rounded-xl border text-sm font-medium transition-all',
                      selectedVariant.color === color
                        ? 'border-stone-800 bg-stone-900 text-white'
                        : 'border-stone-200 text-stone-700 hover:border-stone-400'
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {sizes.length > 0 && (
            <div className="mb-6">
              <p className="label mb-2">
                Size: <span className="text-stone-500 font-normal">{selectedVariant.size}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => {
                  const v = product.variants.find((vv) => vv.size === size && vv.color === selectedVariant.color)
                  const outOfStock = v?.stock === 0
                  return (
                    <button
                      key={size}
                      disabled={outOfStock}
                      onClick={() => selectVariant(selectedVariant.color ?? undefined, size ?? undefined)}
                      className={cn(
                        'w-12 h-12 rounded-xl border text-sm font-medium transition-all',
                        selectedVariant.size === size
                          ? 'border-stone-800 bg-stone-900 text-white'
                          : outOfStock
                          ? 'border-stone-100 text-stone-300 cursor-not-allowed line-through'
                          : 'border-stone-200 text-stone-700 hover:border-stone-400'
                      )}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Stock warning */}
          {selectedVariant.stock > 0 && selectedVariant.stock <= 5 && (
            <p className="text-terracotta-600 text-sm font-medium mb-4">
              Only {selectedVariant.stock} left in stock — order soon
            </p>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={selectedVariant.stock === 0}
            className={cn(
              'w-full btn-primary btn-lg gap-3 mb-4 transition-all',
              added && 'bg-green-600 shadow-none'
            )}
          >
            {added ? (
              <><Check size={18} /> Added to bag</>
            ) : (
              <><ShoppingBag size={18} /> Add to bag — {formatPrice(selectedVariant.price)}</>
            )}
          </button>

          {/* Member discount note */}
          <p className="text-center text-sm text-stone-400 mb-6">
            yur cooked members save 10% on every order.{' '}
            <a href="/subscribe" className="text-brand-600 hover:underline">Join today →</a>
          </p>

          {/* Guarantees */}
          <div className="border-t border-stone-100 pt-6 grid grid-cols-3 gap-3">
            {GUARANTEES.map(({ icon: Icon, label }) => (
              <div key={label} className="text-center">
                <Icon size={18} className="mx-auto text-stone-400 mb-1" />
                <p className="text-xs text-stone-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
