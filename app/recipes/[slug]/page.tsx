import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Clock, Users, ChefHat, Heart, Printer, Share2, Lock } from 'lucide-react'
import { getRecipe, getRecipes } from '@/lib/content'
import { formatTime, formatDuration, formatDate } from '@/lib/utils'
import { CommentsSection } from '@/components/recipes/CommentsSection'
import { LikeButton } from '@/components/recipes/LikeButton'
import { RecipeSchema } from '@/components/recipes/RecipeSchema'
import { PhotoLightbox } from '@/components/recipes/PhotoLightbox'
import { IngredientItem } from '@/components/recipes/IngredientItem'

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipe(slug)
  if (!recipe) return {}
  return {
    title: recipe.title,
    description: recipe.description,
    ...(recipe.heroImage ? { openGraph: { images: [{ url: recipe.heroImage }] } } : {}),
  }
}

export async function generateStaticParams() {
  return (await getRecipes()).map((r) => ({ slug: r.slug }))
}

const DIFF_LABEL: Record<string, string> = { EASY: 'Easy', MEDIUM: 'Intermediate', HARD: 'Advanced' }

export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params
  const recipe = await getRecipe(slug)
  if (!recipe) notFound()

  const isGated = recipe.isSubscriber // In production: check session subscription status
  // Ingredients and steps are grouped independently — the two groupings rarely
  // line up one-to-one, so they are never paired by index.
  const { ingredientGroups, stepGroups, intro, notes } = recipe
  const hasGroups = Boolean(ingredientGroups?.length && stepGroups?.length)

  return (
    <>
      <RecipeSchema recipe={recipe} />

      <article className="recipe-detail pt-16">
        {/* Hero image */}
        <div className="relative h-[50vh] lg:h-[65vh] overflow-hidden">
          {recipe.heroImage ? (
            <Image
              src={recipe.heroImage}
              alt={recipe.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            // Recipe is written but not yet photographed — fall back to the
            // brand's dark ground so the hero still reads, instead of a
            // mismatched stock photo.
            <div className="absolute inset-0" style={{ background: 'var(--ink)' }} />
          )}
          {/* Scrim for the title only. This used to lay 40–70% black over the
              whole frame plus two rust tints, which buried the food — the one
              thing someone opening a recipe actually wants to see. Keep the top
              two thirds close to clear and ramp up only behind the text. */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to bottom,
              rgba(0, 0, 0, 0.10) 0%,
              rgba(0, 0, 0, 0.03) 30%,
              rgba(0, 0, 0, 0.16) 48%,
              rgba(0, 0, 0, 0.50) 66%,
              rgba(0, 0, 0, 0.74) 82%,
              rgba(0, 0, 0, 0.86) 100%)`
          }} />

          {recipe.heroImage && (
            <PhotoLightbox src={recipe.heroImage} alt={recipe.title} />
          )}

          {/* Hero meta */}
          <div className="absolute bottom-0 inset-x-0 container pb-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-3 recipe-hero-badges">
                <span className="recipe-badge">{recipe.category}</span>
                <span className="recipe-badge">{DIFF_LABEL[recipe.difficulty]}</span>
                {recipe.isSubscriber && (
                  <span className="recipe-badge">
                    <Lock size={10} /> Members only
                  </span>
                )}
              </div>
              <h1 className="text-display-md lg:text-display-lg font-serif recipe-hero-text leading-tight mb-3">
                {recipe.title}
              </h1>
              <p className="recipe-description recipe-hero-text max-w-2xl">
                {recipe.description}
              </p>
            </div>
          </div>
        </div>

        {/* Meta bar */}
        <div style={{ background: 'var(--cream)', borderBottom: '1px solid var(--rule)' }} className="sticky top-16 z-30 shadow-soft">
          <div className="container py-3 flex items-center justify-between gap-4">
            {/* The stats need more room than they get on a narrow screen, and
                were being clipped mid-word by the actions. Let them scroll. */}
            <div className="flex items-center gap-6 min-w-0 recipe-meta-stats">
              {/* Times and yield are omitted until the recipe is written up,
                  rather than displaying an invented 0m. */}
              {recipe.prepTime == null && recipe.cookTime == null && 'totalTime' in recipe && recipe.totalTime != null && (
                <MetaStat icon={<Clock size={16} />} label="Total" value={formatDuration(recipe.totalTime)} />
              )}
              {recipe.prepTime != null && (
                <MetaStat icon={<Clock size={16} />} label="Prep" value={formatTime(recipe.prepTime)} />
              )}
              {recipe.cookTime != null && (
                <MetaStat icon={<Clock size={16} />} label="Cook" value={formatTime(recipe.cookTime)} />
              )}
              {recipe.servings != null && (
                <MetaStat icon={<Users size={16} />} label="Serves" value={String(recipe.servings)} />
              )}
              <MetaStat icon={<ChefHat size={16} />} label="Skill" value={DIFF_LABEL[recipe.difficulty]} />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <LikeButton recipeId={recipe.id} initialCount={recipe.likeCount ?? 0} />
              <button className="btn-ghost p-2" aria-label="Print recipe">
                <Printer size={16} />
              </button>
              <button className="btn-ghost p-2" aria-label="Share recipe">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        {isGated ? (
          <div className="container py-12">
            <SubscriberGate />
          </div>
        ) : (
          <>
            {intro?.length ? (
              <div className="container" style={{ paddingTop: 'clamp(40px,5vw,64px)' }}>
                <div className="recipe-intro">
                  {intro.map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>
            ) : null}

            {hasGroups ? (
              <div className="container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <aside className="lg:col-span-1">
                    <div className="recipe-sidebar lg:sticky lg:top-32">
                      <h4 className="eyebrow" style={{ marginBottom: '16px' }}>Ingredients</h4>
                      {ingredientGroups!.map((g, gi) => (
                        <div key={gi} style={{ marginBottom: '24px' }}>
                          <h5 className="recipe-group-name">{g.name}</h5>
                          <ul className="space-y-2">
                            {g.items.map((it, i) => (
                              <IngredientItem key={i} text={it} />
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </aside>
                  <div className="lg:col-span-2">
                    <h4 className="eyebrow mb-6">Method</h4>
                    {stepGroups!.map((g, gi) => (
                      <div key={gi} style={{ marginBottom: '40px' }}>
                        <h5 className="recipe-group-name">{g.name}</h5>
                        <ol className="space-y-8">
                          {g.items.map((st, i) => (
                            <li key={i} className="flex gap-5">
                              <div className="recipe-step-number">{i + 1}</div>
                              <p className="recipe-ingredient-list leading-relaxed flex-1">{st}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Nothing written up yet. One honest notice, rather than an empty
              // two-column scaffold saying "coming soon" twice, which reads as broken.
              <div className="container py-12">
                <div className="recipe-sidebar" style={{ maxWidth: '640px' }}>
                  <h2 className="font-serif text-xl font-bold mb-2">
                    The full method is being written up
                  </h2>
                  <p className="recipe-description" style={{ fontStyle: 'normal' }}>
                    This one&apos;s cooked and photographed — the ingredient list and
                    step-by-step are still being typed out. Check back shortly, or{' '}
                    <Link href="/recipes" style={{ color: 'var(--accent)' }}>
                      browse the recipes that are ready
                    </Link>.
                  </p>
                </div>
              </div>
            )}

            {notes?.length ? (
              <div className="container" style={{ paddingBottom: 'clamp(16px,3vw,32px)' }}>
                <div className="recipe-notes">
                  <h4 className="eyebrow" style={{ marginBottom: '14px' }}>Notes</h4>
                  <ul>
                    {notes.map((n, i) => <li key={i}>{n}</li>)}
                  </ul>
                </div>
              </div>
            ) : null}

            {/* Tags */}
            <div className="container pt-8 pb-12">
              <div className="recipe-tags">
                {recipe.tags.map((tag) => (
                  <span key={tag} className="recipe-tag">#{tag}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Comments */}
        <div className="border-t border-stone-100">
          <div className="container py-12 max-w-3xl">
            <CommentsSection recipeId={recipe.id} recipeSlug={recipe.slug} />
          </div>
        </div>
      </article>
    </>
  )
}

function MetaStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-stone-600 whitespace-nowrap">
      <span className="text-stone-400">{icon}</span>
      <span className="text-stone-400 hidden sm:inline">{label}:</span>
      <span className="font-semibold text-stone-800">{value}</span>
    </div>
  )
}

function SubscriberGate() {
  return (
    <div className="rounded-3xl bg-gradient-hero p-10 text-center">
      <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center mx-auto mb-5">
        <Lock size={24} className="text-brand-300" />
      </div>
      <h3 className="font-serif text-2xl text-white font-bold mb-3">
        This recipe is for members
      </h3>
      <p className="text-stone-300 mb-6 max-w-sm mx-auto leading-relaxed">
        Join yurr cooked for $3.99/month and get access to every subscriber-only recipe, plus 10% off the shop.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="/subscribe?trial=true" className="btn-primary btn-lg">
          Try for 99¢ — first month
        </a>
        <a href="/subscribe" className="btn-ghost text-white hover:bg-white/10">
          See plan details
        </a>
      </div>
    </div>
  )
}
