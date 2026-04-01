import { Schema, model, Document } from 'mongoose'

export interface IContact extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: 'General Inquiry' | 'Volunteer Opportunities' | 'Partnership' | 'Donations' | 'Media & Press'
  message: string
  status: 'New' | 'Replied'
  repliedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const contactSchema = new Schema<IContact>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '', trim: true },
    subject: {
      type: String,
      enum: ['General Inquiry', 'Volunteer Opportunities', 'Partnership', 'Donations', 'Media & Press'],
      default: 'General Inquiry',
    },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['New', 'Replied'],
      default: 'New',
    },
    repliedAt: { type: Date },
  },
  { timestamps: true }
)

contactSchema.index({ status: 1 })
contactSchema.index({ createdAt: -1 })

export const Contact = model<IContact>('Contact', contactSchema)
