import 'dotenv/config'
import http from 'http'
import app from './app'
import { connectDB } from './config/db'
import { verifyEmailConfig } from './config/email'

const PORT = parseInt(process.env.PORT ?? '5000', 10)

async function bootstrap(): Promise<void> {
  // Connect to MongoDB (non-fatal on first boot — Render may need a moment)
  try {
    await connectDB()
  } catch (err) {
    console.error('⚠️  MongoDB initial connection failed — server will start anyway and retry on requests:', err)
  }

  // Verify email configuration (non-fatal — logs warning if placeholder)
  await verifyEmailConfig()

  // Start HTTP server
  const server = http.createServer(app)

  server.listen(PORT, () => {
    console.log(`🚀  Server running on http://localhost:${PORT}`)
    console.log(`📌  Environment: ${process.env.NODE_ENV ?? 'development'}`)
  })

  // Graceful shutdown
  const shutdown = (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`)
    server.close(() => {
      console.log('HTTP server closed.')
      process.exit(0)
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

bootstrap().catch((err: unknown) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
