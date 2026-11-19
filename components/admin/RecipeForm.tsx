'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { saveRecipe, deleteRecipe } from '@/app/admin/(protected)/recipes/actions'
import { ImagePicker } from '@/components/admin/ImagePicker'

export type GroupDraft = { name: string; items: string }

export type RecipeDraft = {
  id?: string
  title: string
  slug: string
  description: string
  heroImage: string
  introText: string
  notesText: string
  prepTime: string
  cookTime: string
  totalTimeMin: string
  totalTimeMax: string
  servings: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  cuisine: string
  category: string
  tagsText: string
  isSubscriber: boolean
  isFeatured: boolean
  ingredientGroups: GroupDraft[]
  stepGroups: GroupDraft[]
}

export const EMPTY_RECIPE: RecipeDraft = {
  title: '', slug: '', description: '', heroImage: '',
  introText: '', notesText: '',
  prepTime: '', cookTime: '', totalTimeMin: '', totalTimeMax: '',
  servings: '', difficulty: 'MEDIUM', cuisine: '', category: 'Mains',
  tagsText: '', isSubscriber: false, isFeatured: false,
  ingredientGroups: [{ name: '', items: '' }],
  stepGroups: [{ name: '', items: '' }],
}

const num = (s: string) => {
  const t = s.trim()
  if (!t) return null
  const n = Number(t)
  return Number.isFinite(n) ? Math.round(n) : null
}

