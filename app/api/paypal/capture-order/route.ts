import { NextResponse } from 'next/server'
import { z } from 'zod'
import { paypalConfigured, paypalFetch } from '@/lib/paypal'

const schema = z.object({ orderId: z.string().min(1).max(64) })

interface CaptureResponse {
  id: string
  status: string
  payer?: { name?: { given_name?: string } }
  purchase_units?: Array<{
    payments?: { captures?: Array<{ id: string; amount?: { value: string; currency_code: string } }> }
  }>
}

export async function POST(req: Request) {
  if (!paypalConfigured()) {
    return NextResponse.json({ error: 'Payments are not set up yet.' }, { status: 503 })
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Missing order id' }, { status: 422 })
  }

  try {
    const result = await paypalFetch<CaptureResponse>(
      `/v2/checkout/orders/${encodeURIComponent(parsed.data.orderId)}/capture`,
      { method: 'POST', body: {} },
    )

    if (result.status !== 'COMPLETED') {
      return NextResponse.json({ error: `Payment not completed (${result.status})` }, { status: 402 })
    }

    const capture = result.purchase_units?.[0]?.payments?.captures?.[0]
    return NextResponse.json({
      ok: true,
      orderId: result.id,
      captureId: capture?.id,
      amount: capture?.amount,
      firstName: result.payer?.name?.given_name ?? null,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : ''
    // PayPal returns this when the buyer's approval was already captured.
    if (message.includes('ORDER_ALREADY_CAPTURED')) {
      return NextResponse.json({ ok: true, alreadyCaptured: true })
    }
    console.error('PayPal capture failed:', err)
    return NextResponse.json({ error: 'We could not confirm that payment.' }, { status: 502 })
  }
}
