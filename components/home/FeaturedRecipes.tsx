import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RecipeCard } from '@/components/recipes/RecipeCard'
import { MOCK_RECIPES } from '@/lib/mock-data'

export function FeaturedRecipes() {
  const featured = MOCK_RECIPES.filter((r) => r.isFeatured).slice(0, 3)

  return (
    <section className="section-pad bg-stone-50">
      <div className="section">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
              What&apos;s cooking
            </p>
            <h2 className="text-display-md font-serif text-stone-900">
              Featured recipes
            </h2>
          </div>
          <Link
            href="/recipes"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors group"
          >
            View all
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {featured.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        <Link
          href="/recipes"
          className="flex sm:hidden items-center justify-center gap-2 mt-8 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
        >
          View all recipes
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
