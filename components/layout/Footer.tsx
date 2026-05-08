import Link from 'next/link'

// SVG Icons matching the yur cooked design
const icons = {
  ig: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor"/>
    </svg>
  ),
  yt: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M10 9.5v5l4.5-2.5L10 9.5z" fill="currentColor"/>
    </svg>
  ),
  tt: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M14 4c.5 2.5 2.5 4.5 5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand section */}
          <div>
            <div className="footer-mark">yur cooked<span className="accent-dot"></span></div>
            <p className="footer-tag">Recipes, goods, and the art of eating well — from a kitchen in New York.</p>
            <div className="cluster" style={{ marginTop: '24px' }}>
              <a href="https://instagram.com/clintyurr" target="_blank" rel="noreferrer" className="social-bar" style={{ display: 'inline-flex' }}>
                <icons.ig /> @clintyurr
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/recipes">Recipes</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4>Follow</h4>
            <ul>
              <li>
                <a href="https://instagram.com/clintyurr" target="_blank" rel="noreferrer">
                  <span style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                    <icons.ig /> Instagram
                  </span>
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@ClintYur" target="_blank" rel="noreferrer">
                  <span style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                    <icons.yt /> YouTube
                  </span>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@clintyurr" target="_blank" rel="noreferrer">
                  <span style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                    <icons.tt /> TikTok
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Inquiries */}
          <div>
            <h4>Inquiries</h4>
            <ul>
              <li><Link href="/contact">Private Chef</Link></li>
              <li><Link href="/contact">Brand Collaborations</Link></li>
              <li><Link href="/contact">Press</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bot">
          <span>© {new Date().getFullYear()} yur cooked. All rights reserved.</span>
          <span>New York, NY</span>
        </div>
      </div>
    </footer>
  )
}
