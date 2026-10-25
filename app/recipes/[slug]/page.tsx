import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Clock, Users, ChefHat, Heart, Printer, Share2, Lock } from 'lucide-react'
import { MOCK_RECIPES } from '@/lib/mock-data'
import { formatTime, formatDate } from '@/lib/utils'
import { CommentsSection } from '@/components/recipes/CommentsSection'
import { LikeButton } from '@/components/recipes/LikeButton'
import { RecipeSchema } from '@/components/recipes/RecipeSchema'

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const recipe = MOCK_RECIPES.find((r) => r.slug === slug)
  if (!recipe) return {}
  return {
    title: recipe.title,
    description: recipe.description,
    ...(recipe.heroImage ? { openGraph: { images: [{ url: recipe.heroImage }] } } : {}),
  }
}

export async function generateStaticParams() {
  return MOCK_RECIPES.map((r) => ({ slug: r.slug }))
}

// Mock full recipe data — in production, fetch from DB
const MOCK_FULL_RECIPE: Record<string, {
  ingredients: { amount: string; unit: string; name: string; note?: string }[]
  steps: { stepNumber: number; instruction: string }[]
  nutrition?: { calories: number; protein: number; fat: number; carbs: number }
}> = {}

const DIFF_LABEL: Record<string, string> = { EASY: 'Easy', MEDIUM: 'Intermediate', HARD: 'Advanced' }

export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params
  const recipe = MOCK_RECIPES.find((r) => r.slug === slug)
  if (!recipe) notFound()

  const full = MOCK_FULL_RECIPE[slug as keyof typeof MOCK_FULL_RECIPE]
  const isGated = recipe.isSubscriber // In production: check session subscription status
  const hasMultipleSections = 'sections' in recipe && recipe.sections && recipe.sections.length > 0
  // Recipes imported from the previous site group ingredients and steps
  // independently — the two groupings rarely line up one-to-one.
  const ingredientGroups = 'ingredientGroups' in recipe ? recipe.ingredientGroups : undefined
  const stepGroups = 'stepGroups' in recipe ? recipe.stepGroups : undefined
  const hasGroups = Boolean(ingredientGroups?.length && stepGroups?.length)
  // Optional headnote in Clint's own voice, shown above the method.
  const intro = 'intro' in recipe ? recipe.intro : undefined
  const notes = 'notes' in recipe ? recipe.notes : undefined

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
          {/* Editorial-style gradient overlay with rust/gold accents */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(184, 68, 42, 0.3) 0%, transparent 35%),
              radial-gradient(ellipse at 80% 90%, rgba(184, 102, 50, 0.2) 0%, transparent 40%),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))
            `
          }} />

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
          <div className="container py-3 flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-6 min-w-0">
              {/* Times and yield are omitted until the recipe is written up,
                  rather than displaying an invented 0m. */}
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
                              <li key={i} className="recipe-ingredient-list text-sm leading-relaxed">{it}</li>
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
            ) : !hasMultipleSections && !full ? (
              // No ingredients or steps written yet. Render one honest notice
              // rather than an empty two-column scaffold saying "coming soon"
              // twice, which just reads as broken.
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
            ) : hasMultipleSections ? (
              // Multi-section recipe layout
              <div className="container py-12 space-y-16">
                {recipe.sections?.map((section: any, sectionIdx: number) => (
                  <div key={sectionIdx} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Section ingredients (sidebar) */}
                    <aside className="lg:col-span-1">
                      <div className="recipe-sidebar">
                        <h3 className="font-serif text-lg font-bold mb-1">{section.name}</h3>
                        <div className="h-1 w-12 bg-accent mb-6" style={{ background: 'var(--accent)' }}></div>
                        <h4 className="eyebrow mb-4" style={{ marginBottom: '12px' }}>Ingredients</h4>
                        <ul className="space-y-2">
                          {section.ingredients.map((ing: string, i: number) => (
                            <li key={i} className="recipe-ingredient-list text-sm leading-relaxed">
                              {ing}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </aside>

                    {/* Section instructions */}
                    <div className="lg:col-span-2">
                      <h4 className="eyebrow mb-6">Instructions</h4>
                      <ol className="space-y-8">
                        {section.instructions.map((instruction: string, i: number) => (
                          <li key={i} className="flex gap-5">
                            <div className="recipe-step-number">
                              {i + 1}
                            </div>
                            <p className="recipe-ingredient-list leading-relaxed flex-1">{instruction}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Single section recipe layout
              <div className="container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Ingredients (sidebar) */}
                  <aside className="lg:col-span-1">
                    <div className="recipe-sidebar sticky top-32">
                      <h2 className="section-title mb-3">Ingredients</h2>
                      {full ? (
                        <ul className="space-y-3">
                          {full.ingredients.map((ing, i) => (
                            <li key={i} className="flex gap-2 text-sm recipe-ingredient-list">
                              <span className="font-semibold min-w-[3rem]">
                                {ing.amount}{ing.unit && ` ${ing.unit}`}
                              </span>
                              <span>
                                {ing.name}
                                {ing.note && <span className="text-muted">, {ing.note}</span>}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted text-sm italic">Ingredients coming soon.</p>
                      )}

                      {/* Nutrition */}
                      {full?.nutrition && (
                        <div className="mt-6 pt-6" style={{ borderTopColor: 'var(--rule)', borderTopWidth: '1px' }}>
                          <p className="eyebrow mb-3">Per serving</p>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(full.nutrition).map(([k, v]) => (
                              <div key={k} className="text-center rounded p-3" style={{ background: 'var(--cream)' }}>
                                <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{v}</p>
                                <p className="eyebrow mt-1">
                                  {k === 'calories' ? 'kcal' : `${k}g`}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </aside>

                  {/* Method */}
                  <div className="lg:col-span-2">
                    <h2 className="section-title">Method</h2>
                    {full ? (
                      <ol className="space-y-8">
                        {full.steps.map((step) => (
                          <li key={step.stepNumber} className="flex gap-5">
                            <div className="recipe-step-number">
                              {step.stepNumber}
                            </div>
                            <p className="recipe-ingredient-list leading-relaxed flex-1">{step.instruction}</p>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-muted italic">Steps coming soon.</p>
                    )}
                  </div>
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
