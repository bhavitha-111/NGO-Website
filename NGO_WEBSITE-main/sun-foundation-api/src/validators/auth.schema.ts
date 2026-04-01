import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const eventSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional().default(''),
  date: z.string().refine(val => !isNaN(Date.parse(val)), 'Invalid date format'),
  time: z.string().max(50).optional().default(''),
  location: z.string().max(200).optional().default(''),
  type: z.enum(['Upcoming', 'Past']).default('Upcoming'),
  image: z.string().url().optional().or(z.literal('')).default(''),
  registrationLink: z.string().url().optional().or(z.literal('')).default(''),
})

export const eventUpdateSchema = eventSchema.partial()

export type LoginInput = z.infer<typeof loginSchema>
export type EventInput = z.infer<typeof eventSchema>
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>
