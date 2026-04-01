import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const teams = [
  {
    name: 'Feeding Hands',
    memberCount: 85,
    specialty: ['Food Distribution', 'Hunger Relief'],
    description: 'Fighting hunger one meal at a time — organizing community kitchens and food drives.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
    color: 'bg-orange-50 dark:bg-orange-950',
    badge: 'saffron' as const,
  },
  {
    name: 'Life Saviours',
    memberCount: 60,
    specialty: ['Healthcare', 'First Aid'],
    description: 'Providing free medical camps and health awareness in underserved communities.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80',
    color: 'bg-red-50 dark:bg-red-950',
    badge: 'destructive' as const,
  },
  {
    name: 'Tech Saala',
    memberCount: 45,
    specialty: ['Digital Literacy', 'Coding'],
    description: 'Bridging the digital divide with free coding workshops and tech education.',
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&q=80',
    color: 'bg-blue-50 dark:bg-blue-950',
    badge: 'secondary' as const,
  },
  {
    name: 'Elite Queens',
    memberCount: 70,
    specialty: ['Women Empowerment', 'Leadership'],
    description: 'Empowering women through skill development, self-defense, and leadership training.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
    color: 'bg-purple-50 dark:bg-purple-950',
    badge: 'outline' as const,
  },
  {
    name: 'Visual Vibes',
    memberCount: 40,
    specialty: ['Photography', 'Media'],
    description: 'Documenting our impact through powerful visual storytelling and media campaigns.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80',
    color: 'bg-yellow-50 dark:bg-yellow-950',
    badge: 'golden' as const,
  },
  {
    name: 'Guiding Lights',
    memberCount: 55,
    specialty: ['Mentorship', 'Education'],
    description: 'Mentoring students from underprivileged backgrounds for academic and career success.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80',
    color: 'bg-green-50 dark:bg-green-950',
    badge: 'forest' as const,
  },
]

export default function OurTeamsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 3500 })])
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="section-padding bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
        >
          <div>
            <p className="text-saffron-500 font-semibold font-body text-sm uppercase tracking-widest mb-2">Our Teams</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">
              Meet the Change-Makers
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} aria-label="Previous team">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} aria-label="Next team">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {teams.map((team) => (
              <div key={team.name} className="flex-none w-[280px] md:w-[320px]">
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl overflow-hidden border bg-card shadow-sm hover:shadow-lg transition-shadow h-full`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={team.image}
                      alt={`${team.name} team`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white font-bold font-display text-lg">{team.name}</p>
                      <p className="text-white/70 text-sm">{team.memberCount} members</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-3">
                      {team.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {team.specialty.map((tag) => (
                        <Badge key={tag} variant={team.badge} className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
