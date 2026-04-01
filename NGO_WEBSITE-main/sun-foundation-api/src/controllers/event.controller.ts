import { Request, Response, NextFunction } from 'express'
import { Event } from '../models/Event'
import { successResponse, errorResponse } from '../utils/apiResponse'
import type { EventInput, EventUpdateInput } from '../validators/auth.schema'

// GET /api/events  (public)
export async function listEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const type = req.query.type as 'Upcoming' | 'Past' | undefined
    const filter: Record<string, unknown> = {}
    if (type && ['Upcoming', 'Past'].includes(type)) filter.type = type

    const events = await Event.find(filter)
      .sort({ date: type === 'Past' ? -1 : 1 })
      .lean()

    successResponse(res, 200, 'Events fetched', events)
  } catch (err) {
    next(err)
  }
}

// GET /api/events/:id  (public)
export async function getEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const event = await Event.findById(req.params.id).lean()
    if (!event) {
      errorResponse(res, 404, 'Event not found')
      return
    }
    successResponse(res, 200, 'Event details', event)
  } catch (err) {
    next(err)
  }
}

// POST /api/events  (admin)
export async function createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as EventInput
    const event = await Event.create({ ...body, date: new Date(body.date) })
    successResponse(res, 201, 'Event created', event)
  } catch (err) {
    next(err)
  }
}

// PUT /api/events/:id  (admin)
export async function updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as EventUpdateInput
    const updates: Record<string, unknown> = { ...body }
    if (body.date) updates.date = new Date(body.date)

    const event = await Event.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    if (!event) {
      errorResponse(res, 404, 'Event not found')
      return
    }
    successResponse(res, 200, 'Event updated', event)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/events/:id  (admin)
export async function deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)
    if (!event) {
      errorResponse(res, 404, 'Event not found')
      return
    }
    successResponse(res, 200, 'Event deleted', null)
  } catch (err) {
    next(err)
  }
}
