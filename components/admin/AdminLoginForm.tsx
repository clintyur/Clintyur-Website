'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function AdminLoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setPassword('')
        // refresh() re-runs the server layout so the guard sees the new cookie.
        router.replace('/admin')
        router.refresh()
        return
      }
      const data = await res.json().catch(() => null)
      setError(data?.error ?? 'Could not sign in.')
    } catch {
      setError('Could not reach the server.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="admin-login-form">
      <label htmlFor="admin-password" className="admin-label">Password</label>
      <input
        id="admin-password"
        type="password"
        className="admin-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        autoFocus
        required
      />
      {error && <p className="admin-error" role="alert">{error}</p>}
      <button type="submit" className="btn-primary admin-login-submit" disabled={busy}>
        {busy ? 'Checking…' : 'Sign in'}
      </button>
    </form>
  )
}
