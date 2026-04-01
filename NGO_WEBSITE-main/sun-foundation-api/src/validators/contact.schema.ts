import { z } from 'zod'

const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Volunteer Opportunities',
  'Partnership',
  'Donations',
  'Media & Press',
] as const

export const contactSchema = z.object({
  firstName: z.string().min(2, 'First name required').max(50).trim(),
  lastName: z.string().min(2, 'Last name required').max(50).trim(),
  email: z.string().email('Invalid email address').toLowerCase(),
  phone: z.string().max(20).optional().default(''),
  subject: z.enum(CONTACT_SUBJECTS).default('General Inquiry'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000).trim(),
})

export type ContactInput = z.infer<typeof contactSchema>
