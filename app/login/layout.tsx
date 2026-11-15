import type { Metadata } from 'next'

// The page itself is a client component and cannot export metadata, so it
// lives here instead.
export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your yurr cooked account.',
  robots: { index: false, follow: true },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
