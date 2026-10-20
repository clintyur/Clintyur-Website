/**
 * One-time setup: creates the PayPal product + billing plan behind the
 * membership, then prints the plan id to put in PAYPAL_MONTHLY_PLAN_ID.
 *
 *   PAYPAL_CLIENT_ID=... PAYPAL_CLIENT_SECRET=... PAYPAL_ENV=sandbox \
 *     npx tsx scripts/paypal-setup-plan.ts
 *
 * Run it once against sandbox to test, then again with PAYPAL_ENV=live.
 * Each run creates a NEW plan — don't run it repeatedly against live.
 */
import { paypalFetch, paypalBaseUrl, paypalConfigured } from '../lib/paypal'

const MONTHLY_PRICE_USD = '3.99'

async function main() {
  if (!paypalConfigured()) {
    console.error('Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET first.')
    process.exit(1)
  }

  console.log(`Using ${paypalBaseUrl()}\n`)

  const product = await paypalFetch<{ id: string; name: string }>('/v1/catalogs/products', {
    method: 'POST',
    body: {
      name: 'yurr cooked Membership',
      description: 'Subscriber-only recipes, early access, and 10% off the shop.',
      type: 'SERVICE',
      category: 'ONLINE_SERVICES',
    },
  })
  console.log(`✓ product  ${product.id}`)

  const plan = await paypalFetch<{ id: string; status: string }>('/v1/billing/plans', {
    method: 'POST',
    body: {
      product_id: product.id,
      name: 'yurr cooked Member — Monthly',
      description: `$${MONTHLY_PRICE_USD}/month, cancel anytime.`,
      status: 'ACTIVE',
      billing_cycles: [{
        frequency: { interval_unit: 'MONTH', interval_count: 1 },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 0,                       // 0 = bill until cancelled
        pricing_scheme: {
          fixed_price: { value: MONTHLY_PRICE_USD, currency_code: 'USD' },
        },
      }],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 3,
      },
    },
  })

  console.log(`✓ plan     ${plan.id}  (${plan.status})\n`)
  console.log('Add this to your environment:\n')
  console.log(`  PAYPAL_MONTHLY_PLAN_ID=${plan.id}\n`)
}

main().catch((err) => {
  console.error('\nSetup failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
