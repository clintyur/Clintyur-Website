import type { Metadata } from 'next'
import { RecipeCard } from '@/components/recipes/RecipeCard'
import { RecipeFilters } from '@/components/recipes/RecipeFilters'
import { MOCK_RECIPES } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Browse all Provecho recipes — from weeknight mains to weekend baking projects.',
}

interface PageProps {
  searchParams: Promise<{ category?: string; difficulty?: string; q?: string }>
}

export default async function RecipesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { category, difficulty, q } = params

  const filtered = MOCK_RECIPES.filter((r) => {
    if (category && r.category.toLowerCase() !== category.toLowerCase()) return false
    if (difficulty && r.difficulty !== difficulty.toUpperCase()) return false
    if (q && !r.title.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  return (
    <div className="pt-16">
      {/* Page header */}
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="section py-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
            The kitchen
          </p>
          <h1 className="text-display-lg font-serif text-stone-900 mb-4">
            All Recipes
          </h1>
          <p className="text-stone-500 text-lg max-w-xl">
            {filtered.length} recipe{filtered.length !== 1 ? 's' : ''} — from quick weeknight
            dinners to ambitious weekend projects.
          </p>
        </div>
      </div>

      <div className="section py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-56 flex-shrink-0">
            <RecipeFilters active={{ category, difficulty, q }} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-stone-400">
                <p className="text-5xl mb-4">🍳</p>
                <p className="font-serif text-xl text-stone-600">No recipes found</p>
                <p className="text-sm mt-2">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 stagger">
                {filtered.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
