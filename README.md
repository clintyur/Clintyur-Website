# Provecho — Recipe & Cookware Website

Production-ready Next.js 15 website for the Provecho brand. Apple-like aesthetic, subscription membership, ecommerce shop, custom frying-pan cursor, and social feed integration.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 App Router | Best-in-class SSR/SSG, image optimization, edge functions |
| Language | TypeScript | Type safety across frontend + API |
| Styling | Tailwind CSS + custom design system | Fastest path to Apple-like aesthetics |
| Database | PostgreSQL + Prisma | Relational, production-grade, great DX |
| Auth | NextAuth v5 | Google + GitHub OAuth, session management |
| Payments | Stripe | Subscriptions, one-time purchases, Billing Portal |
| Hosting | Vercel | Zero-config Next.js deployment, edge functions |
| Images | Cloudinary (future) / Next/Image (now) | Optimized delivery, responsive |
| Fonts | Playfair Display + Inter (Google Fonts) | Editorial serif + clean sans |

---

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx           # Root layout: fonts, cursor, nav, footer
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles + Tailwind directives
│   ├── recipes/             # Recipe listing + [slug] detail
│   ├── shop/                # Shop listing + [slug] product detail
│   ├── subscribe/           # Membership pricing page
│   ├── account/             # User account + subscription management
│   ├── blog/                # Journal listing
│   ├── cart/                # Shopping cart
│   ├── login/               # Auth page
│   ├── sitemap.ts           # Auto-generated sitemap
│   ├── robots.ts            # robots.txt
│   └── api/
│       ├── auth/[...nextauth]/  # NextAuth handlers
│       ├── stripe/
│       │   ├── webhook/         # Stripe webhook (subscription + order events)
│       │   ├── create-checkout/ # Shop checkout session
│       │   ├── create-subscription/ # Membership checkout
│       │   └── create-portal/   # Billing portal redirect
│       ├── comments/        # Comment CRUD
│       └── likes/           # Like toggle + count
├── components/
│   ├── cursor/              # FryingPanCursor (physics-based egg animation)
│   ├── layout/              # Navbar, Footer
│   ├── home/                # Hero, FeaturedRecipes, MembershipBanner, ShopPreview, Testimonials
│   ├── recipes/             # RecipeCard, RecipeFilters, CommentsSection, LikeButton, RecipeSchema
│   ├── shop/                # ProductCard, CartProvider (React context + localStorage)
│   └── social/              # SocialFeed (Instagram + YouTube grid)
├── lib/
│   ├── db.ts                # Prisma singleton
│   ├── stripe.ts            # Stripe client + plan config
│   ├── auth.ts              # NextAuth config
│   ├── utils.ts             # formatPrice, formatTime, slugify, isSubscriber, etc.
│   └── mock-data.ts         # Placeholder data (replace with DB queries)
├── prisma/
│   ├── schema.prisma        # Full database schema
│   └── seed.ts              # Seed script
├── __tests__/               # Jest unit tests
│   ├── utils.test.ts        # Pure utility function tests
│   └── cart.test.ts         # Cart reducer tests
└── .env.example             # All required environment variables
```

---

## Setup

### 1. Prerequisites

- Node.js 20+
- PostgreSQL database (local or [Neon](https://neon.tech) for free cloud Postgres)
- Stripe account (free test mode)
- Google/GitHub OAuth app (optional but recommended)

### 2. Install & configure

```bash
cd frontend
cp .env.example .env.local
npm install
```

Fill in `.env.local` with your real values.

### 3. Database

```bash
npm run db:generate   # generate Prisma client
npm run db:push       # push schema to your DB (dev)
npm run db:seed       # seed with sample recipes + products
```

For production migrations:

```bash
npm run db:migrate
```

### 4. Run locally

```bash
npm run dev           # http://localhost:3000
```

### 5. Stripe setup

1. Create a Stripe account at stripe.com
2. In Stripe Dashboard → Products → Create product:
   - Name: "Provecho Membership"
   - Price: $3.99/month recurring
   - Copy the **Price ID** → `STRIPE_MONTHLY_PRICE_ID`
3. Set up webhook: Dashboard → Developers → Webhooks → Add endpoint
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`
4. Copy the **Webhook signing secret** → `STRIPE_WEBHOOK_SECRET`

