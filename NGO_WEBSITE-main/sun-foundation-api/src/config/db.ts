import mongoose from 'mongoose'

let isConnected = false

export async function connectDB(): Promise<void> {
  if (isConnected) return

  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not defined in environment variables')

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
    })
    isConnected = true
    console.log('✅ MongoDB connected:', mongoose.connection.host)

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err)
      isConnected = false
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected')
      isConnected = false
    })
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err)
    throw err
  }
}

export async function disconnectDB(): Promise<void> {
  if (!isConnected) return
  await mongoose.disconnect()
  isConnected = false
  console.log('MongoDB disconnected')
}
