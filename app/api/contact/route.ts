import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  topic: z.string().max(60).optional(),
  message: z.string().min(1).max(5000),
})

export async function POST(req: Request) {
  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the form and try again.', details: parsed.error.flatten() },
      { status: 422 },
    )
  }

  const { name, email, topic, message } = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  // Not configured yet — say so instead of pretending the message was sent.
  if (!apiKey || !to || !from) {
    console.warn('Contact form submitted but email delivery is not configured.')
    return NextResponse.json(
      { error: 'Email delivery is not configured yet. Please reach out directly for now.' },
      { status: 503 },
    )
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `[yur cooked] ${topic ?? 'New message'} — ${name}`,
      text: [
        `Name:  ${name}`,
        `Email: ${email}`,
        `Topic: ${topic ?? '—'}`,
        '',
        message,
      ].join('\n'),
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    console.error('Resend delivery failed:', res.status, detail)
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
