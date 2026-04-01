import { Schema, model, Document } from 'mongoose'

export interface IVolunteer extends Document {
  fullName: string
  email: string
  phone: string
  city: string
  state: string
  teamPreference: 'Feeding Hands' | 'Life Saviours' | 'Tech Saala' | 'Elite Queens' | 'Visual Vibes' | 'Guiding Lights'
  whyJoin: string
  skills: string[]
  availability: 'Weekdays' | 'Weekends' | 'Both'
  status: 'Pending' | 'Approved' | 'Rejected'
  createdAt: Date
}

const volunteerSchema = new Schema<IVolunteer>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    teamPreference: {
      type: String,
      enum: ['Feeding Hands', 'Life Saviours', 'Tech Saala', 'Elite Queens', 'Visual Vibes', 'Guiding Lights'],
      required: true,
    },
    whyJoin: { type: String, required: true, trim: true },
    skills: { type: [String], default: [] },
    availability: {
      type: String,
      enum: ['Weekdays', 'Weekends', 'Both'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
)

volunteerSchema.index({ status: 1 })
volunteerSchema.index({ teamPreference: 1 })

export const Volunteer = model<IVolunteer>('Volunteer', volunteerSchema)
