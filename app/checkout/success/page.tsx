'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { useCart } from '@/components/shop/CartProvider'

type State = 'confirming' | 'done' | 'failed'

function CheckoutSuccessInner() {
  const params = useSearchParams()
  const { clear } = useCart()
  const [state, setState] = useState<State>('confirming')
  const [error, setError] = useState<string | null>(null)
  const ran = useRef(false)

  // PayPal sends the buyer back with ?token=<orderId> after they approve.
  const orderId = params.get('token')

  useEffect(() => {
    if (ran.current) return      // React 18 StrictMode double-invokes effects
    ran.current = true

    if (!orderId) {
      setError('We could not find that order.')
      setState('failed')
      return
    }

    ;(async () => {
      try {
        const res = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        })
        const body = await res.json().catch(() => null)
        if (!res.ok) {
          setError(body?.error ?? 'We could not confirm that payment.')
          setState('failed')
          return
        }
        clear()
        setState('done')
      } catch {
        setError('Network error while confirming your payment.')
        setState('failed')
      }
    })()
  }, [orderId, clear])

  return (
    <div className="container" style={{ padding: 'clamp(96px, 12vw, 160px) 0 clamp(72px, 10vw, 120px)' }}>
      <div style={{ maxWidth: '620px' }}>
        <div className="eyebrow"><span className="dot"></span>Checkout</div>

        {state === 'confirming' && (
          <>
            <h1 className="book-title" style={{ marginBottom: '20px' }}>
              Confirming your <span className="it">order</span>
            </h1>
            <p className="book-desc">One moment — we&apos;re finalising the payment with PayPal.</p>
          </>
        )}

        {state === 'done' && (
          <>
            <h1 className="book-title" style={{ marginBottom: '20px' }}>
              Thank you — <span className="it">order confirmed</span>
            </h1>
            <p className="book-desc">
              PayPal has your payment and a receipt is on its way to your email.
              We&apos;ll be in touch as soon as it ships.
            </p>
            <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/shop" className="btn">Back to the shop</Link>
              <Link href="/recipes" className="btn ghost">Browse recipes</Link>
            </div>
          </>
        )}

        {state === 'failed' && (
          <>
            <h1 className="book-title" style={{ marginBottom: '20px' }}>
              Something went <span className="it">wrong</span>
            </h1>
            <p className="book-desc">
              {error} If you were charged, nothing is lost — email{' '}
              <a href="mailto:hello@clintyur.com" style={{ color: 'var(--accent)' }}>hello@clintyur.com</a>{' '}
              with your PayPal receipt and we&apos;ll sort it out straight away.
            </p>
            <div style={{ marginTop: '32px' }}>
              <Link href="/cart" className="btn">Back to your bag</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccessInner />
    </Suspense>
  )
}
