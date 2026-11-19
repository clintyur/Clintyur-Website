import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { databaseEnabled } from '@/lib/content'
import {
  ProductForm,
  EMPTY_PRODUCT,
  type ProductDraft,
} from '@/components/admin/ProductForm'

export const dynamic = 'force-dynamic'

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!databaseEnabled()) {
    return (
      <div className="container admin-page">
        <h1 className="admin-h1">Editing is switched off</h1>
        <p className="admin-notice">
          No database is connected to this deployment.{' '}
          <Link href="/admin/shop">Back to the shop</Link>
        </p>
      </div>
    )
  }

  const isNew = id === 'new'
  let initial: ProductDraft = EMPTY_PRODUCT
  let title = 'New product'

  if (!isNew) {
    const p = await db.product.findUnique({
      where: { id },
      include: { variants: { orderBy: { price: 'asc' } } },
    })
    if (!p) notFound()

    title = p.name
    initial = {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      heroImage: p.heroImage,
      category: p.category,
      isFeatured: p.isFeatured,
      isActive: p.isActive,
      variants: p.variants.length
        ? p.variants.map((v) => ({
            id: v.id,
            name: v.name,
            sku: v.sku,
            // Cents back to the dollars-and-cents the editor shows.
            price: (v.price / 100).toFixed(2),
            stock: String(v.stock),
            size: v.size ?? '',
            color: v.color ?? '',
          }))
        : EMPTY_PRODUCT.variants,
    }
  }

  return (
    <div className="container admin-page">
      <div className="admin-page-head">
        <div>
          <p className="admin-hint"><Link href="/admin/shop">← Shop</Link></p>
          <h1 className="admin-h1">{title}</h1>
        </div>
      </div>
      <ProductForm initial={initial} />
    </div>
  )
}
