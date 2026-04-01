import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const events = [
  {
    title: 'Annual Health Camp 2024',
    date: 'Apr 15, 2026',
    time: '9:00 AM – 4:00 PM',
    location: 'Vijayawada, Andhra Pradesh',
    description: 'Free health checkups, eye tests, and dental care for 500+ families in rural AP.',
    category: 'Healthcare',
    badgeVariant: 'saffron' as const,
    day: '15',
    month: 'APR',
  },
  {
    title: 'Digital Literacy Drive',
    date: 'Apr 22, 2026',
    time: '10:00 AM – 1:00 PM',
    location: 'Guntur District, AP',
    description: 'Teaching basic computer skills and internet safety to 200 village students.',
    category: 'Education',
    badgeVariant: 'forest' as const,
    day: '22',
    month: 'APR',
  },
  {
    title: 'Women Empowerment Summit',
    date: 'May 5, 2026',
    time: '11:00 AM – 5:00 PM',
    location: 'Krishna District, AP',
    description: 'Leadership training, legal awareness, and skill workshops for rural women.',
    category: 'Women Empowerment',
    badgeVariant: 'golden' as const,
    day: '05',
    month: 'MAY',
  },
]

export default function UpcomingEvents() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="section-padding bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
        >
          <div>
            <p className="text-saffron-500 font-semibold font-body text-sm uppercase tracking-widest mb-2">What's Coming</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">
              Upcoming Events
            </h2>
          </div>
          <Button asChild variant="saffron-outline" size="sm">
            <Link to="/events" className="flex items-center gap-1.5">
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Card className="h-full border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Date badge */}
                      <div className="w-20 flex-shrink-0 bg-saffron-500 flex flex-col items-center justify-center py-5 px-2">
                        <p className="text-white text-3xl font-bold font-display leading-none">{event.day}</p>
                        <p className="text-white/80 text-xs font-semibold tracking-widest mt-1">{event.month}</p>
                      </div>

                      <div className="flex-1 p-5">
                        <Badge variant={event.badgeVariant} className="mb-2 text-xs">
                          {event.category}
                        </Badge>
                        <h3 className="font-bold font-display text-foreground text-base mb-3 leading-tight">
                          {event.title}
                        </h3>
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="w-3.5 h-3.5 text-saffron-500" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 text-forest-500" />
                            {event.location}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                          {event.description}
                        </p>
                        <Button asChild variant="saffron" size="sm" className="w-full">
                          <Link to="/events">Register</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
