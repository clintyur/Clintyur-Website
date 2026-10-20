/**
 * Minimal PayPal REST client.
 *
 * Mirrors the lazy pattern in lib/stripe.ts: nothing is read at module load,
 * so importing this file never breaks a build that has no credentials.
 */

const SANDBOX = 'https://api-m.sandbox.paypal.com'
const LIVE = 'https://api-m.paypal.com'

export function paypalConfigured(): boolean {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET)
}

export function paypalBaseUrl(): string {
  return process.env.PAYPAL_ENV === 'live' ? LIVE : SANDBOX
}

interface TokenCache { token: string; expiresAt: number }
let cached: TokenCache | null = null

async function accessToken(): Promise<string> {
  if (cached && Date.now() < cached.expiresAt) return cached.token

  const id = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  if (!id || !secret) {
    throw new Error('PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET are not set')
  }

  const res = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`PayPal auth failed (${res.status}): ${await res.text()}`)
  }

  const data = (await res.json()) as { access_token: string; expires_in: number }
  // Refresh a minute early so a request never races the expiry.
  cached = { token: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 }
  return cached.token
}

/** Authenticated PayPal REST call. Throws with the response body on failure. */
export async function paypalFetch<T>(
  path: string,
  init: { method?: string; body?: unknown } = {},
): Promise<T> {
  const res = await fetch(`${paypalBaseUrl()}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      'Content-Type': 'application/json',
    },
    ...(init.body ? { body: JSON.stringify(init.body) } : {}),
    cache: 'no-store',
  })

  const text = await res.text()
  if (!res.ok) {
    throw new Error(`PayPal ${init.method ?? 'GET'} ${path} failed (${res.status}): ${text}`)
  }
  return (text ? JSON.parse(text) : {}) as T
}

export interface PayPalLink { href: string; rel: string; method?: string }

/**
 * The link the buyer must visit to approve. PayPal calls it `approve` on the
 * classic flow and `payer-action` when experience_context is used.
 */
export function approvalLink(links: PayPalLink[] = []): string | undefined {
  return links.find((l) => l.rel === 'approve' || l.rel === 'payer-action')?.href
}

/** PayPal amounts are decimal strings; our prices are integer cents. */
export function centsToAmount(cents: number): string {
  return (cents / 100).toFixed(2)
}
