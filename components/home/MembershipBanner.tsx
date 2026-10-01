import Link from 'next/link'
import { Lock, Zap, Tag, Star } from 'lucide-react'

const PERKS = [
  { icon: Lock,  label: 'Subscriber-only recipes', sub: '50+ exclusive dishes' },
  { icon: Zap,   label: 'Early access',             sub: 'New content first' },
  { icon: Tag,   label: '10% off the shop',         sub: 'Every order, forever' },
  { icon: Star,  label: 'Priority community',        sub: 'Your comments rise first' },
]

export function MembershipBanner() {
  return (
    <section className="section-pad bg-gradient-hero relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-terracotta-500/10 blur-2xl pointer-events-none" />

      <div className="section relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            yur cooked Membership
          </p>
          <h2 className="text-display-md font-serif text-white mb-4">
            Unlock the full kitchen
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed">
            $3.99/month. Cancel anytime. Start with a{' '}
            <strong className="text-brand-300">99¢ first month</strong> if you want to try before you commit.
          </p>
        </div>

        {/* Perks grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PERKS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-6 text-center hover:bg-white/12 transition-colors"
            >
              <div className="inline-flex p-3 rounded-xl bg-brand-500/20 mb-4">
                <Icon size={22} className="text-brand-300" />
              </div>
              <p className="font-semibold text-white text-sm mb-1">{label}</p>
              <p className="text-stone-400 text-xs">{sub}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/subscribe?trial=true" className="btn-primary btn-lg">
            Try for 99¢ — first month
          </Link>
          <Link
            href="/subscribe"
            className="btn-lg inline-flex items-center justify-center gap-2 rounded-full font-medium text-white/70 hover:text-white transition-colors px-6 py-4 text-base"
          >
            See all plan details
          </Link>
        </div>

        <p className="text-center text-stone-500 text-xs mt-4">
          No commitment. Cancels anytime. 30-day money-back guarantee.
        </p>
      </div>
    </section>
  )
}
