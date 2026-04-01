import crypto from 'crypto'
import razorpay, { isRazorpayConfigured } from '../config/razorpay'

/**
 * Create a Razorpay order.
 * Returns a mock order when Razorpay keys are not configured.
 */
export async function createRazorpayOrder(
  amountInRupees: number,
  currency: string = 'INR',
  receiptId: string
): Promise<{ orderId: string; amount: number; currency: string }> {
  if (!isRazorpayConfigured || !razorpay) {
    // Mock order for development / when keys are not set
    return {
      orderId: `mock_order_${Date.now()}`,
      amount: amountInRupees,
      currency,
    }
  }

  const order = await razorpay.orders.create({
    amount: amountInRupees * 100,
    currency,
    receipt: receiptId.slice(0, 40),
  })

  return {
    orderId: order.id,
    amount: amountInRupees,
    currency: order.currency,
  }
}

/**
 * Verify Razorpay payment signature using HMAC-SHA256.
 * Returns false (instead of throwing) when keys are not configured.
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!isRazorpayConfigured) return false

  const secret = process.env.RAZORPAY_KEY_SECRET!
  const body = `${orderId}|${paymentId}`
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(expected, 'hex'),
    Buffer.from(signature, 'hex')
  )
}
