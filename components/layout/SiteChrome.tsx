'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FryingPanCursor } from '@/components/cursor/FryingPanCursor'

/**
 * The public site's navigation, footer and cursor.
 *
 * /admin is a working surface with its own bar, so it opts out: showing the
 * visitor-facing nav there stacks two navigations on top of each other and
 * invites a mis-click into the public site mid-edit.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')

  if (isAdmin) return <main>{children}</main>

  return (
    <>
      <FryingPanCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
