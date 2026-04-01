import { Router } from 'express'
import { login, logout, getMe } from '../controllers/auth.controller'
import { validateBody } from '../middleware/validation.middleware'
import { authMiddleware } from '../middleware/auth.middleware'
import { authRateLimit } from '../middleware/rateLimit.middleware'
import { loginSchema } from '../validators/auth.schema'

const router = Router()

router.post('/login', authRateLimit, validateBody(loginSchema), login)
router.post('/logout', logout)
router.get('/me', authMiddleware, getMe)

export default router
