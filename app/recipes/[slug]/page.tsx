import type { Metadata } from 'next'
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
    openGraph: {
      images: [{ url: recipe.heroImage }],
    },
  }
}

export async function generateStaticParams() {
  return MOCK_RECIPES.map((r) => ({ slug: r.slug }))
}

// Mock full recipe data — in production, fetch from DB
const MOCK_FULL_RECIPE = {
  'crispy-carnitas-tacos': {
    ingredients: [
      { amount: '3', unit: 'lb', name: 'pork shoulder', note: 'cut into 3-inch chunks' },
      { amount: '1', unit: 'tbsp', name: 'kosher salt' },
      { amount: '1', unit: 'tsp', name: 'black pepper' },
      { amount: '1', unit: 'tsp', name: 'cumin' },
      { amount: '1', unit: 'tsp', name: 'dried oregano' },
      { amount: '4', unit: 'cloves', name: 'garlic', note: 'smashed' },
      { amount: '1',  unit: '',    name: 'orange', note: 'halved' },
      { amount: '1',  unit: '',    name: 'lime', note: 'halved' },
      { amount: '1',  unit: 'cup', name: 'lard or neutral oil' },
      { amount: '16', unit: '',    name: 'corn tortillas', note: 'warmed' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Season pork chunks all over with salt, pepper, cumin, and oregano. Let sit at room temperature for 30 minutes, or refrigerate uncovered overnight for best results.' },
      { stepNumber: 2, instruction: 'In a Dutch oven or heavy pot, combine pork, garlic, and lard over medium heat. Squeeze orange and lime over pork, then drop in the spent halves.' },
      { stepNumber: 3, instruction: 'Braise uncovered on medium-low for 2–2.5 hours, turning occasionally, until pork is very tender and fat has rendered out.' },
      { stepNumber: 4, instruction: 'Increase heat to medium-high. Fry pork in its own fat, stirring occasionally, until golden and crispy on the outside — about 15–20 minutes.' },
      { stepNumber: 5, instruction: 'Transfer crispy pork to a cutting board. Shred roughly with two forks. Taste and adjust seasoning.' },
      { stepNumber: 6, instruction: 'Serve on warm corn tortillas with pickled red onions, salsa verde, cilantro, and lime wedges.' },
    ],
    nutrition: { calories: 520, protein: 38, fat: 28, carbs: 32 },
  },
}

const DIFF_LABEL: Record<string, string> = { EASY: 'Easy', MEDIUM: 'Intermediate', HARD: 'Advanced' }

export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params
  const recipe = MOCK_RECIPES.find((r) => r.slug === slug)
  if (!recipe) notFound()

  const full = MOCK_FULL_RECIPE[slug as keyof typeof MOCK_FULL_RECIPE]
  const isGated = recipe.isSubscriber // In production: check session subscription status
  const hasMultipleSections = 'sections' in recipe && recipe.sections && recipe.sections.length > 0

  return (
    <>
      <RecipeSchema recipe={recipe} />

      <article className="pt-16">
        {/* Hero image */}
        <div className="relative h-[50vh] lg:h-[65vh] overflow-hidden">
          <Image
            src={recipe.heroImage}
            alt={recipe.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Hero meta */}
          <div className="absolute bottom-0 inset-x-0 section pb-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-brand">{recipe.category}</span>
                <span className="badge badge-stone">{DIFF_LABEL[recipe.difficulty]}</span>
                {recipe.isSubscriber && (
                  <span className="badge bg-stone-900/80 text-white border border-white/20">
                    <Lock size={10} /> Members only
                  </span>
                )}
              </div>
              <h1 className="text-display-md lg:text-display-lg font-serif text-white leading-tight mb-3">
                {recipe.title}
              </h1>
              <p className="text-stone-300 text-lg max-w-2xl leading-relaxed">
                {recipe.description}
              </p>
            </div>
          </div>
        </div>

        {/* Meta bar */}
        <div className="bg-white border-b border-stone-100 sticky top-16 z-30 shadow-soft">
          <div className="section py-3 flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-6 min-w-0">
              <MetaStat icon={<Clock size={16} />} label="Prep" value={formatTime(recipe.prepTime)} />
              <MetaStat icon={<Clock size={16} />} label="Cook" value={formatTime(recipe.cookTime)} />
              <MetaStat icon={<Users size={16} />} label="Serves" value={String(recipe.servings)} />
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
          <div className="section py-12">
            <SubscriberGate />
          </div>
        ) : (
          <>
            {hasMultipleSections ? (
              // Multi-section recipe layout
              <div className="section py-12 space-y-16">
                {recipe.sections?.map((section: any, sectionIdx: number) => (
                  <div key={sectionIdx} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Section ingredients (sidebar) */}
                    <aside className="lg:col-span-1">
                      <div className="bg-stone-50 rounded-2xl p-6">
                        <h3 className="font-serif text-lg font-bold text-stone-900 mb-4">{section.name}</h3>
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-stone-600 mb-3">Ingredients</h4>
                        <ul className="space-y-2">
                          {section.ingredients.map((ing: string, i: number) => (
                            <li key={i} className="text-sm text-stone-700">
                              • {ing}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </aside>

                    {/* Section instructions */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-stone-600 mb-6">Instructions</h4>
                      <ol className="space-y-6">
                        {section.instructions.map((instruction: string, i: number) => (
                          <li key={i} className="flex gap-4">
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center mt-0.5">
                              {i + 1}
                            </div>
                            <p className="text-stone-700 leading-relaxed flex-1 text-sm">{instruction}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Single section recipe layout
              <div className="section py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Ingredients (sidebar) */}
                  <aside className="lg:col-span-1">
                    <div className="bg-stone-50 rounded-2xl p-6 sticky top-32">
                      <h2 className="font-serif text-xl font-bold text-stone-900 mb-5">Ingredients</h2>
                      {full ? (
                        <ul className="space-y-3">
                          {full.ingredients.map((ing, i) => (
                            <li key={i} className="flex gap-2 text-sm">
                              <span className="font-semibold text-stone-900 min-w-[3rem]">
                                {ing.amount}{ing.unit && ` ${ing.unit}`}
                              </span>
                              <span className="text-stone-700">
                                {ing.name}
                                {ing.note && <span className="text-stone-400">, {ing.note}</span>}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-stone-400 text-sm italic">Ingredients coming soon.</p>
                      )}

                      {/* Nutrition */}
                      {full?.nutrition && (
                        <div className="mt-6 pt-6 border-t border-stone-200">
                          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                            Per serving
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(full.nutrition).map(([k, v]) => (
                              <div key={k} className="text-center bg-white rounded-xl p-2">
                                <p className="text-lg font-bold text-stone-900">{v}</p>
                                <p className="text-[10px] text-stone-400 uppercase tracking-wider">
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
                    <h2 className="font-serif text-2xl font-bold text-stone-900 mb-8">Method</h2>
                    {full ? (
                      <ol className="space-y-8">
                        {full.steps.map((step) => (
                          <li key={step.stepNumber} className="flex gap-5">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center mt-0.5">
                              {step.stepNumber}
                            </div>
                            <p className="text-stone-700 leading-relaxed flex-1">{step.instruction}</p>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-stone-400 italic">Steps coming soon.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="section pt-8 pb-12">
              <div className="flex flex-wrap gap-2 pt-8 border-t border-stone-100">
                {recipe.tags.map((tag) => (
                  <span key={tag} className="badge badge-stone text-xs">#{tag}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Comments */}
        <div className="border-t border-stone-100">
          <div className="section py-12 max-w-3xl">
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
        Join Provecho for $3.99/month and get access to every subscriber-only recipe, plus 10% off the shop.
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
