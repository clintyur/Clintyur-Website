'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="hero">
      {/* Background image slot */}
      <div className="hero-img">
        <image-slot></image-slot>
      </div>

      {/* Hero content */}
      <div className="hero-content">
        <div className="hero-top">
          <div className="stack">
            <span className="num">New</span>
          </div>
        </div>

        <div className="hero-meta">
          <p className="hero-tagline">
            Recipes, goods, and the art of eating well from a kitchen in New York
          </p>
          <div className="hero-wordmark">
            yur <span className="it">cooked</span><span className="accent-dot"></span>
          </div>
        </div>
      </div>
    </section>
  )
}
