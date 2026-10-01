import Image from 'next/image'

export function Hero() {
  return (
    <section className="hero">
      {/* Background image */}
      <div className="hero-img">
        <Image
          src="/images/hero-clint-wagyu.jpg"
          alt="Clint searing A5 wagyu over open flame"
          width={1200}
          height={1600}
          priority
          sizes="100vw"
        />
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
