import { Router } from 'express'
import {
  registerVolunteer, listVolunteers, getVolunteer,
  updateVolunteerStatus, deleteVolunteer,
} from '../controllers/volunteer.controller'
import { validateBody } from '../middleware/validation.middleware'
import { authMiddleware } from '../middleware/auth.middleware'
import { volunteerRateLimit } from '../middleware/rateLimit.middleware'
import { volunteerSchema, volunteerStatusSchema } from '../validators/volunteer.schema'

const router = Router()

// Public
router.post('/', volunteerRateLimit, validateBody(volunteerSchema), registerVolunteer)

// Admin
router.get('/', authMiddleware, listVolunteers)
router.get('/:id', authMiddleware, getVolunteer)
router.patch('/:id/status', authMiddleware, validateBody(volunteerStatusSchema), updateVolunteerStatus)
router.delete('/:id', authMiddleware, deleteVolunteer)

export default router
