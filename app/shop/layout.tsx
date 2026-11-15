import type { Metadata } from 'next'

// The page itself is a client component and cannot export metadata, so it
// lives here instead.
export const metadata: Metadata = {
  title: 'Shop',
  description: 'Cookware and goods chosen because they are useful, well made, and actually used in my own kitchen.',
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
