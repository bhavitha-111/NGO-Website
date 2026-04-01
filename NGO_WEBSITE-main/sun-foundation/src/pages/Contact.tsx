import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { toast } from 'sonner'
import PageHero from '@/components/shared/PageHero'
import { contactApi } from '@/services/api'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { contactSchema, type ContactFormData } from '@/lib/validators'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Headquarters',
    lines: ['123 Gandhi Road', 'Vijayawada, AP 520001', 'Andhra Pradesh, India'],
    color: 'text-saffron-500',
    bg: 'bg-saffron-50 dark:bg-saffron-950',
  },
  {
    icon: MapPin,
    title: 'Field Office',
    lines: ['Rural Development Center', 'Guntur District, AP', 'Andhra Pradesh, India'],
    color: 'text-forest-500',
    bg: 'bg-forest-50 dark:bg-forest-950',
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+91 94948 08589', 'Mon–Fri, 9AM–6PM'],
    color: 'text-saffron-500',
    bg: 'bg-saffron-50 dark:bg-saffron-950',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['studentunionfornation@gmail.com', 'We reply within 24 hours'],
    color: 'text-forest-500',
    bg: 'bg-forest-50 dark:bg-forest-950',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Mon–Fri: 9:00 AM – 6:00 PM', 'Saturday: 10:00 AM – 4:00 PM', 'Sunday: Closed'],
    color: 'text-golden',
    bg: 'bg-amber-50 dark:bg-amber-950',
  },
]

export default function Contact() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '', lastName: '', email: '', phone: '', message: '',
    },
  })

  // Map frontend enum values to backend expected values
  const subjectMap: Record<string, string> = {
    general: 'General Inquiry',
    volunteer: 'Volunteer Opportunities',
    partnership: 'Partnership',
    donations: 'Donations',
    media: 'Media & Press',
  }

  const onSubmit = async (data: ContactFormData) => {
    try {
      await contactApi.submit({
        ...data,
        subject: subjectMap[data.subject] ?? data.subject,
      })
      toast.success('Message sent! We\'ll get back to you within 24 hours.', {
        description: `Thank you, ${data.firstName}. Our team will reach out soon.`,
      })
      form.reset()
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us — SUN Foundation</title>
        <meta name="description" content="Get in touch with SUN Foundation for volunteering, partnerships, donations, or media enquiries. Based in Vijayawada, Andhra Pradesh." />
      </Helmet>

      <PageHero
        title="Contact Us"
        subtitle="Have a question, want to partner, or just want to say hello? We'd love to hear from you."
        breadcrumbs={[{ label: 'Home', to: '/home' }, { label: 'Contact' }]}
      />

      <section className="section-padding">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-md">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold font-display text-foreground mb-6">Send Us a Message</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl><Input placeholder="Ramesh" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl><Input placeholder="Patel" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl><Input type="tel" placeholder="Optional" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="subject" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="What's this about?" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="volunteer">Volunteering</SelectItem>
                              <SelectItem value="partnership">Partnership / CSR</SelectItem>
                              <SelectItem value="donations">Donations</SelectItem>
                              <SelectItem value="media">Media & Press</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us how we can help..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
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
                        {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info + Map */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {contactInfo.map((info) => (
                <Card key={info.title} className="shadow-sm">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${info.bg} flex items-center justify-center flex-shrink-0`}>
                      <info.icon className={`w-5 h-5 ${info.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold font-body text-foreground text-sm">{info.title}</p>
                      {info.lines.map((line) => (
                        <p key={line} className="text-sm text-muted-foreground font-body">{line}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Map embed */}
              <Card className="shadow-sm overflow-hidden">
                <div className="w-full h-64">
                  <iframe
                    title="SUN Foundation Location - Vijayawada, AP"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61426.35!2d80.6199!3d16.5061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35eff9478f9c75%3A0xbfb4a2a64effa3ad!2sVijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1!"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card>

              {/* Social quick links */}
              <Card className="shadow-sm bg-saffron-50 dark:bg-saffron-950/30 border-saffron-100 dark:border-saffron-900">
                <CardContent className="p-4">
                  <p className="font-semibold font-body text-foreground text-sm mb-3">Follow Our Work</p>
                  <div className="flex gap-3">
                    {[
                      { label: 'Instagram', href: 'https://instagram.com/student_union_for_nation', icon: '📸' },
                      { label: 'Facebook', href: 'https://facebook.com', icon: '👍' },
                      { label: 'WhatsApp', href: 'https://wa.me/919494808589', icon: '💬' },
                    ].map(({ label, href, icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-body text-foreground hover:text-saffron-500 transition-colors"
                      >
                        {icon} {label}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
