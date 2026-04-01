import { Schema, model, Document } from 'mongoose'

export interface IEvent extends Document {
  title: string
  description: string
  date: Date
  time: string
  location: string
  type: 'Upcoming' | 'Past'
  image: string
  registrationLink: string
  createdAt: Date
  updatedAt: Date
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    date: { type: Date, required: true },
    time: { type: String, default: '' },
    location: { type: String, default: '', trim: true },
    type: {
      type: String,
      enum: ['Upcoming', 'Past'],
      default: 'Upcoming',
    },
    image: { type: String, default: '' },
    registrationLink: { type: String, default: '' },
  },
  { timestamps: true }
)

eventSchema.index({ type: 1, date: -1 })

export const Event = model<IEvent>('Event', eventSchema)
