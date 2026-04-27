import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Stories, guides, and essays from the Provecho kitchen.',
}

const MOCK_POSTS = [
  {
    slug: 'carbon-steel-vs-cast-iron',
    title: 'Carbon Steel vs. Cast Iron: The Real Differences',
    excerpt: 'We cooked the same meal in both pans for 30 days. Here is what we found.',
    category: 'Gear',
    heroImage: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=80',
    publishedAt: '2024-12-15',
    readTime: 7,
  },
  {
    slug: 'how-to-build-flavor',
    title: 'The 5 Techniques That Build Real Flavor',
    excerpt: 'Caramelization, fond, fat, acid, salt — master these and everything you cook improves.',
    category: 'Technique',
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    publishedAt: '2024-12-08',
    readTime: 10,
  },
  {
    slug: 'pantry-setup-guide',
    title: 'The Provecho Pantry Setup Guide',
    excerpt: 'The 40 ingredients we always have on hand — and why they matter.',
    category: 'Pantry',
    heroImage: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&q=80',
    publishedAt: '2024-11-30',
    readTime: 12,
  },
]

export default function BlogPage() {
  const [featured, ...rest] = MOCK_POSTS

  return (
    <div className="pt-16">
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="section py-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">The journal</p>
          <h1 className="text-display-lg font-serif text-stone-900 mb-4">Stories from the kitchen</h1>
          <p className="text-stone-500 text-lg max-w-xl">Technique deep-dives, gear guides, and essays about cooking with intention.</p>
        </div>
      </div>

      <div className="section py-12">
        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
              <Image
                src={featured.heroImage}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="badge badge-brand mb-3">{featured.category}</span>
              <h2 className="font-serif text-display-sm text-stone-900 mb-3 group-hover:text-brand-700 transition-colors">
                {featured.title}
              </h2>
              <p className="text-stone-500 leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-stone-400">
                <span>{formatDate(featured.publishedAt)}</span>
                <span>{featured.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2 mt-4 text-brand-600 font-medium text-sm group-hover:gap-3 transition-all">
                Read article <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </Link>

        {/* Rest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 stagger">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card group block">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <span className="badge badge-stone mb-2">{post.category}</span>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-stone-500 line-clamp-2">{post.excerpt}</p>
                <div className="flex justify-between text-xs text-stone-400 mt-3">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
