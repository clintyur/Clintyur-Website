import type { Metadata } from 'next'

// The page itself is a client component and cannot export metadata, so it
// lives here instead.
export const metadata: Metadata = {
  title: 'Membership',
  description: 'Unlock the full recipe library, shop discounts and early access for less than a cup of coffee a month.',
}

export default function SubscribeLayout({ children }: { children: React.ReactNode }) {
  return children
}
