'use client'

import Image from 'next/image'
import { Instagram, Youtube, Play, Heart, Eye } from 'lucide-react'
import { MOCK_SOCIAL_POSTS } from '@/lib/mock-data'

type SocialPost = (typeof MOCK_SOCIAL_POSTS)[number]

function SocialCard({ post }: { post: SocialPost }) {
  const isYT = post.platform === 'youtube'

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-2xl bg-stone-100"
      aria-label={`View on ${isYT ? 'YouTube' : 'Instagram'}: ${post.caption}`}
    >
      {/* Thumbnail */}
      <Image
        src={post.thumbnail}
        alt={post.caption}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-2">
        {/* Play button for YT */}
        {isYT && (
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-lg">
            <Play size={20} fill="#1c1917" className="text-stone-900 ml-0.5" />
          </div>
        )}

        {/* Stats — visible on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
          {isYT && 'views' in post ? (
            <div className="flex items-center gap-1 text-sm font-medium">
              <Eye size={14} />
              {(post.views / 1000).toFixed(0)}K views
            </div>
          ) : (
            'likes' in post && (
              <div className="flex items-center gap-1 text-sm font-medium">
                <Heart size={14} />
                {post.likes.toLocaleString()}
              </div>
            )
          )}
        </div>
      </div>

      {/* Platform badge */}
      <div className="absolute top-2 left-2">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isYT ? 'bg-red-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
          {isYT ? (
            <Youtube size={12} className="text-white" />
          ) : (
            <Instagram size={12} className="text-white" />
          )}
        </div>
      </div>

      {/* Duration badge for YT */}
      {isYT && 'duration' in post && (
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
          {post.duration}
        </div>
      )}
    </a>
  )
}

export function SocialFeed() {
  return (
    <section className="section-pad bg-stone-50">
      <div className="section">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
            Follow along
          </p>
          <h2 className="text-display-md font-serif text-stone-900 mb-3">
            On the feed
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            Behind the scenes, quick bites, and full videos — find us on Instagram and YouTube.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOCK_SOCIAL_POSTS.map((post) => (
            <SocialCard key={post.id} post={post} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <Instagram size={16} />
            Instagram
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <Youtube size={16} />
            YouTube
          </a>
        </div>
      </div>
    </section>
  )
}
