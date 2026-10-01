'use client'

import { useState } from 'react'

type SendState = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactPage() {
  const [mode, setMode] = useState<string | null>(null)
  const [state, setState] = useState<SendState>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setState('sending')
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          topic: mode ?? undefined,
          message: data.get('message'),
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        setError(body?.error ?? 'Something went wrong. Please try again.')
        setState('error')
        return
      }

      form.reset()
      setMode(null)
      setState('sent')
    } catch {
      setError('Network error — please try again.')
      setState('error')
    }
  }

  const statusLabel =
    state === 'sending' ? 'Sending…'
    : state === 'sent'  ? "Sent! I'll be in touch."
    : state === 'error' ? error
    : 'Ready to send'

  return (
    <div className="container">
      <div className="contact-wrap">
        <div className="contact-info">
          <h1>Get <span className="it">in touch</span></h1>
          <p>
            Interested in collaboration, speaking, or just want to say hello? Fill out the form and we'll get back to you.
          </p>

          <div className="contact-modes">
            <div className="mode">
              <span className="mode-name">For private <span className="it">dinners</span></span>
              <span className="mode-meta">NYC & Austin</span>
            </div>
            <div className="mode">
              <span className="mode-name">Brand <span className="it">collaborations</span></span>
              <span className="mode-meta">Let's work together</span>
            </div>
            <div className="mode">
              <span className="mode-name"><span className="it">Press</span> inquiries</span>
              <span className="mode-meta">Media & features</span>
            </div>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" required />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="your@email.com" required />
          </div>

          <div className="field">
            <label htmlFor="topic">Topic</label>
            <div className="pill-row">
              {['Private Dinner', 'Brand Collab', 'Press', 'Other'].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`pill${mode === t ? ' active' : ''}`}
                  onClick={() => setMode(mode === t ? null : t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Tell me more..." rows={6} required />
          </div>

          <div className="submit-row">
            <span
              className="eyebrow"
              role="status"
              aria-live="polite"
              style={state === 'error' ? { color: 'var(--accent)' } : undefined}
            >
              {statusLabel}
            </span>
            <button type="submit" className="btn" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
