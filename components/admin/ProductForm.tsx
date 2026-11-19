'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { saveProduct, deleteProduct } from '@/app/admin/(protected)/shop/actions'
import { ImagePicker } from '@/components/admin/ImagePicker'

export type VariantDraft = {
  id?: string
  name: string
  sku: string
  price: string
  stock: string
  size: string
  color: string
}

export type ProductDraft = {
  id?: string
  name: string
  slug: string
  description: string
  heroImage: string
  category: 'APPAREL' | 'COOKWARE' | 'ACCESSORIES' | 'DIGITAL'
  isFeatured: boolean
  isActive: boolean
  variants: VariantDraft[]
}

export const EMPTY_VARIANT: VariantDraft = {
  name: 'One size', sku: '', price: '', stock: '0', size: '', color: '',
}

export const EMPTY_PRODUCT: ProductDraft = {
  name: '', slug: '', description: '', heroImage: '',
  category: 'COOKWARE', isFeatured: false, isActive: true,
  variants: [{ ...EMPTY_VARIANT }],
}

export function ProductForm({ initial }: { initial: ProductDraft }) {
  const router = useRouter()
  const [v, setV] = useState<ProductDraft>(initial)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()

  const set = <K extends keyof ProductDraft>(k: K, value: ProductDraft[K]) => {
    setV((p) => ({ ...p, [k]: value }))
  }

  const setVariant = (i: number, patch: Partial<VariantDraft>) =>
    setV((p) => ({
      ...p,
      variants: p.variants.map((x, xi) => (xi === i ? { ...x, ...patch } : x)),
    }))

  const addVariant = () =>
    setV((p) => ({ ...p, variants: [...p.variants, { ...EMPTY_VARIANT, name: '' }] }))

  const removeVariant = (i: number) =>
    setV((p) => ({ ...p, variants: p.variants.filter((_, xi) => xi !== i) }))

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    start(async () => {
      const res = await saveProduct({
        id: v.id,
        name: v.name,
        slug: v.slug,
        description: v.description,
        heroImage: v.heroImage,
        category: v.category,
        isFeatured: v.isFeatured,
        isActive: v.isActive,
        variants: v.variants.map((x) => ({
          id: x.id,
          name: x.name,
          sku: x.sku,
          price: x.price,
          stock: Number(x.stock.trim() || '0'),
          size: x.size || null,
          color: x.color || null,
        })),
      })
      if (!res.ok) { setError(res.error); return }
      router.push('/admin/shop')
      router.refresh()
    })
  }

  function onDelete() {
    if (!v.id) return
    if (!confirm(`Delete "${v.name}"? This cannot be undone.`)) return
    start(async () => {
      const res = await deleteProduct(v.id!)
      if (!res.ok) { setError(res.error); return }
      router.push('/admin/shop')
      router.refresh()
    })
  }

  return (
    <form onSubmit={onSubmit} className="admin-form">
      <section className="admin-section">
        <h2>The basics</h2>

        <label className="admin-label" htmlFor="name">Name</label>
        <input id="name" className="admin-input" value={v.name} required
          onChange={(e) => set('name', e.target.value)} />

        <label className="admin-label" htmlFor="pslug">Web address</label>
        <input id="pslug" className="admin-input" value={v.slug}
          placeholder="made-from-the-name"
          onChange={(e) => set('slug', e.target.value)} />

        <label className="admin-label" htmlFor="pdesc">Description</label>
        <textarea id="pdesc" className="admin-textarea" rows={4} value={v.description}
          onChange={(e) => set('description', e.target.value)} />

        <label className="admin-label">Photo</label>
        <ImagePicker value={v.heroImage} onChange={(src) => set('heroImage', src)} />

        <label className="admin-label" htmlFor="pcat">Category</label>
        <select id="pcat" className="admin-input" value={v.category}
          onChange={(e) => set('category', e.target.value as ProductDraft['category'])}>
          <option value="COOKWARE">Cookware</option>
          <option value="APPAREL">Apparel</option>
          <option value="ACCESSORIES">Accessories</option>
          <option value="DIGITAL">Digital</option>
        </select>

        <div className="admin-checks">
          <label className="admin-check">
            <input type="checkbox" checked={v.isActive}
              onChange={(e) => set('isActive', e.target.checked)} />
            <span>Show in the shop</span>
          </label>
          <label className="admin-check">
            <input type="checkbox" checked={v.isFeatured}
              onChange={(e) => set('isFeatured', e.target.checked)} />
            <span>Feature on the home page</span>
          </label>
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section-head">
          <h2>Options &amp; price</h2>
          <button type="button" className="admin-btn-ghost" onClick={addVariant}>
            + Add an option
          </button>
        </div>
        <p className="admin-hint">
          One row per thing someone can actually buy — a size, a colour, or just
          &ldquo;One size&rdquo;. The SKU is your own code for it and has to be unique
          across the whole shop. Price in dollars.
        </p>

        {v.variants.map((x, i) => (
          <div key={i} className="admin-group">
            <div className="admin-grid-3">
              <div>
                <label className="admin-label">Option name</label>
                <input className="admin-input" value={x.name} placeholder="One size"
                  onChange={(e) => setVariant(i, { name: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">SKU</label>
                <input className="admin-input" value={x.sku} placeholder="YC-APRON-01"
                  onChange={(e) => setVariant(i, { sku: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Price ($)</label>
                <input className="admin-input" inputMode="decimal" value={x.price}
                  placeholder="48.00"
                  onChange={(e) => setVariant(i, { price: e.target.value })} />
              </div>
            </div>
            <div className="admin-grid-3">
              <div>
                <label className="admin-label">In stock</label>
                <input className="admin-input" inputMode="numeric" value={x.stock}
                  onChange={(e) => setVariant(i, { stock: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Size</label>
                <input className="admin-input" value={x.size}
                  onChange={(e) => setVariant(i, { size: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Colour</label>
                <input className="admin-input" value={x.color}
                  onChange={(e) => setVariant(i, { color: e.target.value })} />
              </div>
            </div>
            {v.variants.length > 1 && (
              <button type="button" className="admin-btn-danger-ghost"
                onClick={() => removeVariant(i)}>
                Remove this option
              </button>
            )}
          </div>
        ))}
      </section>

      {error && <p className="admin-error" role="alert">{error}</p>}

      <div className="admin-actions">
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? 'Saving…' : v.id ? 'Save changes' : 'Create product'}
        </button>
        <Link href="/admin/shop" className="admin-btn-ghost">Cancel</Link>
        {v.id && (
          <button type="button" className="admin-btn-danger" onClick={onDelete} disabled={pending}>
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
