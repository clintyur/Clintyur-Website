'use client'

import { useState } from 'react'

export function PromoBar() {
  const [closed, setClosed] = useState(false)

  if (closed) return null

  return (
    <div className="promo">
      <div className="container promo-row">
        <span className="promo-spacer"></span>
        <div className="promo-msg">
          <span className="promo-eyebrow">Limited</span>
          <span className="promo-text">
            Unlock <strong>50% off for a year</strong> when you subscribe now
          </span>
          <a href="/subscribe" className="promo-cta">
            Subscribe
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <button className="promo-close" onClick={() => setClosed(true)} aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
