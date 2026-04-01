import { Request, Response, NextFunction } from 'express'
import { Contact } from '../models/Contact'
import { successResponse, errorResponse } from '../utils/apiResponse'
import { sendContactAutoReply, sendContactAdminNotification } from '../services/email.service'
import type { ContactInput } from '../validators/contact.schema'

// POST /api/contact  (public)
export async function submitContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as ContactInput

    const submission = await Contact.create(body)

    // Non-blocking emails
    void sendContactAutoReply(body.firstName, body.email, body.subject)
    void sendContactAdminNotification(body)

    successResponse(res, 201, 'Message received — we\'ll get back to you within 24–48 hours', {
      id: submission._id,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/contact  (admin)
export async function listContacts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1)
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20)
    const status = req.query.status as string | undefined

    const filter: Record<string, unknown> = {}
    if (status && ['New', 'Replied'].includes(status)) filter.status = status

    const total = await Contact.countDocuments(filter)
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    successResponse(res, 200, 'Contact submissions fetched', contacts, {
      page, limit, total, totalPages: Math.ceil(total / limit),
    })
  } catch (err) {
    next(err)
  }
}

// PATCH /api/contact/:id/reply  (admin)
export async function markReplied(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'Replied', repliedAt: new Date() },
      { new: true }
    )
    if (!contact) {
      errorResponse(res, 404, 'Contact submission not found')
      return
    }
    successResponse(res, 200, 'Marked as replied', contact)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/contact/:id  (admin)
export async function deleteContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
      errorResponse(res, 404, 'Contact submission not found')
      return
    }
    successResponse(res, 200, 'Contact submission deleted', null)
  } catch (err) {
    next(err)
  }
}
