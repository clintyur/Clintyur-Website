/**
 * Compares what the database now serves against what the committed mock data
 * serves, line for line. Content migrations are the one place where "it built
 * fine" means nothing — the only proof is that every ingredient and every step
 * still reads exactly the same.
 *
 *   DATABASE_URL=... npx tsx scripts/verify-migration.ts
 */
import { PrismaClient } from '@prisma/client'
import { MOCK_RECIPES } from '../lib/mock-data'

const db = new PrismaClient()

type Group = { name: string | null; items: string[] }

/** The same normalisation lib/content.ts applies to the older `sections` shape. */
function expected(r: any): { ingredients: Group[]; steps: Group[] } {
  if (r.ingredientGroups?.length || r.stepGroups?.length) {
    return {
      ingredients: (r.ingredientGroups ?? []).map((g: any) => ({ name: g.name ?? null, items: g.items ?? [] })),
      steps: (r.stepGroups ?? []).map((g: any) => ({ name: g.name ?? null, items: g.items ?? [] })),
    }
  }
  if (r.sections?.length) {
    const solo = r.sections.length === 1
    return {
      ingredients: r.sections.filter((s: any) => s.ingredients?.length)
        .map((s: any) => ({ name: solo ? null : s.name ?? null, items: s.ingredients })),
      steps: r.sections.filter((s: any) => s.instructions?.length)
        .map((s: any) => ({ name: solo ? null : s.name ?? null, items: s.instructions })),
    }
  }
  return { ingredients: [], steps: [] }
}

function totalOf(min: number | null, max: number | null) {
  if (min == null && max == null) return null
  if (min === max) return min
  return `${min}–${max}`
}

async function main() {
  const rows = await db.recipe.findMany({
    include: { groups: { orderBy: { order: 'asc' }, include: { items: { orderBy: { order: 'asc' } } } } },
  })
  const bySlug = new Map(rows.map((r) => [r.slug, r]))

  const problems: string[] = []
  let ingredientLines = 0
  let stepLines = 0

  for (const m of MOCK_RECIPES as any[]) {
    const d = bySlug.get(m.slug)
    if (!d) { problems.push(`MISSING ENTIRELY: ${m.slug}`); continue }

    const check = (label: string, a: unknown, b: unknown) => {
      if (JSON.stringify(a) !== JSON.stringify(b)) {
        problems.push(`${m.slug} · ${label}\n    mock: ${JSON.stringify(a)}\n    db:   ${JSON.stringify(b)}`)
      }
    }

    check('title', m.title, d.title)
    check('description', m.description, d.description)
    check('heroImage', m.heroImage ?? null, d.heroImage)
    check('servings', m.servings == null ? null : String(m.servings), d.servings)
    check('prepTime', m.prepTime ?? null, d.prepTime)
    check('cookTime', m.cookTime ?? null, d.cookTime)
    check('totalTime', m.totalTime ?? null, totalOf(d.totalTimeMin, d.totalTimeMax))
    check('difficulty', m.difficulty ?? 'MEDIUM', d.difficulty)
    check('category', m.category, d.category)
    check('cuisine', m.cuisine ?? null, d.cuisine)
    check('tags', m.tags ?? [], d.tags)
    check('intro', m.intro ?? [], d.intro)
    check('notes', m.notes ?? [], d.notes)
    check('isFeatured', Boolean(m.isFeatured), d.isFeatured)
    check('isSubscriber', Boolean(m.isSubscriber), d.isSubscriber)

    const exp = expected(m)
    const got = (kind: 'INGREDIENT' | 'STEP'): Group[] =>
      d.groups.filter((g) => g.kind === kind)
        .map((g) => ({ name: g.name, items: g.items.map((i) => i.text) }))

    check('ingredient groups', exp.ingredients, got('INGREDIENT'))
    check('step groups', exp.steps, got('STEP'))

    ingredientLines += exp.ingredients.reduce((n, g) => n + g.items.length, 0)
    stepLines += exp.steps.reduce((n, g) => n + g.items.length, 0)
  }

  const extra = rows.filter((r) => !(MOCK_RECIPES as any[]).some((m) => m.slug === r.slug))
  for (const e of extra) problems.push(`IN DB BUT NOT IN MOCK DATA: ${e.slug}`)

  console.log(`recipes checked:   ${MOCK_RECIPES.length}`)
  console.log(`ingredient lines:  ${ingredientLines}`)
  console.log(`step lines:        ${stepLines}`)
  console.log('')

  if (problems.length) {
    console.log(`${problems.length} MISMATCH(ES):\n`)
    problems.forEach((p) => console.log('  ' + p))
    process.exit(1)
  }
  console.log('No differences. Every field and every line matches.')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => db.$disconnect())
