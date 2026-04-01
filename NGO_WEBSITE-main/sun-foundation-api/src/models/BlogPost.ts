import { Schema, model, Document } from 'mongoose'

export interface IBlogPost extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  category: 'Education' | 'Healthcare' | 'Women Empowerment' | 'Tech' | 'Food' | 'Events' | 'General'
  tags: string[]
  author: string
  status: 'Draft' | 'Published'
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, trim: true, default: '' },
    content: { type: String, default: '' },
    featuredImage: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Education', 'Healthcare', 'Women Empowerment', 'Tech', 'Food', 'Events', 'General'],
      default: 'General',
    },
    tags: { type: [String], default: [] },
    author: { type: String, default: 'SUN Foundation Team', trim: true },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    publishedAt: { type: Date },
  },
  { timestamps: true }
)

blogPostSchema.index({ status: 1, publishedAt: -1 })
blogPostSchema.index({ category: 1 })
blogPostSchema.index({ title: 'text', excerpt: 'text', content: 'text' })

export const BlogPost = model<IBlogPost>('BlogPost', blogPostSchema)
