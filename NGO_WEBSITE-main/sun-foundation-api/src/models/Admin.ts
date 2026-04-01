import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IAdmin extends Document {
  username: string
  email: string
  password: string
  createdAt: Date
  comparePassword(candidate: string): Promise<boolean>
}

const adminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
)

// Hash password before save
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

// Instance method: compare password
adminSchema.methods.comparePassword = async function (this: IAdmin, candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password)
}

// Never return password in JSON responses
adminSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_doc: any, ret: any) => {
    delete ret.password
    return ret
  },
})

export const Admin = model<IAdmin>('Admin', adminSchema)
