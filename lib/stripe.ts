import Stripe from 'stripe'

let stripeClient: Stripe | null = null

function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set — Stripe features are unavailable.')
    }
    stripeClient = new Stripe(key, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })
  }
  return stripeClient
}

/**
 * Lazily-initialised Stripe client. Constructing the real client at module load
 * makes any build or import fail when STRIPE_SECRET_KEY is absent (CI, local dev
 * without secrets), so the key is only required at the moment a call is made.
 */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    return Reflect.get(getStripe(), prop, receiver)
  },
})

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
    price: 399,   // $3.99
    name: 'yur cooked Member',
    interval: 'month' as const,
    features: [
      'All subscriber-only recipes',
      'Early access to new content',
      '10% off all shop items',
      'Priority comment visibility',
      'Monthly ingredient spotlight',
    ],
  },
  trial: {
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
    price: 99,   // $0.99
    name: '1-Month Trial',
    trialDays: 0,
    features: ['Full access for 30 days', 'Cancels or converts to $3.99/mo'],
  },
} as const

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}
