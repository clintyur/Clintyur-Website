'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const HERO_STATS = [
  { value: '200+', label: 'Recipes' },
  { value: '50K',  label: 'Cooks' },
  { value: '4.9★', label: 'Avg rating' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=85"
          alt="Beautiful food spread"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/40 to-stone-950/80" />
      </div>

      {/* Floating ingredient blobs */}
      <div className="absolute top-1/4 right-10 lg:right-24 opacity-15 animate-float hidden lg:block">
        <div className="w-72 h-72 rounded-full bg-brand-400 blur-3xl" />
      </div>
      <div className="absolute bottom-1/4 left-10 opacity-10 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
        <div className="w-48 h-48 rounded-full bg-terracotta-400 blur-2xl" />
      </div>

      <div className="section relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#fbbf24" stroke="none" />
              ))}
            </div>
            <span className="text-white text-xs font-medium">
              Join 50,000+ home cooks who cook better
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-display-xl lg:text-display-2xl font-serif text-white leading-tight"
          >
            Cook like you
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-brand italic">
              actually mean it.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-lg text-stone-300 max-w-xl leading-relaxed"
          >
            Restaurant-quality recipes that work in a home kitchen — plus the
            cookware and aprons to make every cook feel intentional.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Link href="/recipes" className="btn-primary btn-lg group">
              Explore Recipes
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/subscribe" className="btn-secondary btn-lg bg-white/10 text-white border-white/30 hover:bg-white/20">
              Join — $3.99/mo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-8 mt-12 pt-8 border-t border-white/15"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-serif font-bold text-white">{stat.value}</p>
                <p className="text-sm text-stone-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
