'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'
import { slugify } from '@/lib/utils'

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Not authorised')
}

/**
 * Prices are entered in dollars because that is what a person has in their head,
 * and stored in cents because that is the only safe way to hold money. Parsing
 * is deliberately strict: "12.5" and "12.50" both mean 1250, and anything that
 * is not a clean amount is rejected rather than silently rounded.
 */
const dollarsToCents = z
  .string()
  .trim()
  .refine((s) => /^\d+(\.\d{1,2})?$/.test(s), 'Price must look like 24 or 24.50')
  .transform((s) => Math.round(Number(s) * 100))

const variantSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, 'Every option needs a name').max(120),
  sku: z.string().trim().min(1, 'Every option needs a SKU').max(80),
  price: dollarsToCents,
  stock: z.number().int().min(0).max(1_000_000).default(0),
  size: z.string().trim().max(40).nullable().default(null),
  color: z.string().trim().max(40).nullable().default(null),
})

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, 'Give it a name').max(200),
  slug: z.string().trim().max(200).optional(),
  description: z.string().trim().max(4000).default(''),
  heroImage: z.string().trim().min(1, 'A product needs a photo').max(500),
  category: z.enum(['APPAREL', 'COOKWARE', 'ACCESSORIES', 'DIGITAL']).default('COOKWARE'),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  variants: z.array(variantSchema).min(1, 'Add at least one option with a price'),
})

export type ActionResult = { ok: true; slug: string } | { ok: false; error: string }

export async function saveProduct(raw: unknown): Promise<ActionResult> {
  await requireAdmin()

  const parsed = productSchema.safeParse(raw)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Check the form and try again.' }
  }
  const v = parsed.data

  const slug = slugify(v.slug?.trim() || v.name)
  if (!slug) return { ok: false, error: 'That name does not produce a usable web address.' }

  const clash = await db.product.findFirst({
    where: { slug, ...(v.id ? { NOT: { id: v.id } } : {}) },
    select: { id: true },
  })
  if (clash) return { ok: false, error: `Another product already uses the address "${slug}".` }

  // A SKU is the identifier a payment or stock system keys on, so a duplicate
  // has to be caught before it reaches the database's unique index.
  const skus = v.variants.map((x) => x.sku)
  const dupe = skus.find((s, i) => skus.indexOf(s) !== i)
  if (dupe) return { ok: false, error: `Two options share the SKU "${dupe}".` }

  const takenElsewhere = await db.productVariant.findFirst({
    where: {
      sku: { in: skus },
      ...(v.id ? { product: { id: { not: v.id } } } : {}),
    },
    select: { sku: true },
  })
  if (takenElsewhere) {
    return { ok: false, error: `The SKU "${takenElsewhere.sku}" is already used by another product.` }
  }

  const data = {
    name: v.name,
    description: v.description,
    heroImage: v.heroImage,
    images: [],
    category: v.category,
    isFeatured: v.isFeatured,
    isActive: v.isActive,
  }

  const product = v.id
    ? await db.product.update({ where: { id: v.id }, data: { ...data, slug } })
    : await db.product.create({ data: { ...data, slug } })

  // Variants are reconciled rather than rebuilt: an order line references a
  // variant, so deleting and recreating them would orphan order history.
  const existing = await db.productVariant.findMany({
    where: { productId: product.id },
    select: { id: true },
  })
  const keep = new Set(v.variants.map((x) => x.id).filter(Boolean) as string[])
  const remove = existing.filter((e) => !keep.has(e.id)).map((e) => e.id)

  if (remove.length) {
    const inUse = await db.orderItem.findFirst({
      where: { variantId: { in: remove } },
      select: { id: true },
    })
    if (inUse) {
      return {
        ok: false,
        error:
          'One of the options you removed has already been ordered. Set its stock to 0 instead of deleting it, so the order history stays intact.',
      }
    }
    await db.productVariant.deleteMany({ where: { id: { in: remove } } })
  }

  for (const x of v.variants) {
    const fields = {
      name: x.name,
      sku: x.sku,
      price: x.price,
      stock: x.stock,
      size: x.size || null,
      color: x.color || null,
    }
    if (x.id) {
      await db.productVariant.update({ where: { id: x.id }, data: fields })
    } else {
      await db.productVariant.create({ data: { ...fields, productId: product.id } })
    }
  }

  revalidatePath('/shop')
  revalidatePath(`/shop/${slug}`)
  revalidatePath('/admin/shop')
  revalidatePath('/')

  return { ok: true, slug }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  await requireAdmin()

  const product = await db.product.findUnique({ where: { id }, select: { slug: true } })
  if (!product) return { ok: false, error: 'That product no longer exists.' }

  const ordered = await db.orderItem.findFirst({ where: { productId: id }, select: { id: true } })
  if (ordered) {
    return {
      ok: false,
      error:
        'This product has been ordered before, so deleting it would break that order history. Untick "Show in the shop" to hide it instead.',
    }
  }

  await db.product.delete({ where: { id } })

  revalidatePath('/shop')
  revalidatePath('/admin/shop')
  revalidatePath('/')

  return { ok: true, slug: product.slug }
}
