import { Helmet } from 'react-helmet-async'
import HeroBanner from '@/components/home/HeroBanner'
import MissionHighlights from '@/components/home/MissionHighlights'
import ImpactStats from '@/components/home/ImpactStats'
import OurTeamsCarousel from '@/components/home/OurTeamsCarousel'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'
import VolunteerCTA from '@/components/home/VolunteerCTA'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>SUN Foundation — Empowering Communities, Transforming Lives</title>
        <meta name="description" content="Student Union for Nation (SUN) Foundation — empowering underprivileged communities through education, healthcare, and economic opportunities since 2014." />
        <meta property="og:title" content="SUN Foundation — Empowering Communities, Transforming Lives" />
        <meta property="og:description" content="Since 2014, SUN Foundation has touched 50,000+ lives across India." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1200&q=80" />
      </Helmet>

      <HeroBanner />
      <MissionHighlights />
      <ImpactStats />
      <OurTeamsCarousel />
      <UpcomingEvents />
      <TestimonialsCarousel />
      <VolunteerCTA />
    </>
  )
}
