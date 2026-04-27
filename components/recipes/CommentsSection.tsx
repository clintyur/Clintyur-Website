'use client'

import { useState } from 'react'
import { Star, MessageCircle, Send } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Comment {
  id: string
  body: string
  rating?: number
  author: string
  avatar: string
  createdAt: string
  replies?: Comment[]
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    body: 'Made this last Sunday — absolutely incredible. The key is really letting those final 20 minutes go until the pork is properly crispy.',
    rating: 5,
    author: 'Sarah M.',
    avatar: 'S',
    createdAt: '2024-12-10',
    replies: [
      {
        id: '1r',
        body: 'So glad it worked for you Sarah! That crisp is everything.',
        author: 'Provecho',
        avatar: 'P',
        createdAt: '2024-12-10',
      },
    ],
  },
  {
    id: '2',
    body: "Used lard like you recommended and it's a completely different level from oil. This is the carnitas recipe I've been looking for for years.",
    rating: 5,
    author: 'Carlos R.',
    avatar: 'C',
    createdAt: '2024-12-08',
  },
  {
    id: '3',
    body: 'Can you make this in a slow cooker? I don\'t have a Dutch oven.',
    rating: 4,
    author: 'Emma T.',
    avatar: 'E',
    createdAt: '2024-12-05',
  },
]

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          aria-label={`Rate ${i} stars`}
        >
          <Star
            size={18}
            className={cn(
              'transition-colors',
              i <= (hover || value) ? 'star-filled fill-current' : 'star-empty fill-current'
            )}
          />
        </button>
      ))}
    </div>
  )
}

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [replying, setReplying] = useState(false)

  return (
    <div className={cn('flex gap-3', depth > 0 && 'ml-10 mt-4')}>
      {/* Avatar */}
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center text-white text-sm font-bold">
        {comment.avatar}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-stone-800">{comment.author}</span>
          <span className="text-xs text-stone-400">{formatDate(comment.createdAt)}</span>
        </div>
        {comment.rating && (
          <div className="flex gap-0.5 mb-2">
            {[1,2,3,4,5].map((i) => (
              <Star
                key={i}
                size={11}
                className={i <= comment.rating! ? 'star-filled fill-current' : 'star-empty fill-current'}
              />
            ))}
          </div>
        )}
        <p className="text-sm text-stone-700 leading-relaxed">{comment.body}</p>
        {depth === 0 && (
          <button
            onClick={() => setReplying(!replying)}
            className="mt-2 text-xs text-stone-400 hover:text-brand-600 transition-colors flex items-center gap-1"
          >
            <MessageCircle size={11} />
            Reply
          </button>
        )}
        {replying && (
          <div className="mt-3">
            <ReplyForm onCancel={() => setReplying(false)} parentId={comment.id} recipeId="" />
          </div>
        )}
        {comment.replies?.map((reply) => (
          <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </div>
    </div>
  )
}

function ReplyForm({ parentId, recipeId, onCancel }: { parentId: string; recipeId: string; onCancel: () => void }) {
  const [body, setBody] = useState('')
  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        autoFocus
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a reply…"
        className="input flex-1 text-sm py-2"
      />
      <button type="submit" className="btn-primary btn-sm">Post</button>
      <button type="button" onClick={onCancel} className="btn-ghost btn-sm">Cancel</button>
    </form>
  )
}

interface CommentsSectionProps {
  recipeId: string
  recipeSlug: string
}

export function CommentsSection({ recipeId }: CommentsSectionProps) {
  const [rating, setRating]   = useState(0)
  const [body, setBody]       = useState('')
  const [submitted, setSubmitted] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setSubmitted(true)
    // In production: POST /api/comments
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
        Comments & Ratings
      </h2>
      <p className="text-stone-500 text-sm mb-8">
        {MOCK_COMMENTS.length} comments — have you made this recipe? Share your experience.
      </p>

      {/* Comment form */}
      {!submitted ? (
        <form onSubmit={submit} className="bg-stone-50 rounded-2xl p-6 mb-10 border border-stone-100">
          <p className="font-semibold text-stone-800 mb-4">Leave a review</p>
          <div className="mb-4">
            <label className="label block mb-2">Your rating</label>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <div className="mb-4">
            <label className="label block mb-2">Your review</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              placeholder="Did you make changes? How did it go?"
              className="input resize-none"
            />
          </div>
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Send size={14} />
            Post review
          </button>
        </form>
      ) : (
        <div className="bg-brand-50 rounded-2xl p-6 mb-10 border border-brand-100 text-center">
          <p className="text-brand-700 font-semibold">Thanks for your review! 🎉</p>
          <p className="text-brand-600 text-sm mt-1">It will appear after a quick check.</p>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-8">
        {MOCK_COMMENTS.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </div>
    </div>
  )
}
