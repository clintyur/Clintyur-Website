'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingBag, User, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/recipes', label: 'Recipes', children: [
    { href: '/recipes?category=mains', label: 'Mains' },
    { href: '/recipes?category=desserts', label: 'Desserts' },
    { href: '/recipes?category=baking', label: 'Baking' },
    { href: '/recipes?category=quick', label: 'Under 30 Min' },
  ]},
  { href: '/shop', label: 'Shop', children: [
    { href: '/shop?category=cookware', label: 'Cookware' },
    { href: '/shop?category=apparel', label: 'Apparel' },
    { href: '/shop?category=accessories', label: 'Accessories' },
  ]},
  { href: '/blog', label: 'Journal' },
  { href: '/subscribe', label: 'Membership' },
]

interface NavbarProps {
  cartCount?: number
  user?: { name?: string | null; image?: string | null } | null
}

export function Navbar({ cartCount = 0, user }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-stone-100'
          : 'bg-transparent'
      )}
    >
      <nav className="section flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            'font-serif text-2xl font-bold tracking-tight transition-colors',
            scrolled || !isHome ? 'text-stone-900' : 'text-white'
          )}
        >
          Provecho
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.href)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  scrolled || !isHome
                    ? 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                    : 'text-white/85 hover:text-white hover:bg-white/10',
                  pathname.startsWith(link.href) && pathname !== '/' &&
                    (scrolled || !isHome ? 'text-brand-600' : 'text-brand-300')
                )}
              >
                {link.label}
                {link.children && (
                  <ChevronDown
                    size={14}
                    className={cn(
                      'transition-transform',
                      activeDropdown === link.href && 'rotate-180'
                    )}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {link.children && activeDropdown === link.href && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-hover border border-stone-100 py-2 animate-fade-in">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <Link
              href="/account"
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                scrolled || !isHome
                  ? 'text-stone-700 hover:bg-stone-100'
                  : 'text-white/85 hover:bg-white/10'
              )}
            >
              <User size={16} />
              <span className="hidden xl:inline">{user.name?.split(' ')[0] ?? 'Account'}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                scrolled || !isHome
                  ? 'text-stone-700 hover:bg-stone-100'
                  : 'text-white/85 hover:bg-white/10'
              )}
            >
              Sign in
            </Link>
          )}

          <Link href="/cart" className="relative p-2 rounded-lg transition-colors hover:bg-stone-100">
            <ShoppingBag
              size={20}
              className={scrolled || !isHome ? 'text-stone-700' : 'text-white'}
            />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/subscribe" className="btn-primary btn-sm ml-1">
            Join — $3.99/mo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <Link href="/cart" className="relative p-2">
            <ShoppingBag
              size={20}
              className={scrolled || !isHome ? 'text-stone-700' : 'text-white'}
            />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className={cn(
              'p-2 rounded-lg transition-colors',
              scrolled || !isHome ? 'text-stone-700 hover:bg-stone-100' : 'text-white hover:bg-white/10'
            )}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-stone-100 shadow-hover animate-slide-up">
          <div className="section py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-stone-700 font-medium hover:bg-stone-50 transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 flex flex-col gap-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-stone-100 mt-2 pt-4 flex flex-col gap-2">
              {user ? (
                <Link href="/account" className="btn-secondary w-full text-center">
                  My Account
                </Link>
              ) : (
                <Link href="/login" className="btn-secondary w-full text-center">
                  Sign in
                </Link>
              )}
              <Link href="/subscribe" className="btn-primary w-full text-center">
                Join Membership — $3.99/mo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
