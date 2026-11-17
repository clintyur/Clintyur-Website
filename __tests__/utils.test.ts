import { formatPrice, formatTime, formatDuration, durationMaxMinutes, slugify, isSubscriber, truncate } from '@/lib/utils'

describe('formatPrice', () => {
  it('formats cents as USD currency string', () => {
    expect(formatPrice(399)).toBe('$3.99')
    expect(formatPrice(8900)).toBe('$89.00')
    expect(formatPrice(0)).toBe('$0.00')
  })
})

describe('formatTime', () => {
  it('formats minutes under 60 with m suffix', () => {
    expect(formatTime(20)).toBe('20m')
    expect(formatTime(45)).toBe('45m')
  })
  it('formats 60+ minutes as hours and minutes', () => {
    expect(formatTime(60)).toBe('1h')
    expect(formatTime(90)).toBe('1h 30m')
    expect(formatTime(240)).toBe('4h')
  })
})

describe('slugify', () => {
  it('converts strings to URL-safe slugs', () => {
    expect(slugify('Crispy Carnitas Tacos')).toBe('crispy-carnitas-tacos')
    expect(slugify('Saffron Risotto alla Milanese')).toBe('saffron-risotto-alla-milanese')
  })
  it('strips special characters', () => {
    expect(slugify('Beef & Broccoli!')).toBe('beef-broccoli')
  })
})

describe('isSubscriber', () => {
  it('returns true for ACTIVE and TRIALING', () => {
    expect(isSubscriber('ACTIVE')).toBe(true)
    expect(isSubscriber('TRIALING')).toBe(true)
  })
  it('returns false for other statuses', () => {
    expect(isSubscriber('CANCELED')).toBe(false)
    expect(isSubscriber('NONE')).toBe(false)
    expect(isSubscriber(null)).toBe(false)
  })
})

describe('truncate', () => {
  it('returns string unchanged if within limit', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })
  it('truncates at word boundary with ellipsis', () => {
    const result = truncate('The quick brown fox', 15)
    expect(result.endsWith('…')).toBe(true)
    expect(result.length).toBeLessThanOrEqual(16)
  })
})

describe('formatDuration', () => {
  it('formats plain minutes', () => {
    expect(formatDuration(30)).toBe('30m')
    expect(formatDuration(90)).toBe('1h 30m')
    expect(formatDuration(510)).toBe('8h 30m')
  })

  it('keeps sub-hour ranges in minutes', () => {
    expect(formatDuration('20–30')).toBe('20–30m')
    expect(formatDuration('30–45')).toBe('30–45m')
    expect(formatDuration('45–60')).toBe('45–60m')
  })

  it('collapses clean half-hour ranges to shared hours', () => {
    expect(formatDuration('90–120')).toBe('1.5–2h')
    expect(formatDuration('60–120')).toBe('1–2h')
  })

  it('falls back to full formatting for ragged ranges', () => {
    expect(formatDuration('45–80')).toBe('45m–1h 20m')
  })

  it('passes through anything it cannot parse', () => {
    expect(formatDuration('overnight')).toBe('overnight')
  })
})

describe('durationMaxMinutes', () => {
  it('returns the upper bound of a range', () => {
    expect(durationMaxMinutes('90–120')).toBe(120)
    expect(durationMaxMinutes('30–45')).toBe(45)
  })

  it('returns plain numbers unchanged', () => {
    expect(durationMaxMinutes(510)).toBe(510)
  })

  it('returns null for unparseable input', () => {
    expect(durationMaxMinutes('overnight')).toBeNull()
  })
})
