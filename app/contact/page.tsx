'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [mode, setMode] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Submitted! We\'ll be in touch.')
    setTimeout(() => setStatus(null), 3000)
  }

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
            <input type="text" id="name" placeholder="Your name" required />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="your@email.com" required />
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
            <textarea id="message" placeholder="Tell me more..." rows={6} required />
          </div>

          <div className="submit-row">
            <span className="eyebrow">
              {status || 'Ready to send'}
            </span>
            <button type="submit" className="btn">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
