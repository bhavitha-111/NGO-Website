import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sun_auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("sun_auth_token")
      window.location.href = "/admin/login"
    }
    return Promise.reject(error)
  }
)

// Volunteer APIs
export const volunteerApi = {
  submit: (data: unknown) => api.post("/api/volunteers", data),
  getAll: (params?: unknown) => api.get("/api/volunteers", { params }),
  updateStatus: (id: string, status: string) => api.patch(`/api/volunteers/${id}`, { status }),
  exportCsv: () => api.get("/api/volunteers/export", { responseType: "blob" }),
}

// Contact APIs
export const contactApi = {
  submit: (data: unknown) => api.post("/api/contact", data),
}

// Donation APIs
export const donationApi = {
  create: (data: unknown) => api.post("/api/donations", data),
  verify: (paymentId: string, orderId: string, signature: string) =>
    api.post("/api/donations/verify", { paymentId, orderId, signature }),
  getAll: (params?: unknown) => api.get("/api/donations", { params }),
  exportCsv: () => api.get("/api/donations/export", { responseType: "blob" }),
}

// Blog APIs
export const blogApi = {
  getAll: (params?: unknown) => api.get("/api/blogs", { params }),
  getBySlug: (slug: string) => api.get(`/api/blogs/${slug}`),
  create: (data: unknown) => api.post("/api/blogs", data),
  update: (id: string, data: unknown) => api.put(`/api/blogs/${id}`, data),
  delete: (id: string) => api.delete(`/api/blogs/${id}`),
}

// Gallery APIs
export const galleryApi = {
  getAll: (params?: unknown) => api.get("/api/gallery", { params }),
  upload: (formData: FormData) =>
    api.post("/api/gallery", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  delete: (id: string) => api.delete(`/api/gallery/${id}`),
}

// Events APIs
export const eventsApi = {
  getAll: (params?: unknown) => api.get("/api/events", { params }),
  getById: (id: string) => api.get(`/api/events/${id}`),
  create: (data: unknown) => api.post("/api/events", data),
  update: (id: string, data: unknown) => api.put(`/api/events/${id}`, data),
  delete: (id: string) => api.delete(`/api/events/${id}`),
}

// Auth APIs
export const authApi = {
  login: (email: string, password: string) => api.post("/api/auth/login", { email, password }),
  logout: () => api.post("/api/auth/logout"),
  me: () => api.get("/api/auth/me"),
}

export default api
