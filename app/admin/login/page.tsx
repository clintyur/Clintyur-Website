import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { isAdmin, adminConfigured } from '@/lib/admin-auth'
import { AdminLoginForm } from '@/components/admin/AdminLoginForm'

export const metadata: Metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect('/admin')

  const configured = adminConfigured()

  return (
    <div className="container admin-login">
      <div className="admin-login-card">
        <div className="eyebrow"><span className="dot"></span>Admin</div>
        <h1 className="book-title admin-login-title">
          Sign <span className="it">in</span>
        </h1>

        {configured ? (
          <AdminLoginForm />
        ) : (
          <p className="admin-login-note">
            Admin access isn&apos;t set up on this deployment yet.{' '}
            <code>ADMIN_PASSWORD_HASH</code> and <code>ADMIN_SESSION_SECRET</code>{' '}
            need to be set in the environment before you can sign in.
          </p>
        )}
      </div>
    </div>
  )
}
