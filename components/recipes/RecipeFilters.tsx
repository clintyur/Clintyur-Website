'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Mains', 'Seafood', 'Desserts', 'Baking', 'Quick']
const DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD']

interface RecipeFiltersProps {
  active: { category?: string; difficulty?: string; q?: string }
}

export function RecipeFilters({ active }: RecipeFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams()
    if (active.q)         params.set('q', active.q)
    if (active.category)  params.set('category', active.category)
    if (active.difficulty) params.set('difficulty', active.difficulty)
    if (value === null) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="label block mb-2">Search</label>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            defaultValue={active.q ?? ''}
            placeholder="Search recipes…"
            className="input pl-9"
            onChange={(e) => {
              const v = e.target.value.trim()
              setParam('q', v || null)
            }}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="label mb-3">Category</p>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setParam('category', null)}
            className={cn(
              'text-left px-3 py-2 rounded-lg text-sm transition-colors',
              !active.category ? 'bg-brand-50 text-brand-700 font-medium' : 'text-stone-600 hover:bg-stone-100'
            )}
          >
            All categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setParam('category', cat.toLowerCase() === active.category?.toLowerCase() ? null : cat)}
              className={cn(
                'text-left px-3 py-2 rounded-lg text-sm transition-colors',
                cat.toLowerCase() === active.category?.toLowerCase()
                  ? 'bg-brand-50 text-brand-700 font-medium'
                  : 'text-stone-600 hover:bg-stone-100'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <p className="label mb-3">Difficulty</p>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setParam('difficulty', null)}
            className={cn(
              'text-left px-3 py-2 rounded-lg text-sm transition-colors',
              !active.difficulty ? 'bg-brand-50 text-brand-700 font-medium' : 'text-stone-600 hover:bg-stone-100'
            )}
          >
            Any difficulty
          </button>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setParam('difficulty', d === active.difficulty ? null : d)}
              className={cn(
                'text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors',
                d === active.difficulty
                  ? 'bg-brand-50 text-brand-700 font-medium'
                  : 'text-stone-600 hover:bg-stone-100'
              )}
            >
              {d.charAt(0) + d.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
