import { IDonation } from '../models/Donation'

export interface ReceiptData {
  donationId: string
  donorName: string
  email: string
  phone: string
  pan: string
  amount: string
  currency: string
  paymentId: string
  orderId: string
  date: string
  isEligibleFor80G: boolean
  ngoName: string
  ngoReg: string
  panEligibleNote: string
}

export function buildReceiptData(donation: IDonation): ReceiptData {
  return {
    donationId: String(donation._id),
    donorName: donation.donorName,
    email: donation.email,
    phone: donation.phone || 'N/A',
    pan: donation.pan || 'Not provided',
    amount: `₹${donation.amount.toLocaleString('en-IN')}`,
    currency: donation.currency,
    paymentId: donation.razorpayPaymentId,
    orderId: donation.razorpayOrderId,
    date: new Date(donation.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    isEligibleFor80G: Boolean(donation.pan),
    ngoName: 'Student Union for Nation (SUN) Foundation',
    ngoReg: 'Reg. No: AP/2014/0012345 | Trust Act, 1882',
    panEligibleNote: donation.pan
      ? 'Your donation is eligible for 50% tax deduction under Section 80G of IT Act, 1961. Certificate will be emailed within 7 working days.'
      : 'Provide your PAN number to claim 80G tax exemption benefits.',
  }
}
