'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'
import { slugify } from '@/lib/utils'

/**
 * Server actions are POST endpoints in their own right — being rendered inside
 * a protected layout does not protect them. Every action re-checks the cookie.
 */
async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Not authorised')
}

/** Splits a textarea into one entry per non-empty line. */
const lines = z
  .string()
  .default('')
  .transform((s) =>
    s.split('\n').map((l) => l.trim()).filter(Boolean),
  )

const groupSchema = z.object({
  name: z.string().trim().max(120).nullable().default(null),
  items: lines,
})

const recipeSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, 'Give it a title').max(200),
  slug: z.string().trim().max(200).optional(),
  description: z.string().trim().max(2000).default(''),
  heroImage: z.string().trim().max(500).nullable().default(null),
  introText: lines,
  notesText: lines,
  prepTime: z.number().int().min(0).max(10000).nullable().default(null),
  cookTime: z.number().int().min(0).max(10000).nullable().default(null),
  totalTimeMin: z.number().int().min(0).max(10000).nullable().default(null),
  totalTimeMax: z.number().int().min(0).max(10000).nullable().default(null),
  servings: z.string().trim().max(60).nullable().default(null),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  cuisine: z.string().trim().max(80).nullable().default(null),
  category: z.string().trim().min(1).max(80).default('Mains'),
  tagsText: z.string().default('').transform((s) =>
    s.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
  ),
  isSubscriber: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  ingredientGroups: z.array(groupSchema).default([]),
  stepGroups: z.array(groupSchema).default([]),
})

export type RecipeFormValues = z.input<typeof recipeSchema>
export type ActionResult = { ok: true; slug: string } | { ok: false; error: string }

export async function saveRecipe(raw: unknown): Promise<ActionResult> {
  await requireAdmin()

  const parsed = recipeSchema.safeParse(raw)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return { ok: false, error: first?.message ?? 'Check the form and try again.' }
  }
  const v = parsed.data

  // A blank total is stored as two nulls; a single figure stores the same value
  // in both bounds so "30" and "30–30" cannot drift apart.
  let min = v.totalTimeMin
  let max = v.totalTimeMax
  if (min == null && max != null) min = max
  if (max == null && min != null) max = min
  if (min != null && max != null && min > max) [min, max] = [max, min]

  const slug = slugify(v.slug?.trim() || v.title)
  if (!slug) return { ok: false, error: 'That title does not produce a usable web address.' }

  const clash = await db.recipe.findFirst({
    where: { slug, ...(v.id ? { NOT: { id: v.id } } : {}) },
    select: { id: true },
  })
  if (clash) return { ok: false, error: `Another recipe already uses the address "${slug}".` }

  const data = {
    title: v.title,
    description: v.description,
    heroImage: v.heroImage || null,
    intro: v.introText,
    notes: v.notesText,
    prepTime: v.prepTime,
    cookTime: v.cookTime,
    totalTimeMin: min,
    totalTimeMax: max,
    servings: v.servings || null,
    difficulty: v.difficulty,
    cuisine: v.cuisine || null,
    category: v.category,
    tags: v.tagsText,
    isSubscriber: v.isSubscriber,
    isFeatured: v.isFeatured,
  }

  const recipe = v.id
    ? await db.recipe.update({ where: { id: v.id }, data: { ...data, slug } })
    : await db.recipe.create({ data: { ...data, slug, publishedAt: new Date() } })

  // Groups are rebuilt rather than diffed: the editor submits the whole recipe,
  // and a rebuild cannot leave a stale line behind.
  await db.recipeGroup.deleteMany({ where: { recipeId: recipe.id } })

  const toCreate = [
    ...v.ingredientGroups.map((g, i) => ({ ...g, kind: 'INGREDIENT' as const, order: i })),
    ...v.stepGroups.map((g, i) => ({ ...g, kind: 'STEP' as const, order: i })),
  ].filter((g) => g.items.length > 0)

  for (const g of toCreate) {
    await db.recipeGroup.create({
      data: {
        recipeId: recipe.id,
        kind: g.kind,
        name: g.name?.trim() || null,
        order: g.order,
        items: { create: g.items.map((text, i) => ({ text, order: i })) },
      },
    })
  }

  revalidatePath('/recipes')
  revalidatePath(`/recipes/${slug}`)
  revalidatePath('/admin/recipes')
  revalidatePath('/')

  return { ok: true, slug }
}

export async function deleteRecipe(id: string): Promise<ActionResult> {
  await requireAdmin()

  const recipe = await db.recipe.findUnique({ where: { id }, select: { slug: true } })
  if (!recipe) return { ok: false, error: 'That recipe no longer exists.' }

  await db.recipe.delete({ where: { id } })

  revalidatePath('/recipes')
  revalidatePath('/admin/recipes')
  revalidatePath('/')

  return { ok: true, slug: recipe.slug }
}
