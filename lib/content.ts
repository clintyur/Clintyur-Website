/**
 * The single place the site reads its content from.
 *
 * Content is moving out of lib/mock-data.ts and into the database so it can be
 * edited from /admin. During that move this module reads from the database when
 * DATABASE_URL is set and falls back to the committed mock data when it is not,
 * so a deployment without a database still serves exactly what it serves today.
 *
 * Everything returned is shaped like the old mock-data entries on purpose —
 * pages should not have to care which source they got.
 */
import 'server-only'
import { db } from '@/lib/db'
import { MOCK_RECIPES, MOCK_PRODUCTS, type Product } from '@/lib/mock-data'

export type RecipeGroupView = { name: string | null; items: string[] }

export type RecipeView = {
  id: string
  slug: string
  title: string
  description: string
  heroImage: string | null
  images: string[]
  intro?: string[]
  notes?: string[]
  prepTime: number | null
  cookTime: number | null
  totalTime?: number | string | null
  servings: number | string | null
  difficulty: string
  cuisine?: string
  category: string
  tags: string[]
  isSubscriber: boolean
  isFeatured: boolean
  rating?: number
  commentCount?: number
  likeCount?: number
  ingredientGroups?: RecipeGroupView[]
  stepGroups?: RecipeGroupView[]
}

export function databaseEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL)
}

/** Rebuilds the display value formatDuration() expects from the stored bounds. */
function totalTimeOf(min: number | null, max: number | null): number | string | null {
  if (min == null && max == null) return null
  if (min == null) return max
  if (max == null) return min
  return min === max ? min : `${min}–${max}`
}

type DbRecipe = Awaited<ReturnType<typeof fetchRecipes>>[number]

function fetchRecipes() {
  return db.recipe.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      groups: {
        orderBy: { order: 'asc' },
        include: { items: { orderBy: { order: 'asc' } } },
      },
      _count: { select: { likes: true, comments: true } },
    },
  })
}

function toRecipeView(r: DbRecipe): RecipeView {
  const pick = (kind: 'INGREDIENT' | 'STEP'): RecipeGroupView[] =>
    r.groups
      .filter((g) => g.kind === kind)
      .map((g) => ({ name: g.name, items: g.items.map((i) => i.text) }))

  const ingredientGroups = pick('INGREDIENT')
  const stepGroups = pick('STEP')

  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    heroImage: r.heroImage,
    images: r.images,
    intro: r.intro.length ? r.intro : undefined,
    notes: r.notes.length ? r.notes : undefined,
    prepTime: r.prepTime,
    cookTime: r.cookTime,
    totalTime: totalTimeOf(r.totalTimeMin, r.totalTimeMax),
    servings: r.servings,
    difficulty: r.difficulty,
    cuisine: r.cuisine ?? undefined,
    category: r.category,
    tags: r.tags,
    isSubscriber: r.isSubscriber,
    isFeatured: r.isFeatured,
    commentCount: r._count.comments,
    likeCount: r._count.likes,
    ingredientGroups: ingredientGroups.length ? ingredientGroups : undefined,
    stepGroups: stepGroups.length ? stepGroups : undefined,
  }
}

/**
 * The mock entries carry two content shapes. Normalise the older `sections`
 * shape into groups here too, so consumers only ever see one shape regardless
 * of which source answered.
 */
function mockToRecipeView(r: any): RecipeView {
  let ingredientGroups: RecipeGroupView[] | undefined = r.ingredientGroups
  let stepGroups: RecipeGroupView[] | undefined = r.stepGroups

  if (!ingredientGroups && !stepGroups && r.sections?.length) {
    const solo = r.sections.length === 1
    ingredientGroups = r.sections
      .filter((s: any) => s.ingredients?.length)
      .map((s: any) => ({ name: solo ? null : s.name ?? null, items: s.ingredients }))
    stepGroups = r.sections
      .filter((s: any) => s.instructions?.length)
      .map((s: any) => ({ name: solo ? null : s.name ?? null, items: s.instructions }))
  }

  return {
    ...r,
    heroImage: r.heroImage ?? null,
    images: r.images ?? [],
    servings: r.servings ?? null,
    ingredientGroups: ingredientGroups?.length ? ingredientGroups : undefined,
    stepGroups: stepGroups?.length ? stepGroups : undefined,
  }
}

export async function getRecipes(): Promise<RecipeView[]> {
  if (!databaseEnabled()) return (MOCK_RECIPES as any[]).map(mockToRecipeView)
  return (await fetchRecipes()).map(toRecipeView)
}

export async function getRecipe(slug: string): Promise<RecipeView | null> {
  if (!databaseEnabled()) {
    const r = (MOCK_RECIPES as any[]).find((x) => x.slug === slug)
    return r ? mockToRecipeView(r) : null
  }
  const all = await fetchRecipes()
  const r = all.find((x) => x.slug === slug)
  return r ? toRecipeView(r) : null
}

export async function getProducts(): Promise<Product[]> {
  if (!databaseEnabled()) return MOCK_PRODUCTS

  const rows = await db.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
    include: { variants: { orderBy: { price: 'asc' } } },
  })

  return rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    heroImage: p.heroImage,
    images: p.images,
    category: p.category,
    isFeatured: p.isFeatured,
    variants: p.variants.map((v) => ({
      id: v.id,
      name: v.name,
      sku: v.sku,
      price: v.price,
      stock: v.stock,
      color: v.color ?? undefined,
      size: v.size ?? undefined,
    })),
  })) as Product[]
}

export async function getProduct(slug: string): Promise<Product | null> {
  const all = await getProducts()
  return all.find((p) => p.slug === slug) ?? null
}
