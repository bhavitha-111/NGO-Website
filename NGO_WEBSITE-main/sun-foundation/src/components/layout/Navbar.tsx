import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', to: '/home' },
  { label: 'About', to: '/about' },
  { label: 'Our Works', to: '/works' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

function SunLogo({ size = 20 }: { size?: number }) {
  const r = size / 2
  const rays = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={r} cy={r} r={r * 0.38} fill="white" />
      {rays.map((deg) => {
        const rad = (deg - 90) * (Math.PI / 180)
        return (
          <line
            key={deg}
            x1={r} y1={r}
            x2={r + r * 0.82 * Math.cos(rad)}
            y2={r + r * 0.82 * Math.sin(rad)}
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = ['/home', '/'].includes(location.pathname)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 72)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const transparent = isHome && !scrolled

  // ✅ UPDATED NAVBAR STYLE
  const navBg = transparent
    ? 'bg-transparent'
    : 'bg-gradient-to-r from-orange-500/90 via-amber-400/90 to-yellow-300/90 dark:from-[#120a04]/95 dark:to-[#2a1608]/95 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.15)] border-b border-white/10'

  return (
    <motion.header
      className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', navBg)}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-[68px] items-center justify-between">

        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <SunLogo size={20} />
          </div>
          <div className="leading-tight">
            <span className={cn(
              'text-[17px] font-bold font-display tracking-wide drop-shadow-sm transition-all duration-300',
              transparent ? 'text-white' : 'text-gray-900 dark:text-white'
            )}>
              SUN Foundation
            </span>
            <span className={cn(
              'block text-[9px] font-body tracking-[0.18em] uppercase transition-colors duration-300',
              transparent ? 'text-white/65' : 'text-saffron-500/80 dark:text-saffron-400/70'
            )}>
              Student Union for Nation
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => cn(
                'px-3.5 py-2 rounded-lg text-sm font-medium font-body transition-all duration-200 hover:scale-105',
                transparent
                  ? isActive
                    ? 'text-golden bg-white/15 font-semibold'
                    : 'text-white/90 hover:text-white hover:bg-white/12'
                  : isActive
                    ? 'text-saffron-600 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-950/50 font-semibold'
                    : 'text-gray-700 dark:text-gray-200 hover:text-saffron-600 dark:hover:text-saffron-400 hover:bg-saffron-50/60 dark:hover:bg-saffron-950/30'
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={cn(
              'p-2 rounded-lg transition-all duration-200',
              transparent
                ? 'text-white/80 hover:text-white hover:bg-white/12'
                : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400 hover:bg-saffron-50/60 dark:hover:bg-saffron-950/30'
            )}
          >
            {theme === 'dark'
              ? <Sun className="w-4 h-4" />
              : <Moon className="w-4 h-4" />
            }
          </button>

          {/* ✅ UPDATED BUTTON */}
          <Button asChild variant="saffron" size="sm" className="hidden sm:flex gap-1.5 rounded-lg font-semibold text-sm px-4 shadow-md hover:shadow-lg hover:scale-105 transition-all">
            <Link to="/donate">
              <Heart className="w-3.5 h-3.5 fill-white" />
              Donate
            </Link>
          </Button>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open navigation menu"
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-all duration-200',
                  transparent
                    ? 'text-white/80 hover:text-white hover:bg-white/12'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-saffron-50/60 dark:hover:bg-saffron-950/30'
                )}
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] p-0">
              <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
                <div className="w-9 h-9 rounded-full bg-saffron-gradient flex items-center justify-center shadow">
                  <SunLogo size={18} />
                </div>
                <div>
                  <p className="font-bold font-display text-foreground text-sm leading-tight">SUN Foundation</p>
                  <p className="text-[9px] text-saffron-500 tracking-[0.18em] uppercase">Student Union for Nation</p>
                </div>
              </div>

              <div className="flex flex-col p-4 gap-0.5">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => cn(
                        'px-4 py-2.5 rounded-lg text-sm font-medium font-body transition-colors',
                        isActive
                          ? 'bg-saffron-50 dark:bg-saffron-950/50 text-saffron-600 dark:text-saffron-400 font-semibold'
                          : 'text-foreground hover:bg-muted hover:text-saffron-600 dark:hover:text-saffron-400'
                      )}
                    >
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </div>

              <div className="px-4 pb-6 pt-2 border-t border-border">
                <Button asChild variant="saffron" className="w-full gap-2 font-semibold">
                  <SheetClose asChild>
                    <Link to="/donate">
                      <Heart className="w-4 h-4 fill-white" />
                      Donate Now
                    </Link>
                  </SheetClose>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
