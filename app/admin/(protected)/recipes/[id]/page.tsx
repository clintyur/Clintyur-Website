import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { databaseEnabled } from '@/lib/content'
import { RecipeForm, EMPTY_RECIPE, type RecipeDraft } from '@/components/admin/RecipeForm'

export const dynamic = 'force-dynamic'

export default async function AdminRecipeEditPage({
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
          No database is connected to this deployment, so there is nowhere to save
          changes. <Link href="/admin/recipes">Back to recipes</Link>
        </p>
      </div>
    )
  }

  const isNew = id === 'new'

  let initial: RecipeDraft = EMPTY_RECIPE
  let title = 'New recipe'

  if (!isNew) {
    const r = await db.recipe.findUnique({
      where: { id },
      include: {
        groups: {
          orderBy: { order: 'asc' },
          include: { items: { orderBy: { order: 'asc' } } },
        },
      },
    })
    if (!r) notFound()

    const of = (kind: 'INGREDIENT' | 'STEP') => {
      const groups = r.groups
        .filter((g) => g.kind === kind)
        .map((g) => ({ name: g.name ?? '', items: g.items.map((i) => i.text).join('\n') }))
      // The editor always shows at least one block to type into.
      return groups.length ? groups : [{ name: '', items: '' }]
    }

    title = r.title
    initial = {
      id: r.id,
      title: r.title,
      slug: r.slug,
      description: r.description,
      heroImage: r.heroImage ?? '',
      introText: r.intro.join('\n'),
      notesText: r.notes.join('\n'),
      prepTime: r.prepTime?.toString() ?? '',
      cookTime: r.cookTime?.toString() ?? '',
      totalTimeMin: r.totalTimeMin?.toString() ?? '',
      totalTimeMax: r.totalTimeMax?.toString() ?? '',
      servings: r.servings ?? '',
      difficulty: r.difficulty,
      cuisine: r.cuisine ?? '',
      category: r.category,
      tagsText: r.tags.join(', '),
      isSubscriber: r.isSubscriber,
      isFeatured: r.isFeatured,
      ingredientGroups: of('INGREDIENT'),
      stepGroups: of('STEP'),
    }
  }

  return (
    <div className="container admin-page">
      <div className="admin-page-head">
        <div>
          <p className="admin-hint">
            <Link href="/admin/recipes">← Recipes</Link>
          </p>
          <h1 className="admin-h1">{title}</h1>
        </div>
      </div>
      <RecipeForm initial={initial} />
    </div>
  )
}
