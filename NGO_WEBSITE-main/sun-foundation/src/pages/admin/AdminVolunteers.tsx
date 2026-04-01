import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Download, Search, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { volunteerApi } from '@/services/api'

interface Volunteer {
  _id: string
  fullName: string
  email: string
  phone: string
  teamPreference: string
  city: string
  state: string
  status: 'Pending' | 'Approved' | 'Rejected'
  createdAt: string
}

export default function AdminVolunteers() {
  const [search, setSearch] = useState('')
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)

  const fetchVolunteers = async () => {
    try {
      setLoading(true)
      const res = await volunteerApi.getAll()
      setVolunteers(res.data?.data?.volunteers ?? res.data?.data ?? [])
    } catch {
      toast.error('Failed to load volunteers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchVolunteers() }, [])

  const filtered = volunteers.filter(v =>
    v.fullName.toLowerCase().includes(search.toLowerCase()) ||
    v.email.toLowerCase().includes(search.toLowerCase()) ||
    v.teamPreference.toLowerCase().includes(search.toLowerCase())
  )

  const updateStatus = async (id: string, status: string) => {
    try {
      await volunteerApi.updateStatus(id, status)
      setVolunteers(prev => prev.map(v => v._id === id ? { ...v, status: status as Volunteer['status'] } : v))
      toast.success(`Volunteer ${status.toLowerCase()}`)
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleExport = async () => {
    try {
      const res = await volunteerApi.exportCsv()
      const url = URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url; a.download = 'volunteers.csv'; a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error('Export failed')
    }
  }

  const badgeVariant = (status: string) => {
    if (status === 'Approved') return 'forest' as const
    if (status === 'Rejected') return 'destructive' as const
    return 'saffron' as const
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Volunteers</h1>
          <p className="text-muted-foreground text-sm font-body">
            {volunteers.filter(v => v.status === 'Pending').length} pending approval
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 self-start" onClick={handleExport}>
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search by name, email, team..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading volunteers...
            </div>
          ) : (
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-semibold text-foreground">Name</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">Phone</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">Team</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">City</th>
                  <th className="text-left p-4 font-semibold text-foreground">Date</th>
                  <th className="text-left p-4 font-semibold text-foreground">Status</th>
                  <th className="text-left p-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v._id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{v.fullName}</p>
                      <p className="text-xs text-muted-foreground">{v.email}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{v.phone}</td>
                    <td className="p-4 hidden lg:table-cell">
                      <Badge variant="saffron" className="text-xs">{v.teamPreference}</Badge>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground">{[v.city, v.state].filter(Boolean).join(', ') || '—'}</td>
                    <td className="p-4 text-muted-foreground text-xs">{new Date(v.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="p-4">
                      <Badge variant={badgeVariant(v.status)} className="text-xs">{v.status}</Badge>
                    </td>
                    <td className="p-4">
                      {v.status === 'Pending' && (
                        <div className="flex gap-1">
                          <button onClick={() => updateStatus(v._id, 'Approved')} className="p-1.5 rounded-md text-forest-500 hover:bg-forest-50 dark:hover:bg-forest-950 transition-colors" aria-label="Approve">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => updateStatus(v._id, 'Rejected')} className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors" aria-label="Reject">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {v.status !== 'Pending' && (
                        <button onClick={() => updateStatus(v._id, 'Pending')} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-10 text-muted-foreground font-body">No volunteers found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
