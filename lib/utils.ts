import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

/** Upper bound of a stored duration, in minutes. Ranges are "90–120" (en dash). */
export function durationMaxMinutes(value: number | string): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  const parts = value.split(/[–—-]/).map((p) => Number(p.trim()))
  if (parts.some((n) => !Number.isFinite(n))) return null
  return Math.max(...parts)
}

/**
 * Render a stored duration for display. Accepts plain minutes (90) or a minute
 * range ("90–120"). Ranges are kept as ranges rather than averaged, because a
 * recipe that takes between an hour and a half and two hours should say so.
 *
 * Everything is stored in minutes so the structured data stays machine-readable;
 * this is the only place that decides whether to speak in hours.
 */
export function formatDuration(value: number | string): string {
  if (typeof value === 'number') return formatTime(value)

  const parts = value.split(/[–—-]/).map((p) => Number(p.trim()))
  if (parts.length !== 2 || parts.some((n) => !Number.isFinite(n))) {
    // Not a range we understand — show it as written rather than inventing a unit.
    return value
  }
  const [lo, hi] = parts

  // Up to an hour reads most naturally in minutes: "45–60m", not "45m–1h".
  if (hi <= 60) return `${lo}–${hi}m`

  // Clean half hours collapse to a single shared unit: "1.5–2h".
  if (lo % 30 === 0 && hi % 30 === 0) {
    const h = (n: number) => String(n / 60).replace(/\.0$/, '')
    return `${h(lo)}–${h(hi)}h`
  }

  return `${formatTime(lo)}–${formatTime(hi)}`
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

export function isSubscriber(status: string | null | undefined): boolean {
  return status === 'ACTIVE' || status === 'TRIALING'
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).replace(/\s+\S*$/, '') + '…'
}
