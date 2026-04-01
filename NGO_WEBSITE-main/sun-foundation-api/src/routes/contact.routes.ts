import { Router } from 'express'
import { submitContact, listContacts, markReplied, deleteContact } from '../controllers/contact.controller'
import { validateBody } from '../middleware/validation.middleware'
import { authMiddleware } from '../middleware/auth.middleware'
import { contactRateLimit } from '../middleware/rateLimit.middleware'
import { contactSchema } from '../validators/contact.schema'

const router = Router()

// Public (rate-limited)
router.post('/', contactRateLimit, validateBody(contactSchema), submitContact)

// Admin
router.get('/', authMiddleware, listContacts)
router.patch('/:id/reply', authMiddleware, markReplied)
router.delete('/:id', authMiddleware, deleteContact)

export default router
