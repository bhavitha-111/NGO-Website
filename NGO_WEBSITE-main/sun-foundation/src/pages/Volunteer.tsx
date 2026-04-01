import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import PageHero from '@/components/shared/PageHero'
import { volunteerApi } from '@/services/api'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { volunteerSchema, type VolunteerFormData } from '@/lib/validators'

const benefits = [
  { title: 'Make Real Impact', desc: 'Directly change lives in communities that need it most.', icon: '🌟' },
  { title: 'Build Networks', desc: 'Connect with like-minded changemakers across India.', icon: '🤝' },
  { title: 'Develop Skills', desc: 'Gain leadership, communication, and project management skills.', icon: '📈' },
  { title: 'Get Recognized', desc: 'Receive certificates, awards, and letters of recommendation.', icon: '🏆' },
]

const skillOptions = [
  'Teaching', 'Healthcare', 'Photography', 'Video Editing', 'Coding',
  'Social Media', 'Event Management', 'Fundraising', 'Design',
  'Counseling', 'Cooking', 'Driving', 'Translation', 'Writing',
]

const volunteerStories = [
  {
    name: 'Divya Rajan',
    role: 'Tech Saala Volunteer, 3 Years',
    story: 'I joined Tech Saala as a fresher looking to give back. Teaching coding to kids who\'d never touched a computer — watching their eyes light up — it transformed me more than it transformed them.',
    initials: 'DR',
  },
  {
    name: 'Mohammed Shafi',
    role: 'Life Saviours Volunteer, 2 Years',
    story: 'As a medical student, volunteering with Life Saviours gave me real-world experience that no classroom could. I learned empathy, urgency, and the true meaning of healthcare.',
    initials: 'MS',
  },
  {
    name: 'Anjali Rao',
    role: 'Elite Queens Volunteer, 4 Years',
    story: 'SUN Foundation\'s sisterhood in Elite Queens is unlike anything else. We empowered 300 women last year alone. The women we trained now train others — the ripple effect is real.',
    initials: 'AR',
  },
]

