import { NextResponse } from 'next/server'
import { z } from 'zod'
import { paypalConfigured, paypalFetch, approvalLink, type PayPalLink } from '@/lib/paypal'

const schema = z.object({ plan: z.enum(['monthly', 'trial']).default('monthly') })

export async function POST(req: Request) {
  if (!paypalConfigured()) {
    return NextResponse.json(
      { error: 'Memberships are not set up yet. Please check back soon.' },
      { status: 503 },
    )
  }

  const planId = process.env.PAYPAL_MONTHLY_PLAN_ID
  if (!planId) {
    console.warn('PAYPAL_MONTHLY_PLAN_ID is not set — run scripts/paypal-setup-plan.ts')
    return NextResponse.json(
      { error: 'Memberships are not set up yet. Please check back soon.' },
      { status: 503 },
    )
  }

  let payload: unknown = {}
  try {
    payload = await req.json()
  } catch {
    /* body is optional; default to monthly */
  }
  const parsed = schema.safeParse(payload ?? {})
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 422 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  try {
    const sub = await paypalFetch<{ id: string; status: string; links: PayPalLink[] }>(
      '/v1/billing/subscriptions',
      {
        method: 'POST',
        body: {
          plan_id: planId,
          application_context: {
            brand_name: 'yurr cooked',
            user_action: 'SUBSCRIBE_NOW',
            shipping_preference: 'NO_SHIPPING',
            return_url: `${appUrl}/account?subscribed=1`,
            cancel_url: `${appUrl}/subscribe`,
          },
        },
      },
    )

    const url = approvalLink(sub.links)
    if (!url) {
      console.error('PayPal subscription created but returned no approval link', sub.id)
      return NextResponse.json({ error: 'Could not start the membership. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ url, subscriptionId: sub.id })
  } catch (err) {
    console.error('PayPal create-subscription failed:', err)
    return NextResponse.json({ error: 'Could not start the membership. Please try again.' }, { status: 502 })
  }
}
