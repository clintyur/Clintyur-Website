import { NextResponse } from 'next/server'
import { z } from 'zod'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { paypalConfigured, paypalFetch, approvalLink, centsToAmount, type PayPalLink } from '@/lib/paypal'

const schema = z.object({
  items: z.array(z.object({
    variantId: z.string(),
    quantity: z.number().int().positive().max(99),
  })).min(1),
})

/** Free shipping over $75, otherwise $6.95 — mirrors the cart summary. */
const FREE_SHIPPING_THRESHOLD = 7500
const FLAT_SHIPPING = 695

function findVariant(variantId: string) {
  for (const product of MOCK_PRODUCTS) {
    const variant = product.variants.find((v) => v.id === variantId)
    if (variant) return { product, variant }
  }
  return null
}

export async function POST(req: Request) {
  if (!paypalConfigured()) {
    return NextResponse.json(
      { error: 'Payments are not set up yet. Please check back soon.' },
      { status: 503 },
    )
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid cart contents' }, { status: 422 })
  }

  // Price server-side from our own catalogue. The browser only ever sends
  // variant ids and quantities — never amounts.
  const lineItems = []
  let subtotal = 0

  for (const { variantId, quantity } of parsed.data.items) {
    const found = findVariant(variantId)
    if (!found) {
      return NextResponse.json({ error: `Unknown item in cart` }, { status: 422 })
    }
    const { product, variant } = found
    if (variant.stock < quantity) {
      return NextResponse.json(
        { error: `${product.name} — only ${variant.stock} left in stock` },
        { status: 409 },
      )
    }
    subtotal += variant.price * quantity
    lineItems.push({
      name: `${product.name} — ${variant.name}`.slice(0, 127),
      sku: variant.sku.slice(0, 127),
      quantity: String(quantity),
      unit_amount: { currency_code: 'USD', value: centsToAmount(variant.price) },
    })
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING
  const total = subtotal + shipping

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  try {
    const order = await paypalFetch<{ id: string; links: PayPalLink[] }>('/v2/checkout/orders', {
      method: 'POST',
      body: {
        intent: 'CAPTURE',
        purchase_units: [{
          items: lineItems,
          amount: {
            currency_code: 'USD',
            value: centsToAmount(total),
            breakdown: {
              item_total: { currency_code: 'USD', value: centsToAmount(subtotal) },
              shipping: { currency_code: 'USD', value: centsToAmount(shipping) },
            },
          },
        }],
        payment_source: {
          paypal: {
            experience_context: {
              brand_name: 'yurr cooked',
              user_action: 'PAY_NOW',
              shipping_preference: 'GET_FROM_FILE',
              return_url: `${appUrl}/checkout/success`,
              cancel_url: `${appUrl}/cart`,
            },
          },
        },
      },
    })

    const url = approvalLink(order.links)
    if (!url) {
      console.error('PayPal order created but returned no approval link', order.id)
      return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ url, orderId: order.id })
  } catch (err) {
    console.error('PayPal create-order failed:', err)
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 })
  }
}
