import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, DollarSign, FileText, Image, LogOut, Sun
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: Users, label: 'Volunteers', to: '/admin/volunteers' },
  { icon: DollarSign, label: 'Donations', to: '/admin/donations' },
  { icon: FileText, label: 'Blog', to: '/admin/blog' },
  { icon: Image, label: 'Gallery', to: '/admin/gallery' },
]

export default function AdminLayout() {
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground/95 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-saffron-gradient flex items-center justify-center">
              <Sun className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold font-display text-sm">SUN Foundation</p>
              <p className="text-white/40 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => cn(
                'flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium font-body transition-colors',
                isActive
                  ? 'bg-saffron-500 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="mb-3 px-2">
            <p className="text-xs text-white/40">Signed in as</p>
            <p className="text-sm text-white font-medium truncate">{user?.email || 'admin@sun.org'}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-white/60 hover:text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
