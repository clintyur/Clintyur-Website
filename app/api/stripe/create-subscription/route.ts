import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { stripe, PLANS } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { plan } = await req.json() as { plan: 'trial' | 'monthly' }

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  // Create or retrieve Stripe customer
  let customerId = user.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name ?? undefined,
      metadata: { userId: user.id },
    })
    customerId = customer.id
    await db.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    })
  }

  const isTrial = plan === 'trial' && !user.trialUsed
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: PLANS.monthly.priceId,
        quantity: 1,
      },
    ],
    // 99¢ trial: apply a coupon or use a separate trial price
    ...(isTrial && {
      subscription_data: {
        trial_period_days: 30,
        trial_settings: {
          end_behavior: { missing_payment_method: 'cancel' },
        },
      },
      discounts: [],
    }),
    success_url: `${appUrl}/account?subscription=success`,
    cancel_url: `${appUrl}/subscribe`,
    allow_promotion_codes: true,
    metadata: {
      userId: user.id,
      plan,
      isTrial: isTrial ? 'true' : 'false',
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}
