import { Request, Response, NextFunction } from 'express'
import { ApiErrorResponse } from '../utils/apiResponse'

export class AppError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Global error handler — must be the LAST middleware added to app
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('❌ Error:', {
    message: err.message,
    url: req.url,
    method: req.method,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })

  // Mongoose duplicate key
  if ((err as NodeJS.ErrnoException).code === '11000') {
    const keyErr = err as Error & { keyValue?: Record<string, string> }
    const field = Object.keys(keyErr.keyValue || {})[0] || 'field'
    const body: ApiErrorResponse = {
      success: false,
      message: `Duplicate value for ${field}. This ${field} is already registered.`,
    }
    res.status(409).json(body)
    return
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const mongoErr = err as Error & { errors?: Record<string, { message: string }> }
    const errors = Object.values(mongoErr.errors || {}).map(e => ({
      field: e.message.split(':')[0].trim(),
      message: e.message,
    }))
    res.status(400).json({ success: false, message: 'Validation failed', errors })
    return
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    res.status(400).json({ success: false, message: 'Invalid resource ID format' })
    return
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ success: false, message: 'Invalid authentication token' })
    return
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({ success: false, message: 'Token expired — please log in again' })
    return
  }

  // Known operational errors
  if (err instanceof AppError) {
    const body: ApiErrorResponse = { success: false, message: err.message }
    res.status(err.statusCode).json(body)
    return
  }

  // Multer errors
  if (err.message?.includes('File too large')) {
    res.status(413).json({ success: false, message: 'Image file size exceeds 5MB limit' })
    return
  }

  // Unknown errors
  const body: ApiErrorResponse = {
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  }
  if (process.env.NODE_ENV === 'development') body.stack = err.stack
  res.status(500).json(body)
}

/**
 * 404 Not Found handler — add before errorHandler
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`,
  })
}
