import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Works from '@/pages/Works'
import Volunteer from '@/pages/Volunteer'
import Events from '@/pages/Events'
import Gallery from '@/pages/Gallery'
import Blog from '@/pages/Blog'
import BlogDetail from '@/pages/BlogDetail'
import Donate from '@/pages/Donate'
import Contact from '@/pages/Contact'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminVolunteers from '@/pages/admin/AdminVolunteers'
import AdminDonations from '@/pages/admin/AdminDonations'
import AdminBlog from '@/pages/admin/AdminBlog'
import AdminGallery from '@/pages/admin/AdminGallery'
import PrivateRoute from '@/components/shared/PrivateRoute'
import AdminLayout from '@/components/layout/AdminLayout'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('sun-theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('sun-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Works />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/volunteers" element={<AdminVolunteers />} />
          <Route path="/admin/donations" element={<AdminDonations />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
