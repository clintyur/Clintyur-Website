import { PrismaClient } from '@prisma/client'
import { MOCK_RECIPES, MOCK_PRODUCTS } from '../lib/mock-data'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database…')

  // Recipes
  for (const r of MOCK_RECIPES) {
    await db.recipe.upsert({
      where: { slug: r.slug },
      update: {},
      create: {
        slug: r.slug,
        title: r.title,
        description: r.description,
        heroImage: r.heroImage,
        images: [r.heroImage],
        prepTime: r.prepTime,
        cookTime: r.cookTime,
        servings: r.servings,
        difficulty: r.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
        cuisine: r.cuisine,
        category: r.category,
        tags: r.tags,
        isSubscriber: r.isSubscriber,
        isFeatured: r.isFeatured,
        publishedAt: new Date(),
      },
    })
  }
  console.log(`  ✓ Seeded ${MOCK_RECIPES.length} recipes`)

  // Products
  for (const p of MOCK_PRODUCTS) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        heroImage: p.heroImage,
        images: p.images,
        category: p.category as 'APPAREL' | 'COOKWARE' | 'ACCESSORIES',
        isFeatured: p.isFeatured,
      },
    })

    for (const v of p.variants) {
      await db.productVariant.upsert({
        where: { sku: v.sku },
        update: {},
        create: {
          productId: product.id,
          name: v.name,
          sku: v.sku,
          price: v.price,
          stock: v.stock,
          size: (v as { size?: string }).size,
          color: v.color,
        },
      })
    }
  }
  console.log(`  ✓ Seeded ${MOCK_PRODUCTS.length} products`)

  console.log('✅ Seed complete!')
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
