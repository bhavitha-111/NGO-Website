import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Heart, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCountUp } from '@/hooks/useCountUp'

// Real SUN Foundation images
const heroImages = [
  { src: 'https://studentunionfornation.org/sunimages/sun1.jpg',  caption: 'Empowering Communities' },
  { src: 'https://studentunionfornation.org/sunimages/sun4.jpg',  caption: 'Serving with Heart' },
  { src: 'https://studentunionfornation.org/sunimages/sun8.jpg',  caption: 'Education for All' },
  { src: 'https://studentunionfornation.org/sunimages/sun12.jpg', caption: 'Healthcare Drives' },
  { src: 'https://studentunionfornation.org/sunimages/sun16.jpg', caption: 'Together We Rise' },
]

const stats = [
  { value: 50000, label: 'Lives Touched', suffix: '+', icon: Heart },
  { value: 500,   label: 'Volunteers',    suffix: '+', icon: Users },
  { value: 150,   label: 'K Raised',      prefix: '₹', suffix: 'K', icon: null },
  { value: 15,    label: 'Events',        suffix: '+', icon: null },
]

function StatCounter({ value, label, suffix = '', prefix = '' }: {
  value: number; label: string; suffix?: string; prefix?: string
}) {
  const { count, ref } = useCountUp({ end: value, duration: 2200 })
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <p className="text-3xl md:text-4xl font-bold font-display text-white drop-shadow-md">
        {prefix}{count.toLocaleString('en-IN')}{suffix}
      </p>
      <p className="text-sm text-white/70 font-body mt-1">{label}</p>
    </div>
  )
}

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % heroImages.length)
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Slideshow background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync" initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04, x: direction * 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: direction * -30 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <img
              src={heroImages[current].src}
              alt={heroImages[current].caption}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80'
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ✅ UPDATED OVERLAY (stronger + premium) */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/40 to-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10" />
      </div>

      {/* Controls */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          onClick={prev}
          className="w-10 h-10 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          onClick={next}
          className="w-10 h-10 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-saffron-400 w-6 h-2'
                : 'bg-white/40 w-2 h-2 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[68px]">
          <motion.div className="max-w-3xl">

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6"
            >
              Empowering{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Communities,
              </span>
              <br />
              Transforming Lives
            </motion.h1>

            <motion.p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl font-body">
              Since 2014, SUN Foundation has touched{' '}
              <span className="text-golden font-semibold">50,000+ lives</span>
            </motion.p>

            {/* ✅ UPDATED BUTTONS */}
            <motion.div className="flex flex-wrap gap-4">
              <Button asChild variant="saffron" size="xl" className="hover:scale-105 transition-all shadow-lg">
                <Link to="/volunteer">Join as Volunteer</Link>
              </Button>

              <Button asChild variant="white-outline" size="xl" className="hover:scale-105 transition-all">
                <Link to="/donate">Donate Now</Link>
              </Button>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <motion.div className="relative z-20 bg-black/60 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-white/20">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  )
}