For local webhook testing:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## Deployment (Vercel)

1. Push repo to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy — Next.js is auto-detected

Set your domain in Vercel → Settings → Domains, then update `NEXT_PUBLIC_APP_URL`.

---

## How to add content

### Add a new recipe

1. Add an entry to `lib/mock-data.ts` → `MOCK_RECIPES` array
2. Add full ingredients + steps to `MOCK_FULL_RECIPE` in `app/recipes/[slug]/page.tsx`
3. When you have a database: create a DB record via `prisma studio` or admin UI

**Subscriber-only recipe:** set `isSubscriber: true` in the recipe object.

### Add a new product

1. Add an entry to `lib/mock-data.ts` → `MOCK_PRODUCTS` with variants
2. Verify the SKUs are unique
3. Run `npm run db:seed` to push to database

### Add your photos

Replace the Unsplash URLs in `lib/mock-data.ts` with your real photo URLs. For production, upload to Cloudinary and use the CDN URLs. The `next.config.ts` already allows `res.cloudinary.com`.

### Add a blog post

Add an entry to the `MOCK_POSTS` array in `app/blog/page.tsx` and create the corresponding `app/blog/[slug]/page.tsx` detail file.

---

## Subscription flow

```
User → /subscribe
  └── chooses trial ($0.99) or monthly ($3.99)
  └── POST /api/stripe/create-subscription
  └── Stripe Checkout Session (hosted page)
  └── On success → Stripe sends webhook → checkout.session.completed
  └── Webhook updates user.subscriptionStatus = 'ACTIVE' | 'TRIALING'
  └── user.role = 'SUBSCRIBER' → gates unlock

Trial rules:
- 99¢ trial is only available if user.trialUsed === false
- After trial: auto-converts to $3.99/month
- On cancellation: user retains access until period end
- Webhook customer.subscription.deleted → role reverts to USER

Manage subscription: /account → "Manage" → Stripe Billing Portal
```

---

## Custom cursor

The frying pan cursor (`components/cursor/FryingPanCursor.tsx`) renders only on desktop (hidden on pointer:coarse and screens < 1024px).

**Physics:** The egg yolk uses a spring-damping model (`k=0.18`, `d=0.72`) driven by cursor velocity. `requestAnimationFrame` keeps it at 60fps. All transforms are GPU-accelerated via `translate3d`.

---

## Tests

```bash
npm run test          # run all tests
npm run test:watch    # watch mode
```

Current test coverage:
- `lib/utils.ts` — all pure utility functions
- Cart reducer — full state machine coverage

---

## Performance targets

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| Bundle (above-fold JS) | < 100KB |

Achieved by: Next.js image optimization, font display:swap, lazy loading below-fold components, Tailwind CSS purging, and Vercel edge CDN.

---

## Accessibility

- Semantic HTML5 throughout (`<article>`, `<nav>`, `<aside>`, `<main>`)
- All interactive elements have `aria-label` where label isn't visible text
- Focus rings visible (2px solid brand color, 3px offset)
- Color contrast ratio ≥ 4.5:1 for all text
- Custom cursor hidden on mobile (no impact on usability)
- Images all have descriptive `alt` text

---

## Phased timeline estimate

| Phase | Work | Est. |
|---|---|---|
| 1. Design system | Tailwind config, fonts, colors, component library | 2 days |
| 2. Core pages | Home, recipes, shop, subscribe | 4 days |
| 3. Auth + DB | NextAuth, Prisma schema, seed | 2 days |
| 4. Stripe | Subscription, checkout, webhook, portal | 2 days |
| 5. Comments/likes | API routes, frontend components | 1 day |
| 6. SEO | Schema.org, sitemap, meta, robots | 1 day |
| 7. Testing | Unit + integration tests | 1 day |
| 8. Deploy | Vercel setup, DNS, env vars | 1 day |
| **Total** | | **~14 days solo** |

Single senior full-stack dev can ship a production-ready v1 in 2–3 weeks.

---

## Cost estimate (ongoing)

| Service | Cost |
|---|---|
| Vercel Pro | $20/mo |
| Neon Postgres | Free → $19/mo (at scale) |
| Stripe | 2.9% + 30¢ per transaction |
| Cloudinary | Free → $99/mo (at scale) |
| Google Fonts | Free |
| **Total at launch** | **~$20–40/mo** |
