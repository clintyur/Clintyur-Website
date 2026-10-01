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
        // Legacy ramp names kept so existing markup keeps working, but remapped
        // onto the "yur cooked" editorial palette (see :root in globals.css).
        // brand/terracotta = ember accent, stone = cream -> ink neutrals.
        brand: {
          50:  '#fbf1ed',
          100: '#f6ded5',
          200: '#ecbdac',
          300: '#e09a82',
          400: '#d0765a',
          500: '#c45437',
          600: '#b8442a',
          700: '#963722',
          800: '#742b1b',
          900: '#552014',
        },
        terracotta: {
          50:  '#fbf1ed',
          100: '#f6ded5',
          200: '#ecbdac',
          300: '#e09a82',
          400: '#d0765a',
          500: '#c45437',
          600: '#b8442a',
          700: '#963722',
          800: '#742b1b',
          900: '#552014',
        },
        stone: {
          50:  '#f7f3ea',
          100: '#efe9dd',
          200: '#e7e0d1',
          300: '#d8cfbe',
          400: '#a79d8b',
          500: '#6b6358',
          600: '#564f45',
          700: '#3e3932',
          800: '#2a2620',
          900: '#1a1814',
          950: '#0f0e0b',
        },
      },
      fontFamily: {
        serif:   ['"Bodoni Moda"', '"Bodoni 72"', 'Didot', 'Georgia', 'serif'],
        sans:    ['Archivo', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['Archivo', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono:    ['"Space Mono"', 'ui-monospace', 'monospace'],
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
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px',
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
