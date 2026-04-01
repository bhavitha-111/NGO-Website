import { useState, useEffect } from 'react'
import { Download, Search, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { donationApi } from '@/services/api'

interface Donation {
  _id: string
  donorName: string
  email: string
  phone: string
  amount: number
  pan: string
  razorpayPaymentId: string
  status: 'Created' | 'Paid' | 'Failed'
  createdAt: string
}

export default function AdminDonations() {
  const [search, setSearch] = useState('')
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const res = await donationApi.getAll()
        setDonations(res.data?.data?.donations ?? res.data?.data ?? [])
      } catch {
        toast.error('Failed to load donations')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const filtered = donations.filter(d =>
    d.donorName.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    (d.razorpayPaymentId ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const total = filtered.reduce((sum, d) => sum + d.amount, 0)

  const handleExport = async () => {
    try {
      const res = await donationApi.exportCsv()
      const url = URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url; a.download = 'donations.csv'; a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error('Export failed')
    }
  }

  const statusVariant = (status: string) => {
    if (status === 'Paid') return 'forest' as const
    if (status === 'Failed') return 'destructive' as const
    return 'saffron' as const
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Donations</h1>
          <p className="text-muted-foreground text-sm font-body">
            Total shown: <span className="text-saffron-500 font-bold">₹{total.toLocaleString('en-IN')}</span>
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 self-start" onClick={handleExport}>
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search by name, email, payment ID..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading donations...
            </div>
          ) : (
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-semibold text-foreground">Donor</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">Payment ID</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">PAN</th>
                  <th className="text-left p-4 font-semibold text-foreground">Amount</th>
                  <th className="text-left p-4 font-semibold text-foreground">Date</th>
                  <th className="text-left p-4 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d._id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{d.donorName}</p>
                      <p className="text-xs text-muted-foreground">{d.email}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{d.razorpayPaymentId || '—'}</code>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground text-xs">
                      {d.pan || <span className="italic">Not provided</span>}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-saffron-500">₹{d.amount.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs">{new Date(d.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="p-4">
                      <Badge variant={statusVariant(d.status)} className="text-xs">{d.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-10 text-muted-foreground font-body">No donations found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
