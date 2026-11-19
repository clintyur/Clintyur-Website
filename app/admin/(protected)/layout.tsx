import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { isAdmin, adminConfigured } from '@/lib/admin-auth'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

// Nothing here may be cached or statically rendered: every request has to run
// the cookie check.
export const dynamic = 'force-dynamic'

/**
 * The guard lives in a route-group layout rather than in each page, so a new
 * admin page is protected by virtue of where it sits in the tree. There is no
 * per-page check to forget.
 */
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // An unconfigured deployment must fail closed, not open.
  if (!adminConfigured() || !(await isAdmin())) redirect('/admin/login')

  return (
    <div className="admin-shell">
      <header className="admin-bar">
        <div className="container admin-bar-inner">
          <Link href="/admin" className="admin-bar-brand">
            yurr cooked <span>admin</span>
          </Link>
          <nav className="admin-bar-nav">
            <Link href="/admin">Overview</Link>
            <Link href="/admin/recipes">Recipes</Link>
            <Link href="/admin/shop">Shop</Link>
            <Link href="/admin/photos">Photos</Link>
          </nav>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="admin-signout">Sign out</button>
          </form>
        </div>
      </header>
      {children}
    </div>
  )
}
