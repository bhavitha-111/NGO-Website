import rateLimit from 'express-rate-limit'

/**
 * Contact form: 5 submissions per hour per IP
 */
export const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent from this IP. Please try again after 1 hour.',
  },
  skipSuccessfulRequests: false,
})

/**
 * Volunteer registration: 3 per hour per IP
 */
export const volunteerRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many volunteer registrations from this IP. Please try again later.',
  },
})

/**
 * Auth login: 10 per 15 minutes per IP — prevents brute force
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please wait 15 minutes before trying again.',
  },
})

/**
 * General API rate limit: 100 req/min for all other endpoints
 */
export const generalRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please slow down.',
  },
})
