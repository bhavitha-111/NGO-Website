import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MapPin, Clock, ExternalLink } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCountUp } from '@/hooks/useCountUp'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const upcomingEvents = [
  { title: 'Annual Health Camp 2026', date: 'Apr 15, 2026', day: '15', month: 'APR', time: '9:00 AM – 4:00 PM', location: 'Vijayawada, AP', description: 'Free health checkups, eye tests, dental care, blood sugar, and BP monitoring for 500+ families.', category: 'Healthcare', badge: 'saffron' as const },
  { title: 'Digital Literacy Drive', date: 'Apr 22, 2026', day: '22', month: 'APR', time: '10:00 AM – 1:00 PM', location: 'Guntur District, AP', description: 'Teaching computer basics, internet safety, and UPI payments to 200 village students.', category: 'Education', badge: 'forest' as const },
  { title: 'Women Empowerment Summit', date: 'May 5, 2026', day: '05', month: 'MAY', time: '11:00 AM – 5:00 PM', location: 'Krishna District, AP', description: 'Leadership workshops, legal aid clinics, and skill development for rural women.', category: 'Women Empowerment', badge: 'golden' as const },
  { title: 'Sunday Food Drive', date: 'Every Sunday', day: '☀', month: 'SUN', time: '8:00 AM – 10:00 AM', location: 'Vijayawada, AP', description: 'Our weekly tradition — distributing nutritious meals to 200+ families. Everyone welcome!', category: 'Food', badge: 'saffron' as const },
]

const pastEvents = [
  { title: 'COVID Relief Drive 2021', date: 'Apr–Jun, 2021', day: '20', month: 'APR', time: 'Multiple dates', location: 'Vijayawada & Guntur, AP', description: 'Distributed 1 lakh meals, 5,000 PPE kits, and oxygen support to 500+ families during peak COVID.', category: 'Emergency Relief', badge: 'secondary' as const, highlights: 'View Gallery' },
  { title: 'Tech Saala Bootcamp 2023', date: 'Dec 2023', day: '10', month: 'DEC', time: '4-week Program', location: 'Vijayawada, AP', description: '4-week intensive coding bootcamp training 100 rural students in Python and web basics.', category: 'Technology', badge: 'secondary' as const, highlights: 'Read Blog' },
  { title: 'Women\'s Day Celebration 2024', date: 'Mar 8, 2024', day: '08', month: 'MAR', time: '10:00 AM – 4:00 PM', location: 'Vijayawada, AP', description: 'Felicitated 50 rural women entrepreneurs and ran self-defense sessions for 300+ women.', category: 'Women Empowerment', badge: 'secondary' as const, highlights: 'View Photos' },
]

function ImpactRow() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 })
  const stats = [
    { value: 25000, label: 'Lives Impacted via Events', suffix: 'K+' },
    { value: 150, label: 'Total Raised (₹)', suffix: 'K+' },
    { value: 500, label: 'Volunteers Engaged', suffix: '+' },
    { value: 15, label: 'Events Organized', suffix: '+' },
  ]

  function Stat({ value, label, suffix, isVisible }: { value: number; label: string; suffix: string; isVisible: boolean }) {
    const { count, ref } = useCountUp({ end: value, duration: 2000 })
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
        <p className="text-4xl font-bold font-display text-white">{count.toLocaleString('en-IN')}{suffix}</p>
        <p className="text-white/70 text-sm font-body mt-1">{label}</p>
      </div>
    )
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="bg-saffron-gradient py-12 mt-10 rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
        {stats.map(s => <Stat key={s.label} {...s} isVisible={isIntersecting} />)}
      </div>
    </div>
  )
}

type EventItem = {
  title: string; date: string; day: string; month: string; time: string;
  location: string; description: string; category: string;
  badge: 'saffron' | 'forest' | 'golden' | 'secondary' | 'outline' | 'default' | 'destructive';
  highlights?: string
}
function EventCard({ event, isPast = false, index }: { event: EventItem, isPast?: boolean, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <CardContent className="p-0">
          <div className="flex">
            <div className={`w-20 flex-shrink-0 ${isPast ? 'bg-muted-foreground/80' : 'bg-saffron-500'} flex flex-col items-center justify-center py-5`}>
              <p className={`text-3xl font-bold font-display leading-none ${isPast ? 'text-white/90' : 'text-white'}`}>{event.day}</p>
              <p className={`text-xs font-semibold tracking-widest mt-1 ${isPast ? 'text-white/60' : 'text-white/80'}`}>{event.month}</p>
            </div>
            <div className="flex-1 p-5">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant={isPast ? 'secondary' : event.badge} className="text-xs">{event.category}</Badge>
                {isPast && <Badge variant="outline" className="text-xs">Past</Badge>}
              </div>
              <h3 className="font-bold font-display text-foreground text-base mb-2">{event.title}</h3>
              <div className="flex flex-wrap gap-3 mb-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" /> {event.time}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-saffron-500" /> {event.location}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">{event.description}</p>
              {isPast ? (
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  {(event as { highlights?: string }).highlights || 'View Highlights'}
                </Button>
              ) : (
                <Button variant="saffron" size="sm">Register Now</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Events() {
  return (
    <>
      <Helmet>
        <title>Events — SUN Foundation</title>
        <meta name="description" content="View upcoming and past events by SUN Foundation — health camps, educational drives, and community programs across Andhra Pradesh." />
      </Helmet>

      <PageHero
        title="Events"
        subtitle="Every event is a chance to create impact. Come be part of the change."
        breadcrumbs={[{ label: 'Home', to: '/home' }, { label: 'Events' }]}
      />

      <section className="section-padding">
        <div className="container max-w-7xl mx-auto px-4">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-8 bg-muted">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white">
                Upcoming Events ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white">
                Past Events ({pastEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {upcomingEvents.map((event, i) => (
                  <EventCard key={event.title} event={event} index={i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {pastEvents.map((event, i) => (
                  <EventCard key={event.title} event={event} isPast index={i} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <ImpactRow />
        </div>
      </section>
    </>
  )
}
