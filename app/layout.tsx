import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FryingPanCursor } from '@/components/cursor/FryingPanCursor'
import { CartProvider } from '@/components/shop/CartProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://provecho.com'),
  title: {
    default: 'Provecho — Recipes & Cookware',
    template: '%s | Provecho',
  },
  description: 'Restaurant-quality recipes for home cooks, plus the cookware and apparel to match. Join the Provecho community.',
  keywords: ['recipes', 'cooking', 'cookware', 'food', 'kitchen', 'provecho'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Provecho',
    title: 'Provecho — Recipes & Cookware',
    description: 'Restaurant-quality recipes for home cooks, plus the cookware and apparel to match.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Provecho — Recipes & Cookware',
    description: 'Restaurant-quality recipes for home cooks.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#f59e0b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          <FryingPanCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
