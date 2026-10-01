'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useCart } from '@/components/shop/CartProvider'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

export default function CartPage() {
  const { items, count, subtotal, removeItem, updateQty, clear } = useCart()
  const [coupon, setCoupon] = useState('')
  const [loading, setLoading] = useState(false)
  const shipping = subtotal >= 7500 ? 0 : 695

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
          couponCode: coupon || undefined,
        }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  if (count === 0) {
    return (
      <div className="pt-16 container py-24 text-center">
        <ShoppingBag size={48} className="text-stone-200 mx-auto mb-4" />
        <h1 className="font-serif text-2xl text-stone-900 mb-2">Your bag is empty</h1>
        <p className="text-stone-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop" className="btn-primary">Browse the shop</Link>
      </div>
    )
  }

  return (
    <div className="pt-16 container py-12">
      <h1 className="font-serif text-display-sm text-stone-900 mb-8">Your bag ({count})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-4 bg-white rounded-2xl border border-stone-100 p-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-stone-800 text-sm truncate">{item.name}</p>
                <p className="text-stone-400 text-xs mb-2">{item.variantName}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-200 rounded-lg">
                    <button
                      onClick={() => updateQty(item.variantId, item.quantity - 1)}
                      className="px-2 py-1.5 hover:bg-stone-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.variantId, item.quantity + 1)}
                      className="px-2 py-1.5 hover:bg-stone-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-stone-300 hover:text-rose-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="font-bold text-stone-900">{formatPrice(item.price * item.quantity)}</p>
                <p className="text-xs text-stone-400">{formatPrice(item.price)} each</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-stone-100 shadow-card p-6 sticky top-24">
            <h2 className="font-semibold text-stone-800 mb-5">Order summary</h2>

            <div className="space-y-3 mb-5 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              {subtotal < 7500 && (
                <p className="text-xs text-stone-400">
                  Add {formatPrice(7500 - subtotal)} more for free shipping
                </p>
              )}
              <div className="flex justify-between font-bold text-stone-900 text-base pt-3 border-t border-stone-100">
                <span>Total</span>
                <span>{formatPrice(subtotal + shipping)}</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="flex gap-2 mb-5">
              <div className="relative flex-1">
                <Tag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Coupon code"
                  className="input pl-8 text-sm py-2"
                />
              </div>
              <button className="btn-secondary btn-sm">Apply</button>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary btn-lg w-full gap-2"
            >
              {loading ? 'Redirecting…' : 'Checkout'}
              {!loading && <ArrowRight size={16} />}
            </button>

            <p className="text-center text-xs text-stone-400 mt-3">
              Members save 10% automatically at checkout
            </p>

            <Link href="/shop" className="block text-center text-sm text-stone-400 hover:text-stone-600 mt-3 transition-colors">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
