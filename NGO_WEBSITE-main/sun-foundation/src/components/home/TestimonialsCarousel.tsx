import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const testimonials = [
  {
    name: 'Ramesh Patel',
    role: 'Beneficiary, Vijayawada',
    quote: 'SUN Foundation changed my life. The free health camp detected my diabetes early. I am forever grateful to the Life Saviours team for their dedication and care.',
    rating: 5,
    initials: 'RP',
  },
  {
    name: 'Priya Sharma',
    role: 'Volunteer, Tech Saala',
    quote: 'Being part of Tech Saala has been the most rewarding experience. Teaching digital skills to village students and watching them light up — there\'s nothing like it.',
    rating: 5,
    initials: 'PS',
  },
  {
    name: 'Meera Devi',
    role: 'Women Empowerment Program',
    quote: 'After joining Elite Queens, I started my own small business. The training, confidence, and network they gave me was priceless. I now employ 5 other women.',
    rating: 5,
    initials: 'MD',
  },
  {
    name: 'Arjun Kumar',
    role: 'Student Beneficiary, Guiding Lights',
    quote: 'Guiding Lights mentors helped me crack my engineering entrance exam. Without their support, a boy from a small village could never have achieved this dream.',
    rating: 5,
    initials: 'AK',
  },
  {
    name: 'Sonal Mary',
    role: 'Corporate Partner',
    quote: 'Our CSR partnership with SUN Foundation has been the most transparent and impactful giving experience. The team\'s integrity and reporting are world-class.',
    rating: 5,
    initials: 'SM',
  },
  {
    name: 'Navjot Gupta',
    role: 'Donor, Mumbai',
    quote: 'I\'ve donated to many NGOs but SUN Foundation stands out. Every rupee is accounted for with field photos, impact reports, and personal calls. Truly trustworthy.',
    rating: 5,
    initials: 'NG',
  },
  {
    name: 'Lakshmi Nair',
    role: 'Feeding Hands Volunteer',
    quote: 'The Feeding Hands team taught me that no act of kindness is too small. Distributing meals every Sunday for two years has given my life a sense of purpose.',
    rating: 5,
    initials: 'LN',
  },
]

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4500 })]
  )
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="section-padding bg-gradient-to-b from-muted/20 to-background">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
        >
          <div>
            <p className="text-saffron-500 font-semibold font-body text-sm uppercase tracking-widest mb-2">What People Say</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">
              Stories of Change
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} aria-label="Previous testimonial">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} aria-label="Next testimonial">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="flex-none w-[300px] md:w-[380px]">
                <div className="bg-card border rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-golden fill-golden" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/80 font-body text-sm leading-relaxed mb-5 italic">
                    "{t.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-saffron-100 dark:bg-saffron-900 text-saffron-600 dark:text-saffron-400 text-sm font-bold font-display">
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold font-body text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
