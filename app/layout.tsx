import type { Metadata, Viewport } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FryingPanCursor } from '@/components/cursor/FryingPanCursor'
import { CartProvider } from '@/components/shop/CartProvider'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://yurcooked.com'),
  title: {
    default: 'yur cooked — Recipes, Goods & the Art of Eating Well',
    template: '%s | yur cooked',
  },
  description: 'Recipes, goods, and the art of eating well — from a kitchen in New York. Explore curated recipes, cookware, and join our membership community.',
  keywords: ['recipes', 'cooking', 'cookware', 'food', 'kitchen', 'private chef', 'yur cooked'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'yur cooked',
    title: 'yur cooked — Recipes & Cookware',
    description: 'Recipes, goods, and the art of eating well from a kitchen in New York.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yur cooked',
    description: 'Recipes, goods, and the art of eating well.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1814',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="/image-slot.js" defer></script>
      </head>
      <body>
        {/* SVG filters for hand-drawn effect */}
        <svg id="filters" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
          <defs>
            <filter id="hand">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                numOctaves="5"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
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
