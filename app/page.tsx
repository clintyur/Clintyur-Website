import { Hero } from '@/components/home/Hero'
import { Ticker } from '@/components/home/Ticker'
import { Intro } from '@/components/home/Intro'
import { PreviewGrid } from '@/components/home/PreviewGrid'
import { WatchSection } from '@/components/home/WatchSection'
import { PromoBar } from '@/components/home/PromoBar'

export default function HomePage() {
  return (
    <>
      <PromoBar />
      <Hero />
      <Ticker />
      <section className="container">
        <Intro />
        <PreviewGrid />
      </section>
      <WatchSection />
    </>
  )
}
