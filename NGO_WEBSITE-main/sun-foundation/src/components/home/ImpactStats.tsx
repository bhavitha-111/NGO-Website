import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const stats = [
  { value: 50000, label: 'Lives Impacted', suffix: '+', description: 'Across 15 Indian states' },
  { value: 500, label: 'Active Volunteers', suffix: '+', description: 'Young changemakers' },
  { value: 15, label: 'Events Held', suffix: '+', description: 'Community programs' },
  { value: 10, label: 'Years of Service', suffix: '+', description: 'Since 2014' },
]

function StatCard({ value, label, suffix, description, delay, isVisible }: {
  value: number; label: string; suffix: string; description: string; delay: number; isVisible: boolean
}) {
  const { count, ref } = useCountUp({ end: value, duration: 2000 })
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <p className="text-5xl md:text-6xl font-bold font-display text-white mb-2">
        {count.toLocaleString('en-IN')}{suffix}
      </p>
      <p className="text-lg font-semibold text-white font-body">{label}</p>
      <p className="text-white/60 text-sm font-body mt-1">{description}</p>
    </motion.div>
  )
}

export default function ImpactStats() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-saffron-gradient" />
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.1) 20px,
            rgba(255,255,255,0.1) 40px
          )`,
        }}
      />

      <div className="relative container max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-white/70 font-body text-lg">
            A decade of dedication, measured in lives changed.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              {...stat}
              delay={i * 0.1}
              isVisible={isIntersecting}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
