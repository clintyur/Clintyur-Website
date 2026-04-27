'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)

  async function openPortal() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-portal', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={openPortal}
      disabled={loading}
      className="btn-secondary btn-sm flex items-center gap-1.5"
    >
      <Settings size={13} />
      {loading ? 'Loading…' : 'Manage'}
    </button>
  )
}
