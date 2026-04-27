import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    body: "I've made the carnitas tacos three weekends in a row. My partner thinks I went to culinary school.",
    author: 'Sarah M.',
    location: 'Portland, OR',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 2,
    body: "The carbon steel skillet is the best thing I've bought for my kitchen in five years. Season it once and it's perfect forever.",
    author: 'Marcus T.',
    location: 'Chicago, IL',
    rating: 5,
    avatar: 'M',
  },
  {
    id: 3,
    body: "The membership is absurdly good value. The sourdough masterclass alone was worth triple the price.",
    author: 'Priya K.',
    location: 'Austin, TX',
    rating: 5,
    avatar: 'P',
  },
]

export function Testimonials() {
  return (
    <section className="section-pad">
      <div className="section">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
            Community love
          </p>
          <h2 className="text-display-md font-serif text-stone-900">
            What cooks are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 shadow-card border border-stone-100 animate-slide-up"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#fbbf24" stroke="none" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-stone-700 leading-relaxed mb-6 text-[15px]">
                &ldquo;{t.body}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-800">{t.author}</p>
                  <p className="text-xs text-stone-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
