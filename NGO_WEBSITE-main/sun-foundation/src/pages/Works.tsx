import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Users } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const projects = [
  { id: '1', title: 'Free Medical Camp — Guntur', category: 'Healthcare', description: 'Served 800+ patients with free consultations, medicines, and diagnostic tests.', impact: '800+ Patients', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', badge: 'saffron' as const },
  { id: '2', title: 'Digital Classroom Initiative', category: 'Education', description: 'Set up 10 smart classrooms in government schools across Krishna district.', impact: '2000+ Students', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80', badge: 'forest' as const },
  { id: '3', title: 'Elite Queens Self-Defense Drive', category: 'Women Empowerment', description: 'Self-defense training for 500 young women across 8 villages in AP.', impact: '500 Women', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80', badge: 'golden' as const },
  { id: '4', title: 'Rural Coding Bootcamp', category: 'Tech', description: 'Intensive 4-week programming course for Class 9–12 students in rural areas.', impact: '300+ Students', image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&q=80', badge: 'secondary' as const },
  { id: '5', title: 'Sunday Food Drive', category: 'Food', description: 'Weekly meal distribution to 200+ families every Sunday across Vijayawada.', impact: '52 Sundays/Year', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80', badge: 'saffron' as const },
  { id: '6', title: 'Maternal Health Program', category: 'Healthcare', description: 'Prenatal care, nutrition support, and awareness for 300+ rural mothers.', impact: '300+ Mothers', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', badge: 'saffron' as const },
  { id: '7', title: 'Scholarship Program 2024', category: 'Education', description: 'Merit-cum-need scholarships for 150 deserving students for higher education.', impact: '150 Scholars', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80', badge: 'forest' as const },
  { id: '8', title: 'Women Entrepreneurs Workshop', category: 'Women Empowerment', description: 'Business skills, GST registration, and microfinance access for women entrepreneurs.', impact: '200 Women', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', badge: 'golden' as const },
  { id: '9', title: 'Village Photography Contest', category: 'Tech', description: 'Visual Vibes team taught phone photography to 100 youth — stories from their villages.', impact: '100 Youth', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80', badge: 'secondary' as const },
]

const teams = [
  { name: 'Feeding Hands', memberCount: 85, impact: '52,000 Meals/Year', description: 'Fighting hunger through weekly food distributions, community kitchens, and food education programs across Vijayawada and Guntur.', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80' },
  { name: 'Life Saviours', memberCount: 60, impact: '5,000 Patients/Year', description: 'Trained healthcare volunteers running free medical camps, blood donation drives, and mental health awareness sessions.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80' },
  { name: 'Tech Saala', memberCount: 45, impact: '1,500 Students Trained', description: 'Digital educators bringing coding, internet safety, and tech literacy to rural schools and community centers.', image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&q=80' },
  { name: 'Elite Queens', memberCount: 70, impact: '3,000 Women Empowered', description: 'Champions of women\'s rights and empowerment — running leadership workshops, self-defense training, and entrepreneurship support.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80' },
  { name: 'Visual Vibes', memberCount: 40, impact: '200 Stories Documented', description: 'The storytellers of SUN — documenting impact through photography, videography, and social media campaigns.', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80' },
  { name: 'Guiding Lights', memberCount: 55, impact: '500 Students Mentored', description: 'Mentors and tutors guiding students from Class 8 through competitive exams, career counseling, and life skills.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80' },
]

const categories = ['All', 'Healthcare', 'Education', 'Women Empowerment', 'Tech', 'Food']

export default function Works() {
  const [activeCategory, setActiveCategory] = useState('All')
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05 })

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <>
      <Helmet>
        <title>Our Works — SUN Foundation</title>
        <meta name="description" content="Explore SUN Foundation's impactful projects across healthcare, education, women empowerment, and technology in rural India." />
      </Helmet>

      <PageHero
        title="Our Works"
        subtitle="From free health camps to digital classrooms — here's how we're making a difference on the ground."
        breadcrumbs={[{ label: 'Home', to: '/home' }, { label: 'Our Works' }]}
      />

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium font-body transition-all ${
                  activeCategory === cat
                    ? 'bg-saffron-500 text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant={project.badge} className="text-xs shadow">{project.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold font-display text-foreground text-lg mb-2">{project.title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-saffron-500 font-bold text-sm font-body">📊 {project.impact}</span>
                      <Button variant="ghost" size="sm" className="text-saffron-500 hover:text-saffron-600 p-0 h-auto gap-1">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams Detail */}
      <section id="teams" ref={ref as React.RefObject<HTMLElement>} className="section-padding bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          >
            <p className="text-saffron-500 font-semibold font-body text-sm uppercase tracking-widest mb-2">The People Behind the Work</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">Our 6 Specialized Teams</h2>
          </motion.div>

          <div className="space-y-8">
            {teams.map((team, i) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className={`overflow-hidden shadow-sm hover:shadow-md transition-shadow ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <CardContent className="p-0">
                    <div className={`flex flex-col md:flex-row ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="md:w-2/5 relative h-56 md:h-auto overflow-hidden">
                        <img
                          src={team.image}
                          alt={`${team.name} team`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                      </div>
                      <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold font-display text-foreground mb-1">{team.name}</h3>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Users className="w-4 h-4 text-saffron-500" /> {team.memberCount} members
                          </span>
                          <span className="text-saffron-500 font-semibold text-sm">• {team.impact}</span>
                        </div>
                        <p className="text-muted-foreground font-body leading-relaxed mb-5">{team.description}</p>
                        <Button asChild variant="saffron-outline" size="sm" className="self-start">
                          <Link to="/volunteer">Meet the Team <ArrowRight className="w-4 h-4 ml-1" /></Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
