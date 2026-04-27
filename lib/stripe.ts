import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
    price: 399,   // $3.99
    name: 'Provecho Member',
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
