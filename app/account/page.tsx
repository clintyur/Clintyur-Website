import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatDate, formatPrice, isSubscriber } from '@/lib/utils'
import { ManageSubscriptionButton } from './ManageSubscriptionButton'
import { User, ShoppingBag, Crown, Settings } from 'lucide-react'

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user) redirect('/login?callbackUrl=/account')

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { items: { include: { product: true } } },
      },
    },
  })

  if (!user) redirect('/login')

  const subscriber = isSubscriber(user.subscriptionStatus)

  return (
    <div className="pt-16 container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-display-sm font-serif text-stone-900 mb-8">My Account</h1>

        {/* Profile card */}
        <div className="bg-white rounded-3xl border border-stone-100 shadow-card p-8 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {user.name?.[0] ?? user.email[0].toUpperCase()}
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-stone-900">{user.name ?? 'yur cooked Member'}</p>
              <p className="text-stone-500 text-sm">{user.email}</p>
              {subscriber && (
                <span className="badge badge-brand mt-1">
                  <Crown size={10} /> Member
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Subscription card */}
        <div className="bg-white rounded-3xl border border-stone-100 shadow-card p-8 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-stone-800 flex items-center gap-2">
              <Crown size={16} className="text-brand-500" />
              Membership
            </h2>
            {subscriber && <ManageSubscriptionButton />}
          </div>

          {subscriber ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-green-700 capitalize">
                  {user.subscriptionStatus.toLowerCase()}
                </span>
              </div>
              <p className="text-stone-500 text-sm">
                {user.subscriptionEndsAt
                  ? `Renews ${formatDate(user.subscriptionEndsAt)}`
                  : 'Active'}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-stone-500 text-sm mb-4">
                You don&apos;t have an active membership.
              </p>
              <a href="/subscribe" className="btn-primary btn-sm">
                Join for $3.99/month
              </a>
            </div>
          )}
        </div>

        {/* Orders */}
        <div className="bg-white rounded-3xl border border-stone-100 shadow-card p-8">
          <h2 className="font-semibold text-stone-800 flex items-center gap-2 mb-5">
            <ShoppingBag size={16} className="text-stone-400" />
            Order history
          </h2>

          {user.orders.length === 0 ? (
            <p className="text-stone-400 text-sm">No orders yet. <a href="/shop" className="text-brand-600 hover:underline">Visit the shop →</a></p>
          ) : (
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-stone-800">
                      Order #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-stone-400">{formatDate(order.createdAt)}</p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {order.items.map((i) => i.product.name).join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-stone-800">{formatPrice(order.total)}</p>
                    <span className={`badge text-xs ${order.status === 'DELIVERED' ? 'badge-brand' : 'badge-stone'}`}>
                      {order.status.toLowerCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
