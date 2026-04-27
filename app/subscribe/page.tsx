'use client'

import { useState } from 'react'
import { Check, Zap, Star } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const FEATURES = [
  'All subscriber-only recipes (50+ and growing)',
  'Early access to new recipes before they go public',
  '10% discount on every shop order, forever',
  'Priority comment visibility on all recipes',
  'Monthly ingredient spotlight & sourcing guide',
  'Ad-free, distraction-free recipe browsing',
]

const FAQ = [
  {
    q: 'What is the 99¢ trial?',
    a: 'Your first 30 days cost just $0.99. After that, your subscription automatically continues at $3.99/month unless you cancel before the trial ends. No surprise charges — we email you a reminder 3 days before renewal.',
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes. Cancel from your account page at any time. You'll retain access until the end of your current billing period.",
  },
  {
    q: 'What happens to my shop discount if I cancel?',
    a: 'Your 10% discount is active while your subscription is active. It ends the day your subscription ends.',
  },
  {
    q: 'Do you offer a family or team plan?',
    a: "Not yet! It's on our roadmap. Email us at hello@provecho.com if you're interested.",
  },
  {
    q: 'Is there a money-back guarantee?',
    a: "Yes. If you're not happy within 30 days of your first payment, email us and we'll refund you in full, no questions asked.",
  },
]

function SubscribePageInner() {
  const searchParams = useSearchParams()
  const isTrial = searchParams.get('trial') === 'true'
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly'>(isTrial ? 'trial' : 'monthly')
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-hero text-center py-20 px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
          Provecho Membership
        </p>
        <h1 className="text-display-lg font-serif text-white mb-4">
          Cook better. Every week.
        </h1>
        <p className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
          Unlock the full recipe library, shop discounts, and early access for less than a cup of coffee per month.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="section py-16">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {/* Trial card */}
            <button
              onClick={() => setSelectedPlan('trial')}
              className={`relative text-left rounded-3xl border-2 p-6 transition-all ${
                selectedPlan === 'trial'
                  ? 'border-brand-500 bg-brand-50 shadow-brand'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="absolute -top-3 left-6">
                <span className="bg-terracotta-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Zap size={10} /> Most popular
                </span>
              </div>
              <p className="font-semibold text-stone-500 text-sm mb-1">Start with a trial</p>
              <p className="font-serif text-4xl font-bold text-stone-900 mb-1">
                $0.99 <span className="text-lg text-stone-400 font-sans font-normal">/ first month</span>
              </p>
              <p className="text-stone-400 text-sm">Then $3.99/mo — cancel anytime</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-brand-700 font-medium">
                {selectedPlan === 'trial' && <Check size={14} />}
                Full access for 30 days
              </div>
            </button>

            {/* Monthly card */}
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`text-left rounded-3xl border-2 p-6 transition-all ${
                selectedPlan === 'monthly'
                  ? 'border-brand-500 bg-brand-50 shadow-brand'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <p className="font-semibold text-stone-500 text-sm mb-1">Monthly membership</p>
              <p className="font-serif text-4xl font-bold text-stone-900 mb-1">
                $3.99 <span className="text-lg text-stone-400 font-sans font-normal">/ month</span>
              </p>
              <p className="text-stone-400 text-sm">Cancel anytime</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-stone-600">
                {selectedPlan === 'monthly' && <Check size={14} className="text-brand-600" />}
                Everything, no strings
              </div>
            </button>
          </div>

          {/* Features list */}
          <div className="bg-white rounded-3xl border border-stone-100 shadow-card p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Star size={16} className="text-brand-500" fill="#f59e0b" />
              <h2 className="font-semibold text-stone-800">What&apos;s included</h2>
            </div>
            <ul className="space-y-3">
              {FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm text-stone-700">
                  <Check size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="btn-primary btn-lg w-full mb-3"
          >
            {loading
              ? 'Redirecting…'
              : selectedPlan === 'trial'
              ? 'Start 99¢ trial — billed monthly after'
              : 'Start membership — $3.99/month'}
          </button>
          <p className="text-center text-xs text-stone-400">
            Secured by Stripe. No commitment. 30-day money-back guarantee.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-stone-50 border-t border-stone-100">
        <div className="section py-16 max-w-2xl mx-auto">
          <h2 className="text-display-sm font-serif text-stone-900 text-center mb-10">
            Frequently asked
          </h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 font-medium text-stone-800 flex justify-between items-center hover:bg-stone-50 transition-colors"
                >
                  {item.q}
                  <span className={`transition-transform text-stone-400 ${openFaq === i ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SubscribePage() {
  return (
    <Suspense>
      <SubscribePageInner />
    </Suspense>
  )
}
