import { Users, DollarSign, FileText, Image, TrendingUp, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stats = [
  { label: 'Total Volunteers', value: '342', change: '+24 this month', icon: Users, color: 'text-saffron-500', bg: 'bg-saffron-50 dark:bg-saffron-950' },
  { label: 'Total Donations', value: '₹4.2L', change: '+₹28K this month', icon: DollarSign, color: 'text-forest-500', bg: 'bg-forest-50 dark:bg-forest-950' },
  { label: 'Blog Posts', value: '24', change: '2 drafts', icon: FileText, color: 'text-golden', bg: 'bg-amber-50 dark:bg-amber-950' },
  { label: 'Gallery Images', value: '128', change: '12 new', icon: Image, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950' },
]

const recentVolunteers = [
  { name: 'Aisha Rahman', team: 'Elite Queens', city: 'Vijayawada', status: 'pending', date: 'Apr 1, 2026' },
  { name: 'Ravi Shankar', team: 'Tech Saala', city: 'Guntur', status: 'approved', date: 'Mar 30, 2026' },
  { name: 'Sunita Devi', team: 'Life Saviours', city: 'Nellore', status: 'pending', date: 'Mar 29, 2026' },
  { name: 'Karthik Rao', team: 'Guiding Lights', city: 'Vijayawada', status: 'approved', date: 'Mar 28, 2026' },
]

const recentDonations = [
  { name: 'Anonymous', amount: '₹5,000', status: 'completed', date: 'Apr 1, 2026' },
  { name: 'Priya Menon', amount: '₹1,000', status: 'completed', date: 'Mar 31, 2026' },
  { name: 'Ramesh T.', amount: '₹500', status: 'completed', date: 'Mar 30, 2026' },
  { name: 'Corporate XYZ', amount: '₹50,000', status: 'completed', date: 'Mar 29, 2026' },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm font-body">Welcome back! Here's what's happening at SUN Foundation.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
                  <p className="text-2xl font-bold font-display text-foreground mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-forest-500" />
                    <span className="text-xs text-forest-500 font-body">{stat.change}</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent volunteers */}
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold font-display text-foreground">Recent Volunteers</h2>
              <Badge variant="saffron" className="text-xs">{recentVolunteers.filter(v => v.status === 'pending').length} pending</Badge>
            </div>
            <div className="space-y-3">
              {recentVolunteers.map((v) => (
                <div key={v.name + v.date} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-saffron-100 dark:bg-saffron-950 flex items-center justify-center text-saffron-600 dark:text-saffron-400 text-xs font-bold">
                      {v.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium font-body text-foreground">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.team} • {v.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={v.status === 'approved' ? 'forest' : 'saffron'} className="text-xs">{v.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{v.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent donations */}
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold font-display text-foreground">Recent Donations</h2>
              <div className="flex items-center gap-1 text-xs text-forest-500 font-body">
                <Heart className="w-3.5 h-3.5 fill-current" /> 4 today
              </div>
            </div>
            <div className="space-y-3">
              {recentDonations.map((d) => (
                <div key={d.name + d.date} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium font-body text-foreground">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-saffron-500 font-body">{d.amount}</p>
                    <Badge variant="forest" className="text-xs">{d.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
