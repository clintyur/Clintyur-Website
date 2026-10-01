import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for yur cooked.',
  robots: { index: false, follow: true },
}

// TODO: Replace with a real privacy policy before launch.
// This site uses OAuth sign-in and Stripe, so the real policy needs to cover
// account data, payment processing and cookies. The sign-in page links here.
export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: 'clamp(96px, 12vw, 160px) 0 clamp(72px, 10vw, 120px)' }}>
      <div style={{ maxWidth: '680px' }}>
        <div className="eyebrow"><span className="dot"></span>Legal</div>
        <h1 className="book-title" style={{ marginBottom: '24px' }}>
          Privacy <span className="it">policy</span>
        </h1>
        <p className="book-desc">
          Our privacy policy is being finalised and will be published here before
          accounts and purchases open to the public.
        </p>
        <p className="book-desc" style={{ marginTop: '16px' }}>
          If you have a question about your data in the meantime, get in touch via the{' '}
          <Link href="/contact" style={{ color: 'var(--accent)' }}>contact page</Link>.
        </p>
      </div>
    </div>
  )
}
