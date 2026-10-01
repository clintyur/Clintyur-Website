import type { MetadataRoute } from 'next'
import { MOCK_RECIPES } from '@/lib/mock-data'
import { MOCK_PRODUCTS } from '@/lib/mock-data'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://yurcooked.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/recipes`, lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/shop`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/blog`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/subscribe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const recipePages: MetadataRoute.Sitemap = MOCK_RECIPES.map((r) => ({
    url: `${BASE}/recipes/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const productPages: MetadataRoute.Sitemap = MOCK_PRODUCTS.map((p) => ({
    url: `${BASE}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...recipePages, ...productPages]
}
