import { Hero } from '@/components/home/Hero'
import { FeaturedRecipes } from '@/components/home/FeaturedRecipes'
import { MembershipBanner } from '@/components/home/MembershipBanner'
import { ShopPreview } from '@/components/home/ShopPreview'
import { SocialFeed } from '@/components/social/SocialFeed'
import { Testimonials } from '@/components/home/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedRecipes />
      <MembershipBanner />
      <ShopPreview />
      <Testimonials />
      <SocialFeed />
    </>
  )
}
