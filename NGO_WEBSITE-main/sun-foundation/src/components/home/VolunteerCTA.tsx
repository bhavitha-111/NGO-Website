import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function VolunteerCTA() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="section-padding bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 rounded-full px-4 py-1.5 mb-6">
              <Users className="w-4 h-4 text-forest-500" />
              <span className="text-forest-600 dark:text-forest-400 text-sm font-medium font-body">500+ Active Volunteers</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-5 leading-tight">
              Be the Change.
              <br />
              <span className="text-saffron-500">Join 500+ Volunteers</span>
              <br />
              Making Real Impact.
            </h2>

            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
              Whether you have 2 hours or 20 hours a week, your time and skills can transform lives.
              Join one of our 6 specialized teams and be part of India's grassroots revolution.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Flexible Timing', desc: 'Weekends or weekdays' },
                { label: 'Skill Building', desc: 'Grow as you give' },
                { label: 'Make Impact', desc: 'Real, measurable change' },
                { label: 'Recognition', desc: 'Certificates & awards' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-saffron-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold font-body text-foreground text-sm">{label}</p>
                    <p className="text-muted-foreground text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild variant="saffron" size="lg" className="gap-2">
              <Link to="/volunteer">
                Become a Volunteer <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                alt="Volunteers making a difference in communities"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating stat */}
            <motion.div
              className="absolute -bottom-4 -left-4 bg-saffron-500 text-white rounded-xl p-4 shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p className="text-3xl font-bold font-display">500+</p>
              <p className="text-sm text-white/80 font-body">Volunteers</p>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 bg-forest-500 text-white rounded-xl p-4 shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p className="text-3xl font-bold font-display">10+</p>
              <p className="text-sm text-white/80 font-body">Years Active</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
