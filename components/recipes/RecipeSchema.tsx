// JSON-LD structured data for recipe SEO (schema.org/Recipe)
import { durationMaxMinutes } from '@/lib/utils'

interface Recipe {
  title: string
  description: string
  heroImage: string | null
  prepTime: number | null
  cookTime: number | null
  totalTime?: number | string | null
  servings: number | string | null
  difficulty: string
  cuisine?: string
  tags: string[]
  rating?: number
  commentCount?: number
}

export function RecipeSchema({ recipe }: { recipe: Recipe }) {
  // Most recipes carry prep + cook; the rest carry a single totalTime, which may
  // be a range like "90–120". Google wants one ISO duration, so a range reports
  // its upper bound — better to over-estimate than to leave someone short.
  const totalMinutes =
    recipe.prepTime != null && recipe.cookTime != null
      ? recipe.prepTime + recipe.cookTime
      : recipe.totalTime != null
        ? durationMaxMinutes(recipe.totalTime)
        : null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    ...(recipe.heroImage ? { image: [recipe.heroImage] } : {}),
    ...(recipe.prepTime != null ? { prepTime: `PT${recipe.prepTime}M` } : {}),
    ...(recipe.cookTime != null ? { cookTime: `PT${recipe.cookTime}M` } : {}),
    ...(totalMinutes != null ? { totalTime: `PT${totalMinutes}M` } : {}),
    ...(recipe.servings != null ? { recipeYield: `${recipe.servings} servings` } : {}),
    recipeCategory: recipe.tags[0] ?? 'Main',
    recipeCuisine: recipe.cuisine ?? 'American',
    keywords: recipe.tags.join(', '),
    ...(recipe.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: recipe.rating,
        ratingCount: recipe.commentCount ?? 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    author: {
      '@type': 'Person',
      name: 'yurr cooked',
    },
    publisher: {
      '@type': 'Organization',
      name: 'yurr cooked',
      url: 'https://yurr-cooked.vercel.app',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
