import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for yur cooked.',
  robots: { index: false, follow: true },
}

// TODO: Replace with real terms of service copy before launch.
// The sign-in page links here as part of the consent line, so this route
// must exist — but the content below is a placeholder, not legal text.
export default function TermsPage() {
  return (
    <div className="container" style={{ padding: 'clamp(96px, 12vw, 160px) 0 clamp(72px, 10vw, 120px)' }}>
      <div style={{ maxWidth: '680px' }}>
        <div className="eyebrow"><span className="dot"></span>Legal</div>
        <h1 className="book-title" style={{ marginBottom: '24px' }}>
          Terms of <span className="it">service</span>
        </h1>
        <p className="book-desc">
          Our terms of service are being finalised and will be published here before
          accounts and purchases open to the public.
        </p>
        <p className="book-desc" style={{ marginTop: '16px' }}>
          If you have a question in the meantime, get in touch via the{' '}
          <Link href="/contact" style={{ color: 'var(--accent)' }}>contact page</Link>.
        </p>
      </div>
    </div>
  )
}
