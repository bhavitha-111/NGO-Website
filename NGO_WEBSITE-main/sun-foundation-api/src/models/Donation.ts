import { Schema, model, Document, Types } from 'mongoose'

export interface IDonation extends Document {
  _id: Types.ObjectId
  donorName: string
  email: string
  phone: string
  pan: string
  amount: number
  currency: string
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
  status: 'Created' | 'Paid' | 'Failed'
  message: string
  createdAt: Date
  updatedAt: Date
}

const donationSchema = new Schema<IDonation>(
  {
    donorName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    pan: { type: String, default: '', uppercase: true, trim: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: 'INR' },
    razorpayOrderId: { type: String, default: '' },
    razorpayPaymentId: { type: String, default: '' },
    razorpaySignature: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Created', 'Paid', 'Failed'],
      default: 'Created',
    },
    message: { type: String, default: '' },
  },
  { timestamps: true }
)

donationSchema.index({ razorpayOrderId: 1 })
donationSchema.index({ status: 1 })
donationSchema.index({ email: 1 })
donationSchema.index({ createdAt: -1 })

export const Donation = model<IDonation>('Donation', donationSchema)
