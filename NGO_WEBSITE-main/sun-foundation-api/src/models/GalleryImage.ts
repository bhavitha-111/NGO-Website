import { Schema, model, Document } from 'mongoose'

export interface IGalleryImage extends Document {
  url: string
  publicId: string
  caption: string
  category: 'Education' | 'Healthcare' | 'Events' | 'Team' | 'All'
  uploadedAt: Date
}

const galleryImageSchema = new Schema<IGalleryImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    caption: { type: String, default: '', trim: true },
    category: {
      type: String,
      enum: ['Education', 'Healthcare', 'Events', 'Team', 'All'],
      default: 'All',
    },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
)

galleryImageSchema.index({ category: 1 })
galleryImageSchema.index({ uploadedAt: -1 })

export const GalleryImage = model<IGalleryImage>('GalleryImage', galleryImageSchema)
