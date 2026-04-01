import { z } from 'zod'

export const volunteerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').toLowerCase(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  city: z.string().max(100).optional().default(''),
  state: z.string().max(100).optional().default(''),
  teamPreference: z.enum([
    'Feeding Hands', 'Life Saviours', 'Tech Saala',
    'Elite Queens', 'Visual Vibes', 'Guiding Lights',
  ]),
  whyJoin: z.string().min(20, 'Please describe why you want to join (min 20 chars)').max(2000),
  skills: z.array(z.string().max(50)).min(1, 'Select at least one skill').max(20),
  availability: z.enum(['Weekdays', 'Weekends', 'Both']),
})

export const volunteerStatusSchema = z.object({
  status: z.enum(['Pending', 'Approved', 'Rejected']),
})

export type VolunteerInput = z.infer<typeof volunteerSchema>
export type VolunteerStatusInput = z.infer<typeof volunteerStatusSchema>
