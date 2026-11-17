import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms you agree to when you use yurr cooked — accounts, recipes, shop orders, memberships, and cooking safely.',
}

const UPDATED = 'November 17, 2026'

export default function TermsPage() {
  return (
    <div className="container legal-doc">
      <div className="eyebrow"><span className="dot"></span>Legal</div>
      <h1 className="book-title legal-title">
        Terms of <span className="it">service</span>
      </h1>
      <p className="legal-updated">Last updated {UPDATED}</p>

      <p className="legal-lede">
        This is a cooking site. These terms cover the boring but necessary part: what you
        can expect from yurr cooked, what we expect from you, and who is responsible for
        what. Plain language, no tricks.
      </p>

      <h2>1. Agreeing to these terms</h2>
      <p>
        By using yurr cooked — browsing recipes, creating an account, buying something,
        or subscribing — you agree to these terms. If you don&apos;t agree with them,
        please don&apos;t use the site.
      </p>
      <p>
        You need to be at least 13 to use the site, and at least 18 (or the age of
        majority where you live) to buy anything or start a membership.
      </p>

      <h2>2. Cooking is your responsibility</h2>
      <p>
        <strong>This is the part that actually matters.</strong> The recipes here are
        shared in good faith and have been cooked many times, but every kitchen,
        ingredient, and oven is different. You are responsible for cooking safely.
      </p>
      <ul>
        <li>
          <strong>Raw and undercooked ingredients.</strong> Some recipes here use raw or
          lightly cooked beef, eggs, or fish. Eating raw or undercooked meat, poultry,
          seafood, shellfish, or eggs increases your risk of foodborne illness,
          especially if you are pregnant, elderly, very young, or immunocompromised. Buy
          from a source you trust, tell your butcher or fishmonger what you&apos;re
          making, and use your judgement.
        </li>
        <li>
          <strong>Allergies.</strong> Ingredient lists are provided as written, not as
          allergen declarations. If you cook for someone with an allergy, verify every
          ingredient and label yourself.
        </li>
        <li>
          <strong>Times and temperatures are guides.</strong> Cook to a safe internal
          temperature and to how the food actually looks and feels, not to a timer.
        </li>
        <li>
          <strong>Heat, oil, and sharp things.</strong> Hot fat, open flame, and sharp
          knives are dangerous. Work carefully.
        </li>
      </ul>
      <p>
        Nothing on this site is medical, nutritional, or dietary advice. If you have a
        health condition, talk to a professional, not a recipe page.
      </p>

      <h2>3. Accounts</h2>
      <p>
        You can sign in with Google or GitHub. We never see or store your password for
        those services. You&apos;re responsible for keeping access to your account
        secure and for anything done through it.
      </p>
      <p>
        We may suspend or close an account that is used to spam, harass other people,
        scrape the site, or break these terms. You can close your own account at any
        time by asking via the{' '}
        <Link href="/contact">contact page</Link>.
      </p>

      <h2>4. Recipes and content on this site</h2>
      <p>
        The recipes, writing, photographs, and artwork here belong to yurr cooked or to
        the artists credited on the site. You&apos;re welcome to:
      </p>
      <ul>
        <li>Cook anything here, as many times as you like, including professionally</li>
        <li>Print or save a recipe for your own kitchen</li>
        <li>Share a link to any page</li>
      </ul>
      <p>Please don&apos;t:</p>
      <ul>
        <li>
          Republish recipes, text, or photos in full — on a website, in an app, in a
          newsletter, or in a book — without permission
        </li>
        <li>Use the photography or artwork commercially</li>
        <li>Scrape the site or use its content to train a model</li>
      </ul>
      <p>
        Lists of ingredients are not copyrightable, and we don&apos;t pretend otherwise.
        It&apos;s the writing and the pictures we&apos;re asking you to leave alone. If
        you want to feature a recipe somewhere, just{' '}
        <Link href="/contact">ask</Link> — the answer is usually yes.
      </p>

      <h2>5. Comments and anything you post</h2>
      <p>
        When you post a comment, you keep ownership of it, but you give us permission to
        display it on the site. Keep it civil: no harassment, no hate, no spam, no
        promoting someone else&apos;s business. We can remove any comment for any reason
        and we don&apos;t promise to moderate everything.
      </p>

      <h2>6. Shop orders</h2>
      <p>
        Prices are in US dollars and are calculated on our server at the moment you check
        out. Shipping is $6.95 within the United States and free on orders over $75.
      </p>
      <ul>
        <li>
          <strong>Payment.</strong> Payments are processed by PayPal. We never receive or
          store your card number.
        </li>
        <li>
          <strong>Accepting an order.</strong> Placing an order is an offer to buy. We
          can decline or cancel it — and refund you in full — if an item is out of stock
          or a price was listed wrong.
        </li>
        <li>
          <strong>Returns.</strong> Unused items can be returned within 30 days of
          delivery for a refund of the item price. Start a return through the{' '}
          <Link href="/contact">contact page</Link>. Return shipping is on you unless the
          item arrived damaged or wrong, in which case it&apos;s on us.
        </li>
        <li>
          <strong>Delivery.</strong> Delivery estimates are estimates. Once a carrier has
          the package, timing is out of our hands.
        </li>
      </ul>

      <h2>7. Membership</h2>
      <p>
        Membership is billed through PayPal as a recurring subscription. The first 30
        days are $0.99, and unless you cancel before that trial ends it continues at
        $3.99 per month until you cancel.
      </p>
      <ul>
        <li>
          <strong>Cancelling.</strong> Cancel any time from your PayPal account or by
          asking via the <Link href="/contact">contact page</Link>. You keep access
          through the end of the period you&apos;ve already paid for.
        </li>
        <li>
          <strong>Refund.</strong> If you&apos;re not happy within 30 days of your first
          payment, ask and we&apos;ll refund it in full.
        </li>
        <li>
          <strong>Price changes.</strong> If the price changes, we&apos;ll tell you
          before it applies to you, and you can cancel.
        </li>
      </ul>

      <h2>8. Private dinners and collaborations</h2>
      <p>
        The contact form is a way to start a conversation, not a booking. Nothing is
        confirmed until it&apos;s agreed directly, in writing, with its own terms.
      </p>

      <h2>9. The site itself</h2>
      <p>
        The site is provided as it is. We don&apos;t guarantee it will always be
        available, error-free, or that every recipe will work perfectly in your kitchen.
        We may change, add, or remove recipes, products, and features.
      </p>
      <p>
        Links out to other sites — YouTube, Instagram, PayPal, anywhere else — are not
        under our control, and their terms and privacy practices are their own.
      </p>

      <h2>10. Limits on liability</h2>
      <p>
        To the fullest extent the law allows, yurr cooked is not liable for indirect or
        consequential losses arising from your use of the site or its recipes. Where
        liability can&apos;t be excluded, it is limited to the amount you actually paid
        us in the 12 months before the claim.
      </p>
      <p>
        None of this limits liability for fraud, for death or personal injury caused by
        negligence, or for anything else that cannot legally be limited — and some
        jurisdictions don&apos;t allow these exclusions, so parts of this section may not
        apply to you.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms. The &ldquo;last updated&rdquo; date at the top will
        change, and for anything significant we&apos;ll say so on the site. Continuing to
        use yurr cooked after a change means you accept the new terms.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of New York, and any dispute
        belongs in the state or federal courts of New York County, New York.
      </p>

      <h2>13. Getting in touch</h2>
      <p>
        Questions about any of this go through the{' '}
        <Link href="/contact">contact page</Link>. See also our{' '}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    </div>
  )
}
