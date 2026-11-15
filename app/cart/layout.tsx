import type { Metadata } from 'next'

// The page itself is a client component and cannot export metadata, so it
// lives here instead.
export const metadata: Metadata = {
  title: 'Your bag',
  description: 'Review the items in your bag before checkout.',
  robots: { index: false, follow: true },
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children
}
