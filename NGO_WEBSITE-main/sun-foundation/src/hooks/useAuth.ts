import { useAuthStore } from "@/store/authStore"
import { authApi } from "@/services/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function useAuth() {
  const { token, user, isAuthenticated, setAuth, logout: storeLogout } = useAuthStore()
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password)
      const { token: newToken, user: newUser } = response.data
      setAuth(newToken, newUser)
      toast.success("Logged in successfully")
      navigate("/admin/dashboard")
    } catch {
      toast.error("Invalid credentials. Please try again.")
      throw new Error("Login failed")
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch {
      // Silent fail
    } finally {
      storeLogout()
      navigate("/admin/login")
      toast.success("Logged out successfully")
    }
  }

  return { token, user, isAuthenticated, login, logout }
}
