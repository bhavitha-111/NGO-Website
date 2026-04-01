import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import { generalRateLimit } from './middleware/rateLimit.middleware'
import { errorHandler, notFoundHandler } from './middleware/error.middleware'

import authRoutes from './routes/auth.routes'
import volunteerRoutes from './routes/volunteer.routes'
import donationRoutes from './routes/donation.routes'
import blogRoutes from './routes/blog.routes'
import galleryRoutes from './routes/gallery.routes'
import eventRoutes from './routes/event.routes'
import contactRoutes from './routes/contact.routes'
import statsRoutes from './routes/stats.routes'

const app = express()

// Trust Render/Vercel/Railway proxy — required for rate-limiting behind load balancers
app.set('trust proxy', 1)

// ─── Security & Logging ───────────────────────────────────────────────────────
app.use(helmet())
// Strip trailing slash from CORS_ORIGIN so it matches browser-sent origin exactly
const allowedOrigin = (process.env.CORS_ORIGIN ?? 'https://ngo-website-tan-rho.vercel.app').replace(/\/$/, '')

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true)
      if (origin === allowedOrigin || origin.replace(/\/$/, '') === allowedOrigin) {
        callback(null, true)
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`))
      }
    },
    credentials: true,
  })
)
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ─── Global Rate Limit ────────────────────────────────────────────────────────
app.use('/api', generalRateLimit)

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/volunteers', volunteerRoutes)
app.use('/api/donations', donationRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/stats', statsRoutes)

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFoundHandler)
app.use(errorHandler)

export default app
