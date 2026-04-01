import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Target, Eye, Heart, Lightbulb, Users, Handshake } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const founders = [
  {
    name: 'Yashwanth',
    role: 'Co-Founder & President',
    bio: 'A visionary leader who founded SUN Foundation at 22 with the dream of empowering a million youth. Drives strategy, partnerships, and on-ground operations across AP.',
    tags: ['Strategy', 'Leadership', 'Community Development'],
    initials: 'YR',
    color: 'bg-saffron-100 dark:bg-saffron-950 text-saffron-600 dark:text-saffron-400',
  },
  {
    name: 'Krishnaprasad',
    role: 'Co-Founder & CEO',
    bio: 'A passionate social entrepreneur with deep roots in rural Andhra Pradesh. Leads all education and healthcare initiatives with a data-driven, compassionate approach.',
    tags: ['Education', 'Healthcare', 'Operations'],
    initials: 'KP',
    color: 'bg-forest-100 dark:bg-forest-950 text-forest-600 dark:text-forest-400',
  },
  {
    name: 'Pavan',
    role: 'Co-Founder & CTO',
    bio: 'A tech innovator who built SUN Foundation\'s digital backbone. Leads Tech Saala and drives digital literacy programs to bridge the rural-urban tech divide.',
    tags: ['Technology', 'Digital Literacy', 'Innovation'],
    initials: 'PK',
    color: 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
  },
]

const leadership = [
  { role: 'Chief Operating Officer', initials: 'AR', name: 'Ananya Reddy' },
  { role: 'Chief Finance Officer', initials: 'VM', name: 'Vijay Murthy' },
  { role: 'Head of Programs', initials: 'SS', name: 'Sunita Sharma' },
  { role: 'Head of Partnerships', initials: 'RK', name: 'Ravi Kumar' },
]

const timeline = [
  { year: '2014', title: 'Foundation Established', desc: 'Three college friends — Yashwanth, Krishnaprasad, and Pavan — started SUN Foundation with ₹50,000 and a vision to serve.', color: 'bg-saffron-500' },
  { year: '2015', title: 'First Healthcare Camp', desc: 'Organized the first free medical camp serving 200 families in Guntur District.', color: 'bg-forest-500' },
  { year: '2017', title: 'Team Expansion', desc: 'Launched 6 specialized teams and expanded to 5 districts in Andhra Pradesh.', color: 'bg-golden' },
  { year: '2019', title: 'Tech Saala Launched', desc: 'Established India\'s first rural coding school, teaching programming to 500+ students.', color: 'bg-saffron-500' },
  { year: '2021', title: 'COVID Response', desc: 'Delivered 1 lakh meals and PPE kits during the pandemic — our biggest mobilization ever.', color: 'bg-red-500' },
  { year: '2024', title: '50,000 Lives Milestone', desc: 'Celebrated 10 years of impact with 50,000+ lives touched, 500+ active volunteers.', color: 'bg-forest-500' },
]

const values = [
  { icon: Heart, title: 'Compassion', desc: 'Every action flows from genuine care for human dignity and well-being.' },
  { icon: Eye, title: 'Integrity', desc: 'Complete transparency in operations, finances, and impact reporting.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Finding creative, sustainable solutions to age-old social challenges.' },
  { icon: Handshake, title: 'Collaboration', desc: 'Building bridges between communities, governments, and corporates.' },
]

function TimelineSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5" />
      <div className="space-y-8">
        {timeline.map((item, i) => (
          <motion.div
            key={item.year}
            className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="md:w-1/2" />
            <div className={`absolute left-0 md:left-1/2 w-8 h-8 rounded-full ${item.color} transform md:-translate-x-4 flex items-center justify-center shadow-md`}>
              <span className="text-white text-xs font-bold">●</span>
            </div>
            <div className="md:w-1/2 ml-12 md:ml-0">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <span className={`inline-block text-xs font-bold font-body px-2 py-0.5 rounded-full text-white ${item.color} mb-2`}>
                    {item.year}
                  </span>
                  <h3 className="font-bold font-display text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <>
      <Helmet>
        <title>About Us — SUN Foundation</title>
        <meta name="description" content="Learn about SUN Foundation's story, vision, mission, founders, and the teams making real impact across India since 2014." />
      </Helmet>

      <PageHero
        title="About SUN Foundation"
        subtitle="Since 2014, three young dreamers from Andhra Pradesh have built a movement that has touched 50,000+ lives."
        breadcrumbs={[{ label: 'Home', to: '/home' }, { label: 'About' }]}
      />

      <section className="section-padding">
        <div className="container max-w-7xl mx-auto px-4">
          <Tabs defaultValue="vision" className="space-y-8">
            <TabsList className="flex flex-wrap gap-1 h-auto p-1 bg-muted rounded-xl">
              <TabsTrigger value="vision" className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white">Our Vision</TabsTrigger>
              <TabsTrigger value="mission" className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white">Our Mission</TabsTrigger>
              <TabsTrigger value="values" className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white">Core Values</TabsTrigger>
              <TabsTrigger value="people" className="data-[state=active]:bg-saffron-500 data-[state=active]:text-white">Our People</TabsTrigger>
            </TabsList>

            <TabsContent value="vision">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-saffron-500" />
                    <span className="text-saffron-500 font-semibold font-body text-sm uppercase tracking-widest">Our Vision</span>
                  </div>
                  <h2 className="text-4xl font-bold font-display text-foreground mb-5 leading-tight">
                    An India Where Every Child Has a Chance
                  </h2>
                  <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                    We envision a nation where geography and socioeconomic background don't define destiny — where every child regardless of their village, caste, or income has access to quality education, healthcare, and opportunity.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Zero hunger in our communities of service',
                      'Universal basic healthcare access in rural AP',
                      'Digital literacy for 1 million youth by 2030',
                      'Economic independence for 10,000 women',
                    ].map((goal) => (
                      <li key={goal} className="flex items-start gap-2 text-foreground font-body">
                        <span className="w-2 h-2 rounded-full bg-saffron-500 mt-2 flex-shrink-0" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
                    alt="Children learning in a classroom"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mission">
              <div>
                <h2 className="text-3xl font-bold font-display text-foreground mb-8">Our Mission Pillars</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Healthcare for All', icon: Heart, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950', desc: 'Free medical camps, health screenings, maternal care, and mental health awareness programs reaching the most remote communities.' },
                    { title: 'Education Without Barriers', icon: Eye, color: 'text-forest-500', bg: 'bg-forest-50 dark:bg-forest-950', desc: 'Scholarships, tuition centers, digital labs, and career guidance for students from Class 1 through college — regardless of ability to pay.' },
                    { title: 'Economic Opportunity', icon: Lightbulb, color: 'text-saffron-500', bg: 'bg-saffron-50 dark:bg-saffron-950', desc: 'Skill training, microenterprise support, women\'s self-help groups, and job placement assistance for the working poor.' },
                  ].map((pillar) => (
                    <Card key={pillar.title} className="shadow-sm">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center mb-4`}>
                          <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                        </div>
                        <h3 className="font-bold font-display text-foreground text-lg mb-2">{pillar.title}</h3>
                        <p className="text-muted-foreground font-body text-sm leading-relaxed">{pillar.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="values">
              <div>
                <h2 className="text-3xl font-bold font-display text-foreground mb-8">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((v) => (
                    <Card key={v.title} className="shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6 flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-saffron-50 dark:bg-saffron-950 flex items-center justify-center flex-shrink-0">
                          <v.icon className="w-6 h-6 text-saffron-500" />
                        </div>
                        <div>
                          <h3 className="font-bold font-display text-foreground text-lg mb-2">{v.title}</h3>
                          <p className="text-muted-foreground font-body text-sm leading-relaxed">{v.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="people">
              <div className="space-y-10">
                {/* Founders */}
                <div>
                  <h2 className="text-3xl font-bold font-display text-foreground mb-6">Our Founders</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {founders.map((founder) => (
                      <Card key={founder.name} className="shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                          <Avatar className="w-20 h-20 mx-auto mb-4">
                            <AvatarFallback className={`text-2xl font-bold font-display ${founder.color}`}>
                              {founder.initials}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-bold font-display text-foreground text-lg">{founder.name}</h3>
                          <p className="text-saffron-500 text-sm font-medium font-body mb-3">{founder.role}</p>
                          <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">{founder.bio}</p>
                          <div className="flex flex-wrap justify-center gap-1.5">
                            {founder.tags.map((tag) => (
                              <Badge key={tag} variant="saffron" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Leadership */}
                <div>
                  <h2 className="text-2xl font-bold font-display text-foreground mb-6">Leadership Team</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {leadership.map((leader) => (
                      <Card key={leader.name} className="shadow-sm">
                        <CardContent className="p-4 text-center">
                          <Avatar className="w-14 h-14 mx-auto mb-3">
                            <AvatarFallback className="text-lg font-bold font-display bg-forest-100 dark:bg-forest-950 text-forest-600 dark:text-forest-400">
                              {leader.initials}
                            </AvatarFallback>
                          </Avatar>
                          <p className="font-semibold font-body text-foreground text-sm">{leader.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{leader.role}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section ref={ref as React.RefObject<HTMLElement>} className="section-padding bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          >
            <p className="text-saffron-500 font-semibold font-body text-sm uppercase tracking-widest mb-2">Our Journey</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">A Decade of Change</h2>
          </motion.div>
          <TimelineSection />
        </div>
      </section>
    </>
  )
}
