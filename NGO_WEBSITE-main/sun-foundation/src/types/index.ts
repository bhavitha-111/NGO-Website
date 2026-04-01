export interface Volunteer {
  id: string
  fullName: string
  email: string
  phone: string
  cityState: string
  team: string
  whyJoin: string
  skills: string[]
  availability: "weekdays" | "weekends" | "both"
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export interface Donation {
  id: string
  name: string
  email: string
  phone: string
  pan?: string
  amount: number
  message?: string
  paymentId: string
  status: "pending" | "completed" | "failed"
  createdAt: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar?: string
    role: string
  }
  publishedAt: string
  readTime: number
  status: "draft" | "published"
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image?: string
  registrationLink?: string
  status: "upcoming" | "past"
  attendees?: number
}

export interface GalleryImage {
  id: string
  url: string
  caption: string
  category: string
  createdAt: string
}

export interface Team {
  id: string
  name: string
  description: string
  specialty: string[]
  memberCount: number
  image: string
  impact: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
  avatar?: string
}
