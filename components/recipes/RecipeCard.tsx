import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, Star, Heart, Lock } from 'lucide-react'
import { cn, formatTime } from '@/lib/utils'

interface RecipeCardProps {
  recipe: {
    id: string
    slug: string
    title: string
    description: string
    heroImage: string
    prepTime: number
    cookTime: number
    servings: number
    difficulty: string
    category: string
    tags: string[]
    isSubscriber: boolean
    isFeatured: boolean
    rating?: number
    commentCount?: number
    likeCount?: number
  }
  size?: 'default' | 'large'
}

const DIFFICULTY_COLORS: Record<string, string> = {
  EASY:   'badge-stone',
  MEDIUM: 'badge-brand',
  HARD:   'badge-terra',
}

export function RecipeCard({ recipe, size = 'default' }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <article className="card group animate-slide-up">
      {/* Image */}
      <div className={cn('relative overflow-hidden', size === 'large' ? 'aspect-[4/3]' : 'aspect-[3/2]')}>
        <Image
          src={recipe.heroImage}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subscriber gate overlay */}
        {recipe.isSubscriber && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
              <Lock size={10} />
              Members only
            </div>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="badge bg-white/90 backdrop-blur-sm text-stone-700 text-xs shadow-sm">
            {recipe.category}
          </span>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-stone-500 mb-3">
          <span className={DIFFICULTY_COLORS[recipe.difficulty] ?? 'badge-stone'}>
            {recipe.difficulty.charAt(0) + recipe.difficulty.slice(1).toLowerCase()}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {formatTime(totalTime)}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {recipe.servings}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 leading-tight group-hover:text-brand-700 transition-colors">
          <Link href={`/recipes/${recipe.slug}`} className="after:absolute after:inset-0">
            {recipe.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4">
          {recipe.description}
        </p>

        {/* Footer stats */}
        {(recipe.rating || recipe.likeCount) && (
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            {recipe.rating && (
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i <= Math.round(recipe.rating!) ? 'star-filled fill-current' : 'star-empty fill-current'}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-stone-600">{recipe.rating}</span>
                {recipe.commentCount != null && (
                  <span className="text-xs text-stone-400">({recipe.commentCount})</span>
                )}
              </div>
            )}
            {recipe.likeCount != null && (
              <div className="flex items-center gap-1 text-xs text-stone-400">
                <Heart size={12} />
                {recipe.likeCount.toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
