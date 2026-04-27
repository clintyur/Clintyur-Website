'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
  recipeId: string
  initialCount: number
}

export function LikeButton({ recipeId, initialCount }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [count, setCount]  = useState(initialCount)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/likes', {
        method: liked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId }),
      })
      if (res.ok) {
        setLiked(!liked)
        setCount((c) => liked ? c - 1 : c + 1)
      }
    } catch {
      /* silently fail */
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={liked ? 'Unlike recipe' : 'Like recipe'}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all',
        liked
          ? 'bg-rose-50 text-rose-600 border border-rose-200'
          : 'bg-stone-50 text-stone-500 border border-stone-200 hover:border-rose-200 hover:text-rose-500'
      )}
    >
      <Heart
        size={14}
        className={cn('transition-all', liked && 'fill-current scale-110')}
      />
      {count.toLocaleString()}
    </button>
  )
}