export function RecipeForm({ initial }: { initial: RecipeDraft }) {
  const router = useRouter()
  const [v, setV] = useState<RecipeDraft>(initial)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [pending, start] = useTransition()

  const set = <K extends keyof RecipeDraft>(k: K, value: RecipeDraft[K]) => {
    setV((p) => ({ ...p, [k]: value }))
    setSaved(false)
  }

  const setGroup = (
    key: 'ingredientGroups' | 'stepGroups',
    i: number,
    patch: Partial<GroupDraft>,
  ) => {
    setV((p) => ({
      ...p,
      [key]: p[key].map((g, gi) => (gi === i ? { ...g, ...patch } : g)),
    }))
    setSaved(false)
  }

  const addGroup = (key: 'ingredientGroups' | 'stepGroups') =>
    setV((p) => ({ ...p, [key]: [...p[key], { name: '', items: '' }] }))

  const removeGroup = (key: 'ingredientGroups' | 'stepGroups', i: number) =>
    setV((p) => ({ ...p, [key]: p[key].filter((_, gi) => gi !== i) }))

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    start(async () => {
      const res = await saveRecipe({
        id: v.id,
        title: v.title,
        slug: v.slug,
        description: v.description,
        heroImage: v.heroImage || null,
        introText: v.introText,
        notesText: v.notesText,
        prepTime: num(v.prepTime),
        cookTime: num(v.cookTime),
        totalTimeMin: num(v.totalTimeMin),
        totalTimeMax: num(v.totalTimeMax),
        servings: v.servings || null,
        difficulty: v.difficulty,
        cuisine: v.cuisine || null,
        category: v.category,
        tagsText: v.tagsText,
        isSubscriber: v.isSubscriber,
        isFeatured: v.isFeatured,
        ingredientGroups: v.ingredientGroups.map((g) => ({ name: g.name || null, items: g.items })),
        stepGroups: v.stepGroups.map((g) => ({ name: g.name || null, items: g.items })),
      })
      if (!res.ok) { setError(res.error); return }
      setSaved(true)
      router.push('/admin/recipes')
      router.refresh()
    })
  }

  function onDelete() {
    if (!v.id) return
    if (!confirm(`Delete "${v.title}"? This removes it from the site and cannot be undone.`)) return
    start(async () => {
      const res = await deleteRecipe(v.id!)
      if (!res.ok) { setError(res.error); return }
      router.push('/admin/recipes')
      router.refresh()
    })
  }

  const groupEditor = (key: 'ingredientGroups' | 'stepGroups', label: string, hint: string) => (
    <section className="admin-section">
      <div className="admin-section-head">
        <h2>{label}</h2>
        <button type="button" className="admin-btn-ghost" onClick={() => addGroup(key)}>
          + Add a heading
        </button>
      </div>
      <p className="admin-hint">{hint}</p>

      {v[key].map((g, i) => (
        <div key={i} className="admin-group">
          <div className="admin-group-head">
            <input
              className="admin-input admin-group-name"
              placeholder="Heading — e.g. The Marinade (leave blank if there isn't one)"
              value={g.name}
              onChange={(e) => setGroup(key, i, { name: e.target.value })}
            />
            {v[key].length > 1 && (
              <button
                type="button"
                className="admin-btn-danger-ghost"
                onClick={() => removeGroup(key, i)}
                aria-label={`Remove ${label} heading ${i + 1}`}
              >
                Remove
              </button>
            )}
          </div>
          <textarea
            className="admin-textarea admin-group-items"
            rows={Math.max(4, g.items.split('\n').length + 1)}
            placeholder={
              key === 'ingredientGroups'
                ? 'One ingredient per line:\nChicken thighs — 4–6 pieces\nButtermilk — enough to cover'
                : 'One step per line. Write it the way you talk.'
            }
            value={g.items}
            onChange={(e) => setGroup(key, i, { items: e.target.value })}
          />
        </div>
      ))}
    </section>
  )

  return (
    <form onSubmit={onSubmit} className="admin-form">
      <section className="admin-section">
        <h2>The basics</h2>

        <label className="admin-label" htmlFor="title">Title</label>
        <input id="title" className="admin-input" value={v.title} required
          onChange={(e) => set('title', e.target.value)} />

        <label className="admin-label" htmlFor="slug">Web address</label>
        <input id="slug" className="admin-input" value={v.slug}
          placeholder={v.title ? 'Left blank, this is made from the title' : 'made-from-the-title'}
          onChange={(e) => set('slug', e.target.value)} />
        <p className="admin-hint">
          Changing this on a live recipe breaks any link people already have to it.
        </p>

        <label className="admin-label" htmlFor="description">Short description</label>
        <textarea id="description" className="admin-textarea" rows={3} value={v.description}
          onChange={(e) => set('description', e.target.value)} />

        <label className="admin-label">Main photo</label>
        <ImagePicker value={v.heroImage} onChange={(src) => set('heroImage', src)} />
      </section>

      <section className="admin-section">
        <h2>Times &amp; yield</h2>
        <p className="admin-hint">
          Fill in <strong>either</strong> prep and cook, <strong>or</strong> a single total.
          For a range, put both figures in the total — 90 and 120 shows as &ldquo;1.5–2h&rdquo;.
        </p>
        <div className="admin-grid-4">
          <div>
            <label className="admin-label" htmlFor="prep">Prep (min)</label>
            <input id="prep" className="admin-input" inputMode="numeric" value={v.prepTime}
              onChange={(e) => set('prepTime', e.target.value)} />
          </div>
          <div>
            <label className="admin-label" htmlFor="cook">Cook (min)</label>
            <input id="cook" className="admin-input" inputMode="numeric" value={v.cookTime}
              onChange={(e) => set('cookTime', e.target.value)} />
          </div>
          <div>
            <label className="admin-label" htmlFor="tmin">Total from (min)</label>
            <input id="tmin" className="admin-input" inputMode="numeric" value={v.totalTimeMin}
              onChange={(e) => set('totalTimeMin', e.target.value)} />
          </div>
          <div>
            <label className="admin-label" htmlFor="tmax">Total to (min)</label>
            <input id="tmax" className="admin-input" inputMode="numeric" value={v.totalTimeMax}
              onChange={(e) => set('totalTimeMax', e.target.value)} />
          </div>
        </div>

        <label className="admin-label" htmlFor="servings">Serves</label>
        <input id="servings" className="admin-input" value={v.servings} placeholder="2–4"
          onChange={(e) => set('servings', e.target.value)} />
      </section>

      <section className="admin-section">
        <h2>Filing</h2>
        <div className="admin-grid-3">
          <div>
            <label className="admin-label" htmlFor="category">Category</label>
            <input id="category" className="admin-input" value={v.category}
              onChange={(e) => set('category', e.target.value)} />
          </div>
          <div>
            <label className="admin-label" htmlFor="cuisine">Cuisine</label>
            <input id="cuisine" className="admin-input" value={v.cuisine}
              onChange={(e) => set('cuisine', e.target.value)} />
          </div>
          <div>
            <label className="admin-label" htmlFor="difficulty">Skill</label>
            <select id="difficulty" className="admin-input" value={v.difficulty}
              onChange={(e) => set('difficulty', e.target.value as RecipeDraft['difficulty'])}>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Intermediate</option>
              <option value="HARD">Advanced</option>
            </select>
          </div>
        </div>

        <label className="admin-label" htmlFor="tags">Tags</label>
        <input id="tags" className="admin-input" value={v.tagsText} placeholder="mains, fried"
          onChange={(e) => set('tagsText', e.target.value)} />
        <p className="admin-hint">Separated by commas.</p>

        <div className="admin-checks">
          <label className="admin-check">
            <input type="checkbox" checked={v.isFeatured}
              onChange={(e) => set('isFeatured', e.target.checked)} />
            <span>Feature on the home page</span>
          </label>
          <label className="admin-check">
            <input type="checkbox" checked={v.isSubscriber}
              onChange={(e) => set('isSubscriber', e.target.checked)} />
            <span>Members only</span>
          </label>
        </div>
      </section>

      <section className="admin-section">
        <h2>Intro</h2>
        <p className="admin-hint">
          Shown above the recipe. One paragraph per line. Leave empty if there isn&apos;t one.
        </p>
        <textarea className="admin-textarea" rows={4} value={v.introText}
          onChange={(e) => set('introText', e.target.value)} />
      </section>

      {groupEditor(
        'ingredientGroups',
        'Ingredients',
        'One ingredient per line. Put the ingredient first and any prep after an em dash — that is what the little photo next to each line is matched on.',
      )}

      {groupEditor(
        'stepGroups',
        'Method',
        'One step per line. Headings here are separate from the ingredient headings — a recipe can have three ingredient groups and four step groups.',
      )}

      <section className="admin-section">
        <h2>Notes</h2>
        <p className="admin-hint">Shown at the end. One per line.</p>
        <textarea className="admin-textarea" rows={3} value={v.notesText}
          onChange={(e) => set('notesText', e.target.value)} />
      </section>

      {error && <p className="admin-error" role="alert">{error}</p>}
      {saved && <p className="admin-saved" role="status">Saved.</p>}

      <div className="admin-actions">
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? 'Saving…' : v.id ? 'Save changes' : 'Create recipe'}
        </button>
        <Link href="/admin/recipes" className="admin-btn-ghost">Cancel</Link>
        {v.id && (
          <button type="button" className="admin-btn-danger" onClick={onDelete} disabled={pending}>
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
