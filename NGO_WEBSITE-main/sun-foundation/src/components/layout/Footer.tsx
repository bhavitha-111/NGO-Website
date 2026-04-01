import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// ── Social media SVG icons ────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Works', to: '/works' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'Volunteer', to: '/volunteer' },
  { label: 'Donate', to: '/donate' },
]

const teams = [
  'Feeding Hands',
  'Life Saviours',
  'Tech Saala',
  'Elite Queens',
  'Visual Vibes',
  'Guiding Lights',
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/student_union_for_nation',
    Icon: InstagramIcon,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/Student-Union-for-Nation',
    Icon: FacebookIcon,
  },
  {
    label: 'YouTube',
    href: '#',
    Icon: YouTubeIcon,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919494808589',
    Icon: WhatsAppIcon,
  },
]

function SunLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.6" fill="white"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg - 90) * (Math.PI / 180)
        return (
          <line
            key={deg}
            x1="12" y1="12"
            x2={12 + 9 * Math.cos(rad)}
            y2={12 + 9 * Math.sin(rad)}
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-950 dark:bg-[#0d0704] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center shadow-lg shadow-saffron-900/40">
                <SunLogo />
              </div>
              <div>
                <p className="font-bold font-display text-white text-sm leading-tight">SUN Foundation</p>
                <p className="text-[9px] text-saffron-400/80 tracking-[0.18em] uppercase mt-0.5">Est. 2014</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Student Union for Nation — empowering underprivileged communities through
              education, healthcare, and sustainable economic opportunities across India.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/[0.07] hover:bg-saffron-500 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-saffron-900/30"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-5 text-xs tracking-[0.15em] uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-saffron-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-600 group-hover:bg-saffron-400 flex-shrink-0 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams */}
          <div>
            <h3 className="font-display font-semibold text-white mb-5 text-xs tracking-[0.15em] uppercase">
              Our Teams
            </h3>
            <ul className="space-y-2.5">
              {teams.map((team) => (
                <li key={team}>
                  <Link
                    to="/works#teams"
                    className="text-sm text-gray-400 hover:text-forest-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-600 group-hover:bg-forest-400 flex-shrink-0 transition-colors" />
                    {team}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="font-display font-semibold text-white mb-5 text-xs tracking-[0.15em] uppercase">
              Stay Connected
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Get updates on our latest projects, events, and impact stories.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2.5">
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-white/[0.06] border-white/[0.12] text-white placeholder:text-gray-500 focus-visible:ring-saffron-500 focus-visible:border-saffron-500/50 rounded-lg"
              />
              <Button variant="saffron" size="sm" type="submit" className="w-full font-semibold rounded-lg">
                Subscribe
              </Button>
            </form>
            <div className="mt-5 space-y-2.5">
              <a href="mailto:studentunionfornation@gmail.com" className="flex items-center gap-2 text-xs text-gray-400 hover:text-saffron-400 transition-colors group">
                <Mail className="w-3.5 h-3.5 text-saffron-500 flex-shrink-0" />
                studentunionfornation@gmail.com
              </a>
              <a href="tel:+919494808589" className="flex items-center gap-2 text-xs text-gray-400 hover:text-saffron-400 transition-colors group">
                <Phone className="w-3.5 h-3.5 text-saffron-500 flex-shrink-0" />
                +91 94948 08589
              </a>
              <div className="flex items-start gap-2 text-xs text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-saffron-500 flex-shrink-0 mt-0.5" />
                Andhra Pradesh, India
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/[0.06] mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} SUN Foundation. Registered under Indian Trust Act · Reg. No: AP/2014/0012345
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-saffron-500 fill-saffron-500" /> for India
          </p>
        </div>
      </div>
    </footer>
  )
}
