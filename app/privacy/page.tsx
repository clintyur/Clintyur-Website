import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What yurr cooked collects, why, and who it is shared with — sign-in, orders, the contact form, and cookies. No ad tracking, no analytics, no selling data.',
}

const UPDATED = 'November 17, 2026'

export default function PrivacyPage() {
  return (
    <div className="container legal-doc">
      <div className="eyebrow"><span className="dot"></span>Legal</div>
      <h1 className="book-title legal-title">
        Privacy <span className="it">policy</span>
      </h1>
      <p className="legal-updated">Last updated {UPDATED}</p>

      <p className="legal-lede">
        The short version: this is a cooking site, not an advertising business. There
        are no analytics, no tracking pixels, and no ad networks on it. We collect what
        we need to sign you in, send you what you ordered, and answer your messages —
        and nothing else. We don&apos;t sell your data, and we never will.
      </p>

      <h2>1. Reading the site</h2>
      <p>
        You can browse every recipe, every page, and the shop without an account and
        without telling us anything. There is no analytics tool on this site — no Google
        Analytics, no Meta pixel, no heatmaps, no session recording. We genuinely do not
        know who read which recipe.
      </p>
      <p>
        Our host, Vercel, keeps standard server logs for a short period — IP address,
        the page requested, browser type — the way every web server does. That is
        operational and security data, used to keep the site running, and we don&apos;t
        build profiles from it.
      </p>

      <h2>2. What we collect, and why</h2>

      <h3>If you create an account</h3>
      <p>
        You sign in with Google or GitHub. We never see, receive, or store your password
        for those services. What they pass to us, and what we store, is:
      </p>
      <ul>
        <li>Your name and email address</li>
        <li>Your profile picture, if your provider shares one</li>
        <li>A token that keeps you signed in</li>
        <li>Anything you add yourself later — a bio, location, or website</li>
      </ul>
      <p>
        We use this to keep you signed in, to attach your comments to you, and to
        connect an order or membership to the right person.
      </p>

      <h3>If you buy something</h3>
      <p>
        We store what you ordered, what it cost, the status of the order, and the
        shipping address you gave us. We use that to pack the box, ship it, handle
        returns, and keep the tax records the law requires.
      </p>
      <p>
        <strong>We never see your card number.</strong> Payment happens on PayPal&apos;s
        side. What comes back to us is confirmation that a payment succeeded and an ID
        to match it to your order.
      </p>

      <h3>If you become a member</h3>
      <p>
        Membership is a recurring payment handled by PayPal. We store the subscription
        ID, its status, and when the period ends — enough to know whether to let you in.
        The billing itself lives with PayPal.
      </p>

      <h3>If you use the contact form</h3>
      <p>
        Your name, email, topic, and message are emailed to us through Resend, our email
        delivery provider, so we can reply. That&apos;s the only thing we do with it. We
        don&apos;t add you to a mailing list from the contact form.
      </p>

      <h3>If you comment</h3>
      <p>
        Your comment, the recipe it&apos;s on, and your account are stored together and
        shown publicly with your name and picture. Which recipes you like is stored too,
        and that part stays private.
      </p>

      <h2>3. Cookies and local storage</h2>
      <p>
        There are no advertising or tracking cookies on this site, which is why you
        aren&apos;t being asked to accept a banner. What we do use:
      </p>
      <ul>
        <li>
          <strong>A sign-in cookie.</strong> Set only once you sign in, so you stay
          signed in. Clearing it signs you out.
        </li>
        <li>
          <strong>Your shopping bag.</strong> Kept in your browser&apos;s local storage
          so your bag survives a refresh. It stays on your device until you check out or
          clear it, and it is not sent to us until you check out.
        </li>
      </ul>

      <h2>4. Who else touches your data</h2>
      <p>
        We don&apos;t sell or rent personal information, and we don&apos;t share it for
        advertising. It reaches these companies only because they do a job we need:
      </p>
      <ul>
        <li><strong>Vercel</strong> — hosts the site and serves the pages</li>
        <li><strong>Google and GitHub</strong> — sign you in, if you choose to</li>
        <li><strong>PayPal</strong> — processes payments and memberships</li>
        <li><strong>Resend</strong> — delivers contact form messages to our inbox</li>
      </ul>
      <p>
        Each of them has its own privacy policy covering what they do with the data they
        hold. We&apos;d also disclose information if the law actually required it, or to
        protect someone&apos;s safety — not because somebody asked nicely.
      </p>
      <p>
        Embedded YouTube and Instagram content, where it appears, is loaded from those
        companies and they may set their own cookies when it loads. That part is theirs,
        not ours.
      </p>

      <h2>5. How long we keep things</h2>
      <ul>
        <li>
          <strong>Account data</strong> — until you close your account, then deleted
        </li>
        <li>
          <strong>Orders</strong> — kept as long as tax and accounting rules require,
          typically seven years, even after an account closes
        </li>
        <li>
          <strong>Contact messages</strong> — kept in our email while the conversation is
          useful, then deleted
        </li>
        <li><strong>Server logs</strong> — a short retention period set by our host</li>
      </ul>

      <h2>6. Your rights</h2>
      <p>
        Wherever you live, you can ask us to show you what we hold about you, correct
        anything wrong, delete your account and its data, or send you a copy. Ask
        through the <Link href="/contact">contact page</Link> and we&apos;ll handle it
        within 30 days. We will not make the site worse for you because you asked.
      </p>
      <p>
        If you are in California, that includes the right to know what is collected and
        to delete it — and since we don&apos;t sell or share personal information for
        advertising, there is nothing for you to opt out of. If you are in the UK or EU,
        our basis for processing is performing our contract with you (orders and
        membership), your consent (an account, a comment), and our legitimate interest
        in keeping the site running and secure. You can also complain to your local data
        protection authority.
      </p>

      <h2>7. Security</h2>
      <p>
        The site is served over HTTPS, payment card details never reach our servers, and
        sign-in is delegated to Google and GitHub so there is no password here to steal.
        No system is perfectly secure, and we won&apos;t claim otherwise — but we&apos;ve
        tried to hold as little sensitive data as possible, which is the best protection
        there is.
      </p>

      <h2>8. Children</h2>
      <p>
        This site isn&apos;t aimed at children under 13 and we don&apos;t knowingly
        collect their information. If you believe a child has given us data, tell us and
        we&apos;ll delete it.
      </p>

      <h2>9. Where your data is handled</h2>
      <p>
        We operate from the United States, and our providers are largely US-based, so
        your information is processed there. If you&apos;re outside the US, using the
        site means that data crosses borders to reach us.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        If this changes, the &ldquo;last updated&rdquo; date at the top changes with it,
        and anything significant gets said plainly on the site rather than slipped in
        quietly.
      </p>

      <h2>11. Getting in touch</h2>
      <p>
        Any question about your data goes through the{' '}
        <Link href="/contact">contact page</Link>. See also our{' '}
        <Link href="/terms">terms of service</Link>.
      </p>
    </div>
  )
}
