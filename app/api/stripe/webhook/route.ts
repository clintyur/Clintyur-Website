import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import Stripe from 'stripe'

// Required: disable body parsing so we can verify Stripe signature
export const runtime = 'nodejs'

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        await syncSubscription(sub)
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await handleSubscriptionCanceled(sub)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }
    }
  } catch (err) {
    console.error(`Error processing webhook ${event.type}:`, err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  if (!userId || userId === 'guest') return

  if (session.mode === 'subscription') {
    const subId = session.subscription as string
    const sub   = await stripe.subscriptions.retrieve(subId)
    const isTrial = session.metadata?.isTrial === 'true'

    await db.user.update({
      where: { id: userId },
      data: {
        stripeSubscriptionId: subId,
        stripePriceId: sub.items.data[0].price.id,
        subscriptionStatus: sub.status === 'trialing' ? 'TRIALING' : 'ACTIVE',
        subscriptionEndsAt: new Date(sub.current_period_end * 1000),
        ...(isTrial && { trialUsed: true }),
        role: 'SUBSCRIBER',
      },
    })
  } else if (session.mode === 'payment') {
    // Create order record
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    })

    const total = session.amount_total ?? 0

    const order = await db.order.create({
      data: {
        userId,
        status: 'PAID',
        stripePaymentId: session.payment_intent as string,
        subtotal: total,
        total,
        shippingAddress: session.shipping_details ?? {},
      },
    })

    // Create order items
    for (const item of lineItems.data) {
      const product = item.price?.product as Stripe.Product
      const variantId = product.metadata?.variantId
      const productId = product.metadata?.productId
      if (variantId && productId) {
        await db.orderItem.create({
          data: {
            orderId: order.id,
            variantId,
            productId,
            quantity: item.quantity ?? 1,
            unitPrice: item.price?.unit_amount ?? 0,
          },
        })
        // Decrement stock
        await db.productVariant.update({
          where: { id: variantId },
          data: { stock: { decrement: item.quantity ?? 1 } },
        })
      }
    }
  }
}

async function syncSubscription(sub: Stripe.Subscription) {
  const customerId = sub.customer as string
  const user = await db.user.findFirst({ where: { stripeCustomerId: customerId } })
  if (!user) return

  const statusMap: Record<string, string> = {
    active:   'ACTIVE',
    trialing: 'TRIALING',
    past_due: 'PAST_DUE',
    canceled: 'CANCELED',
    paused:   'PAUSED',
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      stripeSubscriptionId: sub.id,
      stripePriceId: sub.items.data[0].price.id,
      subscriptionStatus: statusMap[sub.status] ?? 'NONE',
      subscriptionEndsAt: new Date(sub.current_period_end * 1000),
      role: sub.status === 'active' || sub.status === 'trialing' ? 'SUBSCRIBER' : 'USER',
    },
  })
}

async function handleSubscriptionCanceled(sub: Stripe.Subscription) {
  const customerId = sub.customer as string
  const user = await db.user.findFirst({ where: { stripeCustomerId: customerId } })
  if (!user) return

  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'CANCELED',
      role: 'USER',
      subscriptionEndsAt: new Date(sub.current_period_end * 1000),
    },
  })
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  const user = await db.user.findFirst({ where: { stripeCustomerId: customerId } })
  if (!user) return

  await db.user.update({
    where: { id: user.id },
    data: { subscriptionStatus: 'PAST_DUE' },
  })
}
