import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://yurcooked.com'
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/account/'] },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
