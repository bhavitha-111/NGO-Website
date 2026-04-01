import { Router } from 'express'
import {
  createOrder, verifyPayment, listDonations,
  getDonation, getDonationStats,
} from '../controllers/donation.controller'
import { validateBody } from '../middleware/validation.middleware'
import { authMiddleware } from '../middleware/auth.middleware'
import { createOrderSchema, verifyPaymentSchema } from '../validators/donation.schema'

const router = Router()

// Public
router.post('/create-order', validateBody(createOrderSchema), createOrder)
router.post('/verify', validateBody(verifyPaymentSchema), verifyPayment)

// Admin
router.get('/stats', authMiddleware, getDonationStats)
router.get('/', authMiddleware, listDonations)
router.get('/:id', authMiddleware, getDonation)

export default router
