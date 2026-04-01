import { z } from 'zod'

const BLOG_CATEGORIES = ['Education', 'Healthcare', 'Women Empowerment', 'Tech', 'Food', 'Events', 'General'] as const

export const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  excerpt: z.string().max(500).optional().default(''),
  content: z.string().optional().default(''),
  featuredImage: z.string().optional().default(''),
  category: z.enum(BLOG_CATEGORIES).default('General'),
  tags: z.array(z.string().max(30)).max(10).optional().default([]),
  author: z.string().max(100).optional().default('SUN Foundation Team'),
  status: z.enum(['Draft', 'Published']).optional().default('Draft'),
})

export const blogUpdateSchema = blogSchema.partial()

export type BlogInput = z.infer<typeof blogSchema>
export type BlogUpdateInput = z.infer<typeof blogUpdateSchema>