export default function Volunteer() {
  const [successOpen, setSuccessOpen] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const form = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      cityState: '',
      whyJoin: '',
      skills: [],
      availability: 'weekends',
    },
  })

  const toggleSkill = (skill: string) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill]
    setSelectedSkills(updated)
    form.setValue('skills', updated)
  }

  // Map frontend kebab-case teams to backend full names
  const teamMap: Record<string, string> = {
    'feeding-hands':  'Feeding Hands',
    'life-saviours':  'Life Saviours',
    'tech-saala':     'Tech Saala',
    'elite-queens':   'Elite Queens',
    'visual-vibes':   'Visual Vibes',
    'guiding-lights': 'Guiding Lights',
  }

  const availabilityMap: Record<string, string> = {
    weekdays: 'Weekdays',
    weekends: 'Weekends',
    both:     'Both',
  }

  const onSubmit = async (data: VolunteerFormData) => {
    try {
      const [city = '', state = ''] = (data.cityState ?? '').split(',').map(s => s.trim())
      await volunteerApi.submit({
        fullName:        data.fullName,
        email:           data.email,
        phone:           data.phone,
        city,
        state,
        teamPreference:  teamMap[data.team] ?? data.team,
        whyJoin:         data.whyJoin,
        skills:          data.skills,
        availability:    availabilityMap[data.availability] ?? data.availability,
      })
      setSuccessOpen(true)
      form.reset()
      setSelectedSkills([])
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Volunteer — SUN Foundation</title>
        <meta name="description" content="Join SUN Foundation as a volunteer and be part of transforming lives across India. Apply today." />
      </Helmet>

      <PageHero
        title="Volunteer With Us"
        subtitle="Your time, skills, and energy can transform lives. Join 500+ volunteers making real impact."
        breadcrumbs={[{ label: 'Home', to: '/home' }, { label: 'Volunteer' }]}
      />

      {/* Benefits */}
      <section className="section-padding bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-saffron-500 font-semibold font-body text-sm uppercase tracking-widest mb-2">Why Volunteer?</p>
            <h2 className="text-4xl font-bold font-display text-foreground">What You Gain</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center shadow-sm hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{b.icon}</div>
                    <h3 className="font-bold font-display text-foreground mb-2">{b.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{b.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-muted/20">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-saffron-500 font-semibold font-body text-sm uppercase tracking-widest mb-2">Join Us</p>
            <h2 className="text-4xl font-bold font-display text-foreground">Volunteer Application</h2>
            <p className="text-muted-foreground mt-2 font-body">Fill in your details and we'll contact you within 3 business days.</p>
          </div>

          <Card className="shadow-md">
            <CardContent className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl><Input type="tel" placeholder="10-digit mobile number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="cityState" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City / State *</FormLabel>
                        <FormControl><Input placeholder="e.g., Vijayawada, AP" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="team" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Which Team Would You Like to Join? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a team" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="feeding-hands">🍽️ Feeding Hands</SelectItem>
                          <SelectItem value="life-saviours">❤️ Life Saviours</SelectItem>
                          <SelectItem value="tech-saala">💻 Tech Saala</SelectItem>
                          <SelectItem value="elite-queens">👑 Elite Queens</SelectItem>
                          <SelectItem value="visual-vibes">📷 Visual Vibes</SelectItem>
                          <SelectItem value="guiding-lights">🌟 Guiding Lights</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="whyJoin" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why Do You Want to Join? *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your motivation (minimum 50 characters)..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Skills multi-select */}
                  <FormField control={form.control} name="skills" render={() => (
                    <FormItem>
                      <FormLabel>Your Skills *</FormLabel>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {skillOptions.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1 rounded-full text-sm font-body transition-all border ${
                              selectedSkills.includes(skill)
                                ? 'bg-saffron-500 text-white border-saffron-500'
                                : 'bg-background text-foreground border-border hover:border-saffron-400'
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="availability" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability *</FormLabel>
                      <div className="flex gap-3">
                        {[
                          { value: 'weekdays', label: 'Weekdays' },
                          { value: 'weekends', label: 'Weekends' },
                          { value: 'both', label: 'Both' },
                        ].map((opt) => (
                          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              value={opt.value}
                              checked={field.value === opt.value}
                              onChange={() => field.onChange(opt.value)}
                              className="accent-saffron-500"
                            />
                            <span className="text-sm font-body text-foreground">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button
                    type="submit"
                    variant="saffron"
                    size="lg"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Volunteer Application'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Volunteer Stories */}
      <section className="section-padding bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-saffron-500 font-semibold font-body text-sm uppercase tracking-widest mb-2">From Our Volunteers</p>
            <h2 className="text-4xl font-bold font-display text-foreground">Their Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {volunteerStories.map((story) => (
              <Card key={story.name} className="shadow-sm">
                <CardContent className="p-6">
                  <p className="text-foreground/80 font-body text-sm leading-relaxed italic mb-5">
                    "{story.story}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-10 h-10 rounded-full bg-forest-100 dark:bg-forest-950 flex items-center justify-center font-bold font-display text-forest-600 dark:text-forest-400">
                      {story.initials}
                    </div>
                    <div>
                      <p className="font-semibold font-body text-foreground text-sm">{story.name}</p>
                      <p className="text-xs text-muted-foreground">{story.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-forest-500" />
            </div>
            <DialogTitle className="text-2xl font-bold font-display">Application Received!</DialogTitle>
            <DialogDescription className="text-base font-body mt-2">
              Thank you for wanting to make a difference! Our team will review your application and contact you within 3 business days.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-2">
            <Badge variant="forest" className="mx-auto text-sm px-4 py-1">
              You're one step closer to changing lives 🌟
            </Badge>
            <Button variant="saffron" className="w-full mt-3" onClick={() => setSuccessOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
