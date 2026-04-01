import Razorpay from 'razorpay'

const keyId = process.env.RAZORPAY_KEY_ID ?? ''
const keySecret = process.env.RAZORPAY_KEY_SECRET ?? ''

// Returns null when placeholder keys are set — callers must check before use
export const isRazorpayConfigured =
  Boolean(keyId) &&
  !keyId.includes('placeholder') &&
  Boolean(keySecret) &&
  !keySecret.includes('placeholder')

const razorpay = isRazorpayConfigured
  ? new Razorpay({ key_id: keyId, key_secret: keySecret })
  : null

export default razorpay
