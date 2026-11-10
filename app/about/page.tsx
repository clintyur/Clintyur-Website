import Image from 'next/image'

export default function AboutPage() {
  return (
    <div>
      <section className="book-hero">
        <div className="book-hero-img">
          <Image
            src="/images/clint-kitchen-line.jpg"
            alt="Clint working the line in the kitchen"
            width={1200}
            height={1600}
            priority
            sizes="(max-width: 880px) 100vw, 50vw"
          />
        </div>
        <div className="book-hero-info">
          <div className="book-meta">
            <span>About</span>
            <span>2024</span>
          </div>
          <h1 className="book-title">The story <span className="it">behind</span> yurr cooked</h1>
          <p className="book-desc">
            Built from years of cooking professionally and for people I care about. This is a space to share recipes that work, goods that matter, and the philosophy of intentional cooking.
          </p>
        </div>
      </section>

      <div className="container about-story">
        <div className="col-meta">
          <span>The foundation</span>
        </div>
        <div className="col-body">
          <p>
            Everything here starts with a simple principle: <span className="pull">cook with intention</span>. This means understanding what you're making, why you're making it, and trusting that it will turn out well.
          </p>
          <p>
            I spent years cooking in professional kitchens before deciding that the most meaningful cooking happens at home, with people you care about. That's where this all comes from.
          </p>
        </div>
      </div>

      <div className="about-strip">
        <div className="cell">
          <p className="num">200<span className="it">+</span></p>
          <p className="lbl">Recipes Tested</p>
        </div>
        <div className="cell">
          <p className="num">NYC</p>
          <p className="lbl">Based In</p>
        </div>
      </div>

      {/* Commissioned brand artwork */}
      <section className="container artwork-section">
        <figure className="artwork">
          <Image
            src="/images/logo-yurr.png"
            alt="Graphite and coloured-pencil drawing of a lit joint, its smoke spelling out yurr"
            width={1187}
            height={1200}
            sizes="(max-width: 700px) 86vw, 520px"
            className="artwork-img"
          />
          <figcaption className="artwork-caption">
            Artwork by <span className="it">Aurel Schmidt</span>
          </figcaption>
        </figure>
      </section>

      <section className="container" style={{ paddingTop: 'clamp(60px, 8vw, 120px)', paddingBottom: 0 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot"></span>Media</div>
            <h2 className="section-title">Find <span className="it">me</span></h2>
          </div>
        </div>

        <div className="preview-grid social-grid">
          <a href="https://instagram.com/clintyurr" target="_blank" rel="noreferrer" className="preview social-card">
            <div className="preview-img">
              <Image
                src="/images/private-dinner-plating.jpg"
                alt=""
                width={1200}
                height={1600}
                sizes="(max-width: 880px) 100vw, 50vw"
              />
              <span className="social-glyph" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor"/>
                </svg>
              </span>
            </div>
            <h3 className="preview-name">Instagram</h3>
            <p className="preview-desc">@clintyurr</p>
          </a>

          <a href="https://youtube.com/@ClintYur" target="_blank" rel="noreferrer" className="preview social-card">
            <div className="preview-img">
              <Image
                src="/images/hero-clint-wagyu.jpg"
                alt=""
                width={1200}
                height={1600}
                sizes="(max-width: 880px) 100vw, 50vw"
              />
              <span className="social-glyph" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
                  <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10.2 9.2v5.6l4.8-2.8-4.8-2.8z" fill="currentColor"/>
                </svg>
              </span>
            </div>
            <h3 className="preview-name">YouTube</h3>
            <p className="preview-desc">@ClintYur</p>
          </a>
        </div>
      </section>
    </div>
  )
}
