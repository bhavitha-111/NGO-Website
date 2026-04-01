import { Router } from 'express'
import { listEvents, getEvent, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller'
import { validateBody } from '../middleware/validation.middleware'
import { authMiddleware } from '../middleware/auth.middleware'
import { eventSchema, eventUpdateSchema } from '../validators/auth.schema'

const router = Router()

// Public
router.get('/', listEvents)
router.get('/:id', getEvent)

// Admin
router.post('/', authMiddleware, validateBody(eventSchema), createEvent)
router.put('/:id', authMiddleware, validateBody(eventUpdateSchema), updateEvent)
router.delete('/:id', authMiddleware, deleteEvent)

export default router
