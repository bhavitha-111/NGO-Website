import { z } from 'zod'

export const createOrderSchema = z.object({
  amount: z.number({ message: 'Amount must be a number' }).int('Amount must be an integer').min(1, 'Amount must be at least ₹1'),
  donorName: z.string().min(2).max(100),
  email: z.string().email('Invalid email').toLowerCase(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number').optional().default(''),
  pan: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (e.g. ABCDE1234F)')
    .optional()
    .or(z.literal(''))
    .default(''),
  message: z.string().max(500).optional().default(''),
})

export const verifyPaymentSchema = z.object({
  razorpayOrderId: z.string().min(1, 'Order ID required'),
  razorpayPaymentId: z.string().min(1, 'Payment ID required'),
  razorpaySignature: z.string().min(1, 'Signature required'),
  donorName: z.string().min(2),
  email: z.string().email().toLowerCase(),
  pan: z.string().optional().default(''),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>
