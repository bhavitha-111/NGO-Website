import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  bgImage?: string
}

export default function PageHero({ title, subtitle, breadcrumbs = [], bgImage }: PageHeroProps) {
  return (
    <section
      className="relative pt-28 pb-16 overflow-hidden"
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Background pattern */}
      {!bgImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-saffron-500/10 via-background to-forest-500/10" />
      )}
      {bgImage && <div className="absolute inset-0 bg-black/60" />}

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative container max-w-7xl mx-auto px-4">
        {breadcrumbs.length > 0 && (
          <motion.nav
            className="flex items-center gap-1.5 text-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className={`w-3.5 h-3.5 ${bgImage ? 'text-white/50' : 'text-muted-foreground'}`} />}
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className={`hover:text-saffron-500 transition-colors ${bgImage ? 'text-white/70' : 'text-muted-foreground'}`}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={bgImage ? 'text-white' : 'text-foreground font-medium'}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold font-display ${bgImage ? 'text-white' : 'text-foreground'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className={`mt-4 text-lg max-w-2xl leading-relaxed ${bgImage ? 'text-white/80' : 'text-muted-foreground'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Accent line */}
        <motion.div
          className="mt-6 w-16 h-1 bg-saffron-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </div>
    </section>
  )
}
