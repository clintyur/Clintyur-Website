import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://provecho.com'
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/account/'] },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
