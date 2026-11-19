import Link from 'next/link'
import { getRecipes, databaseEnabled } from '@/lib/content'
import { formatDuration } from '@/lib/utils'

export const dynamic = 'force-dynamic'

function timeOf(r: { prepTime: number | null; cookTime: number | null; totalTime?: number | string | null }) {
  if (r.prepTime == null && r.cookTime == null && r.totalTime != null) {
    return formatDuration(r.totalTime)
  }
  const parts: string[] = []
  if (r.prepTime != null) parts.push(`prep ${formatDuration(r.prepTime)}`)
  if (r.cookTime != null) parts.push(`cook ${formatDuration(r.cookTime)}`)
  return parts.join(' · ') || '—'
}

export default async function AdminRecipesPage() {
  const recipes = await getRecipes()
  const live = databaseEnabled()

  return (
    <div className="container admin-page">
      <div className="admin-page-head">
        <div>
          <h1 className="admin-h1">Recipes</h1>
          <p className="admin-hint">{recipes.length} on the site</p>
        </div>
        {live && (
          <Link href="/admin/recipes/new" className="btn-primary">New recipe</Link>
        )}
      </div>

      {!live && (
        <p className="admin-notice">
          Editing is switched off because no database is connected to this deployment.
          These are the recipes currently built into the site, shown read-only.
        </p>
      )}

      <div className="admin-list">
        {recipes.map((r) => {
          const written = Boolean(r.stepGroups?.length)
          return (
            <div key={r.slug} className="admin-row">
              <div className="admin-row-thumb">
                {r.heroImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.heroImage} alt="" loading="lazy" />
                ) : (
                  <span className="admin-row-nothumb">no photo</span>
                )}
              </div>

              <div className="admin-row-main">
                <h2>{r.title}</h2>
                <p className="admin-row-meta">
                  {r.category} · {timeOf(r)} · serves {r.servings ?? '—'}
                </p>
                <div className="admin-row-flags">
                  {!written && <span className="admin-flag is-warn">no method yet</span>}
                  {r.isFeatured && <span className="admin-flag">featured</span>}
                  {r.isSubscriber && <span className="admin-flag">members only</span>}
                </div>
              </div>

              <div className="admin-row-actions">
                <Link href={`/recipes/${r.slug}`} className="admin-btn-ghost">View</Link>
                {live && (
                  <Link href={`/admin/recipes/${r.id}`} className="admin-btn-ghost">Edit</Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
