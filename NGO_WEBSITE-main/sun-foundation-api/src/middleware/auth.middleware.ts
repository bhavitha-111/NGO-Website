import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { errorResponse } from '../utils/apiResponse'

export interface AdminPayload {
  id: string
  email: string
  username: string
  iat: number
  exp: number
}

// Extend Express Request to include admin
declare global {
  namespace Express {
    interface Request {
      admin?: AdminPayload
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    errorResponse(res, 401, 'Authentication required — no token provided')
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET not configured')

    const decoded = jwt.verify(token, secret) as AdminPayload
    req.admin = decoded
    next()
  } catch (err) {
    const message = err instanceof jwt.TokenExpiredError
      ? 'Session expired — please log in again'
      : 'Invalid token — authentication failed'
    errorResponse(res, 401, message)
  }
}
