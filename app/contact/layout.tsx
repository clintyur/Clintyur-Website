import type { Metadata } from 'next'

// The page itself is a client component and cannot export metadata, so it
// lives here instead.
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Private dinners anywhere you need me, brand collaborations, and press enquiries.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
