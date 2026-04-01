import { Request, Response, NextFunction } from 'express'
import { Volunteer } from '../models/Volunteer'
import { successResponse, errorResponse } from '../utils/apiResponse'
import { sendVolunteerConfirmation, sendVolunteerAdminNotification, sendVolunteerApproved } from '../services/email.service'
import type { VolunteerInput, VolunteerStatusInput } from '../validators/volunteer.schema'

// POST /api/volunteers  (public)
export async function registerVolunteer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as VolunteerInput

    // Check for duplicate email
    const existing = await Volunteer.findOne({ email: body.email })
    if (existing) {
      errorResponse(res, 409, 'A volunteer with this email is already registered')
      return
    }

    const volunteer = await Volunteer.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      city: body.city ?? '',
      state: body.state ?? '',
      teamPreference: body.teamPreference,
      whyJoin: body.whyJoin,
      skills: body.skills,
      availability: body.availability,
    })

    // Fire emails without blocking the response
    void sendVolunteerConfirmation(volunteer)
    void sendVolunteerAdminNotification(volunteer)

    successResponse(res, 201, 'Volunteer registered successfully', {
      id: volunteer._id,
      fullName: volunteer.fullName,
      email: volunteer.email,
      status: volunteer.status,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/volunteers  (admin)
export async function listVolunteers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1)
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20)
    const status = req.query.status as string | undefined
    const team = req.query.team as string | undefined
    const search = req.query.search as string | undefined

    const filter: Record<string, unknown> = {}
    if (status && ['Pending', 'Approved', 'Rejected'].includes(status)) filter.status = status
    if (team) filter.teamPreference = team
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }

    const total = await Volunteer.countDocuments(filter)
    const volunteers = await Volunteer.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    successResponse(res, 200, 'Volunteers fetched', volunteers, {
      page, limit, total, totalPages: Math.ceil(total / limit),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/volunteers/:id  (admin)
export async function getVolunteer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const volunteer = await Volunteer.findById(req.params.id).lean()
    if (!volunteer) {
      errorResponse(res, 404, 'Volunteer not found')
      return
    }
    successResponse(res, 200, 'Volunteer details', volunteer)
  } catch (err) {
    next(err)
  }
}

// PATCH /api/volunteers/:id/status  (admin)
export async function updateVolunteerStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.body as VolunteerStatusInput

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
    if (!volunteer) {
      errorResponse(res, 404, 'Volunteer not found')
      return
    }

    // Send approval email
    if (status === 'Approved') {
      void sendVolunteerApproved(volunteer)
    }

    successResponse(res, 200, `Volunteer status updated to ${status}`, volunteer)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/volunteers/:id  (admin)
export async function deleteVolunteer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id)
    if (!volunteer) {
      errorResponse(res, 404, 'Volunteer not found')
      return
    }
    successResponse(res, 200, 'Volunteer deleted', null)
  } catch (err) {
    next(err)
  }
}
