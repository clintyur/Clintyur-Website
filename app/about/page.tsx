'use client'

export default function AboutPage() {
  return (
    <div>
      <section className="book-hero">
        <div className="book-hero-img">
          <image-slot></image-slot>
        </div>
        <div className="book-hero-info">
          <div className="book-meta">
            <span>About</span>
            <span>2024</span>
          </div>
          <h1 className="book-title">The story <span className="it">behind</span> yur cooked</h1>
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
          <p className="num">NYC<span className="it">/</span>ATX</p>
          <p className="lbl">Based In</p>
        </div>
        <div className="cell">
          <p className="num">Every<span className="it">day</span></p>
          <p className="lbl">Cooking Since</p>
        </div>
      </div>

      <section className="container" style={{ paddingTop: 'clamp(60px, 8vw, 120px)', paddingBottom: 0 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot"></span>Media</div>
            <h2 className="section-title">Find <span className="it">me</span></h2>
          </div>
        </div>

        <div className="preview-grid">
          <a href="https://instagram.com/clintyurr" target="_blank" rel="noreferrer" className="preview">
            <div className="preview-img" style={{ background: 'var(--accent)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--cream)' }}>
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="preview-name">Instagram</h3>
            <p className="preview-desc">@clintyurr</p>
          </a>

          <a href="https://youtube.com/@ClintYur" target="_blank" rel="noreferrer" className="preview">
            <div className="preview-img" style={{ background: 'var(--accent)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--cream)' }}>
                <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M10 9.5v5l4.5-2.5L10 9.5z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="preview-name">YouTube</h3>
            <p className="preview-desc">@ClintYur</p>
          </a>

          <a href="https://tiktok.com/@clintyurr" target="_blank" rel="noreferrer" className="preview">
            <div className="preview-img" style={{ background: 'var(--accent)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--cream)' }}>
                <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M14 4c.5 2.5 2.5 4.5 5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="preview-name">TikTok</h3>
            <p className="preview-desc">@clintyurr</p>
          </a>
        </div>
      </section>
    </div>
  )
}
