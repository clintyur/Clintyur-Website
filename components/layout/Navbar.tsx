'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/recipes', label: 'Recipes' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

interface NavbarProps {
  cartCount?: number
  user?: { name?: string | null; image?: string | null } | null
}

export function Navbar({ cartCount = 0, user }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header className="nav">
        <div className="container nav-row">
          <Link href="/" className="logo">
            yur cooked<span className="mark"></span>
          </Link>
          <nav className="nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link${pathname === href ? ' active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <button
            className={`nav-burger${open ? ' open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile menu. Must live OUTSIDE <header>: .nav uses backdrop-filter,
          which makes it the containing block for position:fixed descendants,
          so an inset menu nested inside it collapses to the header's height. */}
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <Link href="/" className="nav-link" onClick={() => setOpen(false)}>
          Home
        </Link>
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <div className="mobile-menu-foot">
          <a href="https://instagram.com/clintyurr" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://youtube.com/@ClintYur" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://tiktok.com/@clintyurr" target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </div>
    </>
  )
}
