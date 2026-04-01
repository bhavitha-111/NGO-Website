import { Request, Response, NextFunction } from 'express'
import { Donation } from '../models/Donation'
import { successResponse, errorResponse } from '../utils/apiResponse'
import { createRazorpayOrder, verifyPaymentSignature } from '../services/razorpay.service'
import { sendDonationReceipt } from '../services/email.service'
import { buildReceiptData } from '../utils/generateReceipt'
import type { CreateOrderInput, VerifyPaymentInput } from '../validators/donation.schema'

// POST /api/donations/create-order  (public)
export async function createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { amount, donorName, email, phone, pan, message } = req.body as CreateOrderInput

    // Create a pending donation record
    const donation = await Donation.create({
      donorName, email, phone, pan, amount, message,
      status: 'Created',
    })

    // Create Razorpay order
    const order = await createRazorpayOrder(amount, 'INR', String(donation._id))

    // Update donation with Razorpay order ID
    donation.razorpayOrderId = order.orderId
    await donation.save()

    successResponse(res, 201, 'Order created', {
      orderId: order.orderId,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      donationId: donation._id,
    })
  } catch (err) {
    next(err)
  }
}

// POST /api/donations/verify  (public)
export async function verifyPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, donorName, email, pan } =
      req.body as VerifyPaymentInput

    // Verify HMAC signature
    let isValid: boolean
    try {
      isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)
    } catch {
      errorResponse(res, 500, 'Payment verification service error')
      return
    }

    if (!isValid) {
      // Mark as failed
      await Donation.findOneAndUpdate(
        { razorpayOrderId },
        { status: 'Failed', razorpayPaymentId, razorpaySignature }
      )
      errorResponse(res, 400, 'Payment verification failed — signature mismatch')
      return
    }

    // Update donation to Paid
    const donation = await Donation.findOneAndUpdate(
      { razorpayOrderId },
      {
        status: 'Paid',
        razorpayPaymentId,
        razorpaySignature,
        donorName,
        email,
        pan: pan?.toUpperCase() ?? '',
      },
      { new: true }
    )

    if (!donation) {
      errorResponse(res, 404, 'Donation record not found for this order')
      return
    }

    // Send receipt email (non-blocking)
    const receipt = buildReceiptData(donation)
    void sendDonationReceipt(receipt)

    successResponse(res, 200, 'Payment verified — donation recorded', {
      donationId: donation._id,
      receiptData: receipt,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/donations  (admin)
export async function listDonations(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1)
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20)
    const status = req.query.status as string | undefined

    const filter: Record<string, unknown> = {}
    if (status && ['Created', 'Paid', 'Failed'].includes(status)) filter.status = status

    const total = await Donation.countDocuments(filter)
    const donations = await Donation.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    successResponse(res, 200, 'Donations fetched', donations, {
      page, limit, total, totalPages: Math.ceil(total / limit),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/donations/stats  (admin)
export async function getDonationStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const stats = await Donation.aggregate([
      { $match: { status: 'Paid' } },
      {
        $group: {
          _id: null,
          totalRaised: { $sum: '$amount' },
          totalDonations: { $count: {} },
          avgDonation: { $avg: '$amount' },
          maxDonation: { $max: '$amount' },
        },
      },
    ])

    const result = stats[0] ?? { totalRaised: 0, totalDonations: 0, avgDonation: 0, maxDonation: 0 }
    successResponse(res, 200, 'Donation statistics', {
      totalRaised: result.totalRaised,
      totalDonations: result.totalDonations,
      avgDonation: Math.round(result.avgDonation),
      maxDonation: result.maxDonation,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/donations/:id  (admin)
export async function getDonation(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const donation = await Donation.findById(req.params.id).lean()
    if (!donation) {
      errorResponse(res, 404, 'Donation not found')
      return
    }
    successResponse(res, 200, 'Donation details', donation)
  } catch (err) {
    next(err)
  }
}
