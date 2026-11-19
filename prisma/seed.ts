/**
 * Migrates the hand-written content in lib/mock-data.ts into the database.
 *
 * Safe to re-run: every record is upserted by its natural key (recipe slug,
 * product slug), and a recipe's groups are rebuilt from scratch each time so a
 * re-run can never leave orphaned or duplicated ingredient lines behind.
 *
 *   npm run db:seed
 */
import '../scripts/load-env'
import { PrismaClient, GroupKind, Difficulty } from '@prisma/client'
import { MOCK_RECIPES, MOCK_PRODUCTS } from '../lib/mock-data'

const db = new PrismaClient()

/** "90–120" -> [90, 120]; 30 -> [30, 30]; anything unparseable -> [null, null]. */
function parseRange(v: number | string | null | undefined): [number | null, number | null] {
  if (v == null) return [null, null]
  if (typeof v === 'number') return [v, v]
  const parts = String(v).split(/[–—-]/).map((p) => Number(p.trim()))
  if (parts.some((n) => !Number.isFinite(n))) return [null, null]
  return parts.length === 1 ? [parts[0], parts[0]] : [Math.min(...parts), Math.max(...parts)]
}

type GroupSeed = { kind: GroupKind; name: string | null; order: number; items: string[] }

/**
 * Normalises the two content shapes in mock-data into one list of groups.
 *
 * `ingredientGroups` / `stepGroups` are independent of each other and map
 * straight across. The older `sections` shape pairs ingredients with
 * instructions under one heading; each section becomes an ingredient group and
 * a step group sharing that heading. No text is lost either way.
 */
function groupsFor(r: any): GroupSeed[] {
  const out: GroupSeed[] = []

  if (r.ingredientGroups?.length || r.stepGroups?.length) {
    r.ingredientGroups?.forEach((g: any, i: number) =>
      out.push({ kind: GroupKind.INGREDIENT, name: g.name ?? null, order: i, items: g.items ?? [] }),
    )
    r.stepGroups?.forEach((g: any, i: number) =>
      out.push({ kind: GroupKind.STEP, name: g.name ?? null, order: i, items: g.items ?? [] }),
    )
    return out
  }

  if (r.sections?.length) {
    r.sections.forEach((s: any, i: number) => {
      // A lone unnamed section is a recipe without headings, not a section.
      const name = r.sections.length === 1 ? null : (s.name ?? null)
      if (s.ingredients?.length)
        out.push({ kind: GroupKind.INGREDIENT, name, order: i, items: s.ingredients })
      if (s.instructions?.length)
        out.push({ kind: GroupKind.STEP, name, order: i, items: s.instructions })
    })
  }

  return out
}

async function seedRecipes() {
  let created = 0
  let updated = 0

  for (const r of MOCK_RECIPES as any[]) {
    const [totalTimeMin, totalTimeMax] = parseRange(r.totalTime)

    const data = {
      title: r.title,
      description: r.description,
      heroImage: r.heroImage ?? null,
      images: r.images ?? [],
      intro: r.intro ?? [],
      notes: r.notes ?? [],
      prepTime: r.prepTime ?? null,
      cookTime: r.cookTime ?? null,
      totalTimeMin,
      totalTimeMax,
      servings: r.servings == null ? null : String(r.servings),
      difficulty: (r.difficulty ?? 'MEDIUM') as Difficulty,
      cuisine: r.cuisine ?? null,
      category: r.category,
      tags: r.tags ?? [],
      isSubscriber: Boolean(r.isSubscriber),
      isFeatured: Boolean(r.isFeatured),
      publishedAt: new Date(),
    }

    const existing = await db.recipe.findUnique({ where: { slug: r.slug } })
    const recipe = existing
      ? await db.recipe.update({ where: { slug: r.slug }, data })
      : await db.recipe.create({ data: { ...data, slug: r.slug } })
    existing ? updated++ : created++

    // Rebuild groups wholesale. Cascade removes the items with them.
    await db.recipeGroup.deleteMany({ where: { recipeId: recipe.id } })
    for (const g of groupsFor(r)) {
      await db.recipeGroup.create({
        data: {
          recipeId: recipe.id,
          kind: g.kind,
          name: g.name,
          order: g.order,
          items: { create: g.items.map((text, i) => ({ text, order: i })) },
        },
      })
    }
  }

  return { created, updated }
}

async function seedProducts() {
  let n = 0
  for (const p of MOCK_PRODUCTS as any[]) {
    const data = {
      name: p.name,
      description: p.description,
      heroImage: p.heroImage,
      images: p.images ?? [],
      category: p.category,
      isFeatured: Boolean(p.isFeatured),
      isActive: true,
    }
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: data,
      create: { ...data, slug: p.slug },
    })
    for (const v of p.variants ?? []) {
      await db.productVariant.upsert({
        where: { sku: v.sku },
        update: {
          name: v.name, price: v.price, stock: v.stock,
          size: v.size ?? null, color: v.color ?? null,
        },
        create: {
          productId: product.id, name: v.name, sku: v.sku,
          price: v.price, stock: v.stock,
          size: v.size ?? null, color: v.color ?? null,
        },
      })
    }
    n++
  }
  return n
}

async function main() {
  const r = await seedRecipes()
  const p = await seedProducts()

  const groups = await db.recipeGroup.count()
  const items = await db.recipeGroupItem.count()
  console.log(
    `recipes: ${r.created} created, ${r.updated} updated\n` +
    `groups:  ${groups}\n` +
    `lines:   ${items}\n` +
    `products: ${p}`,
  )
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => db.$disconnect())
