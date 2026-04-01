import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navigate } from 'react-router-dom'
import { Sun, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/services/api'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginData = z.infer<typeof loginSchema>

export default function AdminLogin() {
  const [showPass, setShowPass] = useState(false)
  const { isAuthenticated, setAuth } = useAuthStore()

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await authApi.login(data.email, data.password)
      const { token, admin } = res.data.data
      setAuth(token, { name: admin.username, email: admin.email, role: 'admin' })
      toast.success('Logged in successfully')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast.error(msg || 'Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-foreground/95 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-saffron-gradient flex items-center justify-center mx-auto mb-3">
            <Sun className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-display text-white">SUN Foundation</h1>
          <p className="text-white/50 text-sm font-body mt-1">Admin Dashboard</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-bold font-display text-lg mb-5">Sign In</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="admin@sun.org"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-saffron-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )} />

              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPass ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-saffron-500 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )} />

              <Button
                type="submit"
                variant="saffron"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>
          <p className="text-center text-xs text-white/30 mt-4 font-body">
            Use your admin credentials to sign in
          </p>
        </div>
      </div>
    </div>
  )
}
