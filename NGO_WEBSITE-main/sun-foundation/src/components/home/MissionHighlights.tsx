import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GraduationCap, BookOpen, HeartPulse, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const features = [
  {
    icon: GraduationCap,
    title: 'Student Empowerment',
    description: 'Nurturing the next generation of leaders through mentorship, scholarships, and skill-building programs.',
    color: 'text-saffron-500',
    bg: 'bg-saffron-50 dark:bg-saffron-950',
    link: '/works',
  },
  {
    icon: BookOpen,
    title: 'Educational Outreach',
    description: 'Bridging the education gap in rural communities with digital literacy programs and free learning centers.',
    color: 'text-forest-500',
    bg: 'bg-forest-50 dark:bg-forest-950',
    link: '/works',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare Access',
    description: 'Providing free medical camps, health screenings, and awareness programs to underserved villages.',
    color: 'text-golden',
    bg: 'bg-amber-50 dark:bg-amber-950',
    link: '/works',
  },
]

export default function MissionHighlights() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="section-padding bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-saffron-500 font-semibold font-body text-sm uppercase tracking-widest mb-2">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            Our Mission in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Three pillars that form the foundation of everything we do at SUN Foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold font-display text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground font-body leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <Link
                      to={feature.link}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold font-body ${feature.color} group-hover:gap-2.5 transition-all`}
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
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
