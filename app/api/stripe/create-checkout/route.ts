import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  items: z.array(z.object({
    variantId: z.string(),
    quantity: z.number().int().positive(),
  })),
  couponCode: z.string().optional(),
})

export async function POST(req: Request) {
  const session = await auth()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const body = await req.json()
  const { items, couponCode } = schema.parse(body)

  // Load variants
  const variantIds = items.map((i) => i.variantId)
  const variants = await db.productVariant.findMany({
    where: { id: { in: variantIds } },
    include: { product: true },
  })

  // Check subscriber discount (10% off)
  const userSub = session?.user?.subscriptionStatus
  const isSubscriber = userSub === 'ACTIVE' || userSub === 'TRIALING'

  const lineItems = variants.map((v) => {
    const requestedQty = items.find((i) => i.variantId === v.id)?.quantity ?? 1
    const price = isSubscriber ? Math.round(v.price * 0.9) : v.price
    return {
      price_data: {
        currency: 'usd',
        unit_amount: price,
        product_data: {
          name: `${v.product.name} — ${v.name}`,
          images: [v.product.heroImage],
          metadata: { variantId: v.id, productId: v.productId },
        },
      },
      quantity: requestedQty,
    }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ['US', 'CA'] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 695, currency: 'usd' },
          display_name: 'Standard shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 1495, currency: 'usd' },
          display_name: 'Express shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 2 },
            maximum: { unit: 'business_day', value: 3 },
          },
        },
      },
    ],
    allow_promotion_codes: !couponCode,
    ...(couponCode ? { discounts: [{ coupon: couponCode }] } : {}),
    success_url: `${appUrl}/account/orders?checkout=success`,
    cancel_url: `${appUrl}/cart`,
    ...(session?.user && { customer_email: session.user.email ?? undefined }),
    metadata: {
      userId: session?.user?.id ?? 'guest',
      isSubscriber: isSubscriber ? 'true' : 'false',
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}
