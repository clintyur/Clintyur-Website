import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { MOCK_POSTS } from '@/lib/mock-data'

export function generateStaticParams() {
  return MOCK_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = MOCK_POSTS.find((p) => p.slug === slug)
  if (!post) return { title: 'Not found' }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: [{ url: post.heroImage }],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = MOCK_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <article className="pt-16">
      {/* Hero */}
      <div className="relative h-[42vh] lg:h-[55vh] overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.75) 100%)',
        }} />
        <div className="absolute bottom-0 inset-x-0 container pb-8">
          <div className="max-w-3xl">
            <span className="recipe-badge" style={{ color: 'var(--cream)', borderColor: 'rgba(255,255,255,0.5)' }}>
              {post.category}
            </span>
            <h1 className="text-display-md lg:text-display-lg font-serif recipe-hero-text leading-tight mt-3 mb-3">
              {post.title}
            </h1>
            <p className="recipe-description recipe-hero-text max-w-2xl">{post.excerpt}</p>
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div style={{ background: 'var(--cream)', borderBottom: '1px solid var(--rule)' }}>
        <div className="container py-3 flex items-center gap-6 text-sm" style={{ color: 'var(--muted)' }}>
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>

      {/* Body */}
      <div className="container py-12">
        <div className="max-w-2xl">
          {post.body?.length ? (
            post.body.map((paragraph, i) => (
              <p key={i} className="mb-5 leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                {paragraph}
              </p>
            ))
          ) : (
            <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
              This article is still being written. Check back soon.
            </p>
          )}

          <div className="mt-12 pt-6" style={{ borderTop: '1px solid var(--rule)' }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: 'var(--accent)' }}
            >
              <ArrowLeft size={14} /> Back to the journal
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
