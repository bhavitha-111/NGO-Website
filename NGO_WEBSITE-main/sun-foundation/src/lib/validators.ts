import { z } from "zod"

export const volunteerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  cityState: z.string().min(2, "Please enter your city/state"),
  team: z.enum(["feeding-hands", "life-saviours", "tech-saala", "elite-queens", "visual-vibes", "guiding-lights"]).refine(v => v !== undefined, "Please select a team"),
  whyJoin: z.string().min(50, "Please write at least 50 characters about why you want to join"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  availability: z.enum(["weekdays", "weekends", "both"]).refine(v => v !== undefined, "Please select your availability"),
})

export const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number").optional().or(z.literal("")),
  subject: z.enum(["general", "volunteer", "partnership", "donations", "media"]).refine(v => v !== undefined, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

export const donationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter a valid PAN number (e.g. ABCDE1234F)").optional().or(z.literal("")),
  message: z.string().optional(),
  amount: z.number().min(1, "Please enter a valid amount"),
})

export type VolunteerFormData = z.infer<typeof volunteerSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type DonationFormData = z.infer<typeof donationSchema>
