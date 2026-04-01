import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle2, Download, Info, Heart, Shield } from 'lucide-react'
import { toast } from 'sonner'
import PageHero from '@/components/shared/PageHero'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { donationSchema, type DonationFormData } from '@/lib/validators'
import { useDonationStore } from '@/store/donationStore'

const presetAmounts = [100, 500, 1000, 5000]

const impactGuide = [
  { amount: 100, impact: 'Feeds 1 family for a day' },
  { amount: 500, impact: 'Sponsors a student for 1 month' },
  { amount: 1000, impact: 'Provides medicines for 10 patients' },
  { amount: 5000, impact: 'Runs a tech workshop for 20 students' },
]

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void }
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function Donate() {
  const { amount, setAmount } = useDonationStore()
  const [customAmount, setCustomAmount] = useState('')
  const [successOpen, setSuccessOpen] = useState(false)
  const [receiptData, setReceiptData] = useState<{ id: string; amount: number; date: string } | null>(null)

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: { name: '', email: '', phone: '', pan: '', message: '', amount },
  })

  const handlePresetAmount = (val: number) => {
    setAmount(val)
    setCustomAmount('')
    form.setValue('amount', val)
  }

  const handleCustomAmount = (val: string) => {
    setCustomAmount(val)
    const num = parseInt(val)
    if (!isNaN(num) && num > 0) {
      setAmount(num)
      form.setValue('amount', num)
    }
  }

  const onSubmit = async (data: DonationFormData) => {
    const loaded = await loadRazorpay()
    if (!loaded) {
      toast.error('Payment gateway could not be loaded. Please try again.')
      return
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      amount: data.amount * 100,
      currency: 'INR',
      name: 'SUN Foundation',
      description: 'Empowering Communities, Transforming Lives',
      image: '/favicon.svg',
      prefill: { name: data.name, email: data.email, contact: data.phone },
      notes: { pan: data.pan, message: data.message },
      theme: { color: '#E8530A' },
      handler: (response: { razorpay_payment_id: string }) => {
        setReceiptData({
          id: response.razorpay_payment_id,
          amount: data.amount,
          date: new Date().toLocaleDateString('en-IN'),
        })
        setSuccessOpen(true)
        form.reset()
        toast.success('Donation successful! Thank you for your generosity.')
      },
    }

    try {
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch {
      toast.error('Payment initialization failed. Please try again.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Donate — SUN Foundation</title>
        <meta name="description" content="Support SUN Foundation's mission with a donation. Your contribution is eligible for 80G tax exemption under Indian law." />
      </Helmet>

      <PageHero
        title="Make a Donation"
        subtitle="Every rupee you give directly reaches communities that need it most. Zero overhead on your donation."
        breadcrumbs={[{ label: 'Home', to: '/home' }, { label: 'Donate' }]}
      />

      <section className="section-padding">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

            {/* Main Donation Form */}
            <div className="space-y-6">
              {/* Amount selector */}
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h2 className="font-bold font-display text-foreground text-xl mb-5">Choose Amount</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {presetAmounts.map((val) => (
                      <button
                        key={val}
                        onClick={() => handlePresetAmount(val)}
                        className={`py-3 rounded-lg text-base font-bold font-body border-2 transition-all ${
                          amount === val && !customAmount
                            ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950 text-saffron-600 dark:text-saffron-400'
                            : 'border-border hover:border-saffron-400 text-foreground'
                        }`}
                      >
                        ₹{val.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-body">₹</span>
                    <Input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                      className="pl-7"
                    />
                  </div>

                  {/* Impact guide */}
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    {impactGuide.map(({ amount: val, impact }) => (
                      <div
                        key={val}
                        className={`flex items-center justify-between py-1.5 text-sm font-body transition-colors ${
                          amount === val ? 'text-saffron-600 dark:text-saffron-400 font-semibold' : 'text-muted-foreground'
                        }`}
                      >
                        <span>₹{val.toLocaleString('en-IN')}</span>
                        <span className="flex items-center gap-1">
                          {amount === val && <Heart className="w-3.5 h-3.5 fill-current" />}
                          {impact}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Donor form */}
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h2 className="font-bold font-display text-foreground text-xl mb-5">Your Details</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl><Input placeholder="As per your ID" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl><Input type="email" placeholder="For receipt" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl><Input type="tel" placeholder="10-digit mobile" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="pan" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1.5">
                              PAN Number
                              <span className="text-xs bg-forest-100 dark:bg-forest-950 text-forest-600 dark:text-forest-400 px-1.5 py-0.5 rounded-full">80G Exempt</span>
                            </FormLabel>
                            <FormControl><Input placeholder="ABCDE1234F (optional)" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="A message for our team..." className="min-h-[80px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="pt-2">
                        <Button
                          type="submit"
                          variant="saffron"
                          size="lg"
                          className="w-full gap-2"
                          disabled={form.formState.isSubmitting}
                        >
                          <Heart className="w-4 h-4" />
                          Donate ₹{amount.toLocaleString('en-IN')} Now
                        </Button>
                        <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-forest-500" />
                          Secured by Razorpay. 256-bit SSL encryption.
                        </p>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Alternative payment */}
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold font-display text-foreground mb-4">Other Ways to Donate</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-semibold font-body text-foreground mb-2">UPI / QR Code</p>
                      <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-xs">
                        QR Code
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 font-body">
                        UPI ID: <span className="text-foreground font-mono">sun@okaxis</span>
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-semibold font-body text-foreground mb-2">Bank Transfer / NEFT</p>
                      <div className="space-y-1 text-sm font-body">
                        <p><span className="text-muted-foreground">Bank:</span> <span className="text-foreground">State Bank of India</span></p>
                        <p><span className="text-muted-foreground">A/C Name:</span> <span className="text-foreground">SUN Foundation Trust</span></p>
                        <p><span className="text-muted-foreground">A/C No:</span> <span className="text-foreground font-mono">4001234567890</span></p>
                        <p><span className="text-muted-foreground">IFSC:</span> <span className="text-foreground font-mono">SBIN0001234</span></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Tax benefit */}
              <Card className="border-forest-200 dark:border-forest-800 bg-forest-50 dark:bg-forest-950/50 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-forest-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold font-display text-foreground mb-2">80G Tax Exemption</h3>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
                        Your donation is eligible for 50% tax deduction under Section 80G of the Income Tax Act, 1961.
                      </p>
                      <p className="text-xs text-muted-foreground font-body">
                        Provide your PAN to receive an 80G certificate via email within 7 working days.
                      </p>
                      <Button variant="outline" size="sm" className="mt-3 gap-1.5 w-full">
                        <Download className="w-3.5 h-3.5" /> Sample Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust indicators */}
              <Card className="shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-bold font-display text-foreground mb-4">Why Trust Us</h3>
                  <div className="space-y-3">
                    {[
                      { icon: '✅', text: 'Registered NGO under Indian Trust Act' },
                      { icon: '📊', text: 'Annual audited financial reports published' },
                      { icon: '📸', text: 'Photo & video impact reports for all programs' },
                      { icon: '⭐', text: '10 years of consistent community service' },
                      { icon: '🔒', text: 'Zero-overhead donation policy' },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-start gap-2 text-sm font-body text-foreground">
                        <span>{icon}</span>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent donors */}
              <Card className="shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-bold font-display text-foreground mb-4">Recent Supporters</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Anonymous', amount: '₹5,000', time: '2 hours ago' },
                      { name: 'Ravi M.', amount: '₹1,000', time: '5 hours ago' },
                      { name: 'Priya S.', amount: '₹500', time: '1 day ago' },
                    ].map((donor) => (
                      <div key={donor.name + donor.time} className="flex items-center justify-between text-sm font-body">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-saffron-100 dark:bg-saffron-950 flex items-center justify-center text-saffron-600 dark:text-saffron-400">
                            <Heart className="w-3.5 h-3.5 fill-current" />
                          </div>
                          <div>
                            <p className="text-foreground font-medium">{donor.name}</p>
                            <p className="text-xs text-muted-foreground">{donor.time}</p>
                          </div>
                        </div>
                        <Badge variant="saffron" className="text-xs">{donor.amount}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-forest-500" />
            </div>
            <DialogTitle className="text-2xl font-bold font-display text-center">Donation Successful!</DialogTitle>
            <DialogDescription className="text-center font-body mt-2">
              Thank you for your generosity. Your donation will directly impact lives.
            </DialogDescription>
          </DialogHeader>
          {receiptData && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm font-body">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment ID</span>
                <span className="font-mono text-foreground">{receiptData.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-saffron-500">₹{receiptData.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">{receiptData.date}</span>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-1.5">
              <Download className="w-4 h-4" /> Receipt
            </Button>
            <Button variant="saffron" className="flex-1" onClick={() => setSuccessOpen(false)}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
