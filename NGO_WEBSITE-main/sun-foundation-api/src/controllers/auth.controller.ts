import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Admin } from '../models/Admin'
import { successResponse, errorResponse } from '../utils/apiResponse'
import type { LoginInput } from '../validators/auth.schema'

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body as LoginInput

    const admin = await Admin.findOne({ email }).select('+password')
    if (!admin) {
      errorResponse(res, 401, 'Invalid email or password')
      return
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      errorResponse(res, 401, 'Invalid email or password')
      return
    }

    const secret = process.env.JWT_SECRET!
    const expiresIn = process.env.JWT_EXPIRES_IN ?? '7d'

    const token = jwt.sign(
      { id: admin._id, email: admin.email, username: admin.username },
      secret,
      { expiresIn } as jwt.SignOptions
    )

    successResponse(res, 200, 'Login successful', {
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email },
    })
  } catch (err) {
    next(err)
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  successResponse(res, 200, 'Logged out successfully', null)
}

export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const admin = await Admin.findById(req.admin?.id).lean()
    if (!admin) {
      errorResponse(res, 404, 'Admin not found')
      return
    }
    successResponse(res, 200, 'Admin profile', admin)
  } catch (err) {
    next(err)
  }
}
