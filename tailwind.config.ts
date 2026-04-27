import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fffbf0',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        terracotta: {
          50:  '#fdf4f0',
          100: '#fbe6dc',
          200: '#f6ccb9',
          300: '#f0a98e',
          400: '#e87a57',
          500: '#e05a31',
          600: '#c94220',
          700: '#a8341a',
          800: '#882c18',
          900: '#6e2517',
        },
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      fontFamily: {
        serif:  ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem',  { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg':  ['3rem',    { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-md':  ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm':  ['1.875rem',{ lineHeight: '1.25' }],
      },
      animation: {
        'fade-in':       'fadeIn 0.6s ease-out forwards',
        'slide-up':      'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'scale-in':      'scaleIn 0.4s ease-out forwards',
        'shimmer':       'shimmer 1.5s infinite',
        'float':         'float 6s ease-in-out infinite',
        'egg-slide':     'eggSlide 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        eggSlide: {
          from: { transform: 'translate(var(--egg-from-x), var(--egg-from-y))' },
          to:   { transform: 'translate(0, 0)' },
        },
      },
      boxShadow: {
        'soft':    '0 2px 16px 0 rgba(0,0,0,0.06)',
        'card':    '0 4px 24px 0 rgba(0,0,0,0.08)',
        'hover':   '0 8px 40px 0 rgba(0,0,0,0.12)',
        'brand':   '0 4px 24px 0 rgba(245,158,11,0.25)',
      },
      backgroundImage: {
        'gradient-hero':    'linear-gradient(135deg, #1c1917 0%, #292524 50%, #3d1c0a 100%)',
        'gradient-brand':   'linear-gradient(135deg, #f59e0b 0%, #e05a31 100%)',
        'gradient-subtle':  'linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}

export default config
