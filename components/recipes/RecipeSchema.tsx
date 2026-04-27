// JSON-LD structured data for recipe SEO (schema.org/Recipe)

interface Recipe {
  title: string
  description: string
  heroImage: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: string
  cuisine?: string
  tags: string[]
  rating?: number
  commentCount?: number
}

export function RecipeSchema({ recipe }: { recipe: Recipe }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: [recipe.heroImage],
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.prepTime + recipe.cookTime}M`,
    recipeYield: `${recipe.servings} servings`,
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
      name: 'Provecho',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Provecho',
      url: 'https://provecho.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
