import Link from 'next/link'
import { Instagram, Youtube, Mail } from 'lucide-react'

const LINKS = {
  Recipes: [
    { href: '/recipes?category=mains',    label: 'Mains' },
    { href: '/recipes?category=desserts', label: 'Desserts' },
    { href: '/recipes?category=baking',   label: 'Baking' },
    { href: '/recipes?category=quick',    label: 'Quick & Easy' },
  ],
  Shop: [
    { href: '/shop?category=cookware',    label: 'Cookware' },
    { href: '/shop?category=apparel',     label: 'Apparel' },
    { href: '/shop?category=accessories', label: 'Accessories' },
    { href: '/shop/gift-cards',           label: 'Gift Cards' },
  ],
  Company: [
    { href: '/about',    label: 'About' },
    { href: '/blog',     label: 'Journal' },
    { href: '/subscribe', label: 'Membership' },
    { href: '/contact',  label: 'Contact' },
  ],
  Support: [
    { href: '/faq',         label: 'FAQ' },
    { href: '/shipping',    label: 'Shipping & Returns' },
    { href: '/privacy',     label: 'Privacy Policy' },
    { href: '/terms',       label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      {/* Newsletter band */}
      <div className="border-b border-stone-800">
        <div className="section py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand-400 mb-1">
              Free recipes, weekly
            </p>
            <h3 className="text-white font-serif text-2xl font-bold">
              Get the newsletter
            </h3>
          </div>
          <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-72 bg-stone-900 border border-stone-700 rounded-full px-5 py-3 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-brand-500 transition"
            />
            <button
              type="submit"
              className="btn-primary whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="section py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-white font-serif text-2xl font-bold">
              Provecho
            </Link>
            <p className="mt-3 text-sm text-stone-400 leading-relaxed">
              Recipes made with intention. Cookware built to last. Made in California.
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-stone-400 hover:text-brand-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-stone-400 hover:text-brand-400 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="mailto:hello@provecho.com"
                aria-label="Email"
                className="text-stone-400 hover:text-brand-400 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white text-sm font-semibold mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="section py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Provecho. All rights reserved.</p>
          <p>Crafted with love in California 🍳</p>
        </div>
      </div>
    </footer>
  )
}
