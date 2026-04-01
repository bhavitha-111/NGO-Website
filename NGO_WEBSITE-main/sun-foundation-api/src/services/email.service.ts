import transporter from '../config/email'
import { IVolunteer } from '../models/Volunteer'
import { ReceiptData } from '../utils/generateReceipt'

const BRAND_ORANGE = '#E8530A'
const BRAND_GREEN = '#1D6B3A'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'studentunionfornation@gmail.com'
const FROM = `SUN Foundation <${process.env.GMAIL_USER}>`

// ─── Base HTML wrapper ──────────────────────────────────────────────────────

function htmlWrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f0; color: #333; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: ${BRAND_ORANGE}; padding: 28px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 22px; margin: 0; font-weight: 700; letter-spacing: -0.3px; }
    .header p { color: rgba(255,255,255,0.8); font-size: 13px; margin: 6px 0 0; }
    .content { padding: 36px 40px; }
    .content h2 { font-size: 20px; color: #111; margin: 0 0 14px; }
    .content p { font-size: 15px; line-height: 1.7; color: #555; margin: 0 0 14px; }
    .highlight { background: #fff7f0; border-left: 3px solid ${BRAND_ORANGE}; padding: 14px 18px; border-radius: 0 6px 6px 0; margin: 20px 0; }
    .table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
    .table td { padding: 10px 14px; border-bottom: 1px solid #eee; }
    .table td:first-child { color: #888; width: 160px; font-weight: 500; }
    .btn { display: inline-block; background: ${BRAND_ORANGE}; color: #ffffff !important; text-decoration: none; padding: 13px 28px; border-radius: 6px; font-weight: 600; font-size: 15px; margin: 20px 0; }
    .footer { background: #1a1a1a; color: rgba(255,255,255,0.5); padding: 24px 40px; font-size: 12px; text-align: center; line-height: 1.8; }
    .footer a { color: ${BRAND_ORANGE}; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>☀ SUN Foundation</h1>
      <p>Student Union for Nation — Empowering Communities Since 2014</p>
    </div>
    <div class="content">${body}</div>
    <div class="footer">
      <p>Student Union for Nation (SUN) Foundation<br />
      123 Gandhi Road, Vijayawada, AP 520001<br />
      📞 +91 94948 08589 | ✉ studentunionfornation@gmail.com</p>
      <p>
        <a href="https://instagram.com/student_union_for_nation">Instagram</a> &bull;
        <a href="#">Facebook</a> &bull;
        <a href="#">WhatsApp</a>
      </p>
      <p style="color: rgba(255,255,255,0.3); font-size: 11px;">Registered under Indian Trust Act | Reg. No: AP/2014/0012345</p>
    </div>
  </div>
</body>
</html>`
}

// ─── Utility: safe send ──────────────────────────────────────────────────────

async function sendMail(options: {
  to: string
  subject: string
  html: string
}): Promise<void> {
  if (process.env.GMAIL_APP_PASSWORD?.startsWith('placeholder')) {
    console.log(`📧 [EMAIL MOCK] To: ${options.to} | Subject: ${options.subject}`)
    return
  }
  try {
    await transporter.sendMail({ from: FROM, ...options })
  } catch (err) {
    console.error('Email send failed:', err)
    // Non-fatal: don't throw — application continues
  }
}

// ─── 1. Volunteer registration confirmation (to volunteer) ──────────────────

export async function sendVolunteerConfirmation(volunteer: IVolunteer): Promise<void> {
  const body = `
    <h2>Welcome to SUN Foundation, ${volunteer.fullName}! 🌟</h2>
    <p>Thank you for registering as a volunteer. We're excited to have you join our mission of empowering communities across India.</p>
    <div class="highlight">
      <strong>Your application has been received</strong><br/>
      Our team will review your application and contact you within <strong>3 business days</strong>.
    </div>
    <table class="table">
      <tr><td>Name</td><td>${volunteer.fullName}</td></tr>
      <tr><td>Team Applied</td><td>${volunteer.teamPreference}</td></tr>
      <tr><td>Availability</td><td>${volunteer.availability}</td></tr>
      <tr><td>Location</td><td>${volunteer.city || '—'}, ${volunteer.state || 'India'}</td></tr>
    </table>
    <p>While you wait, you can:</p>
    <ul style="color: #555; line-height: 2; font-size: 15px;">
      <li>Follow us on Instagram <strong>@student_union_for_nation</strong></li>
      <li>Explore our work at <a href="https://studentunionfornation.org" style="color: ${BRAND_ORANGE};">studentunionfornation.org</a></li>
      <li>Share our mission with friends who want to make an impact</li>
    </ul>
    <p>Together, we are stronger. 🙏</p>
    <p style="color: #888; font-size: 13px;">— The SUN Foundation Team</p>
  `
  await sendMail({
    to: volunteer.email,
    subject: `Welcome to SUN Foundation, ${volunteer.fullName}! 🌟`,
    html: htmlWrapper('Volunteer Registration', body),
  })
}

// ─── 2. Volunteer admin notification ──────────────────────────────────────

export async function sendVolunteerAdminNotification(volunteer: IVolunteer): Promise<void> {
  const body = `
    <h2>New Volunteer Registration</h2>
    <p>A new volunteer has registered on the SUN Foundation website:</p>
    <table class="table">
      <tr><td>Name</td><td>${volunteer.fullName}</td></tr>
      <tr><td>Email</td><td>${volunteer.email}</td></tr>
      <tr><td>Phone</td><td>${volunteer.phone}</td></tr>
      <tr><td>City / State</td><td>${volunteer.city || '—'}, ${volunteer.state || '—'}</td></tr>
      <tr><td>Team Preference</td><td>${volunteer.teamPreference}</td></tr>
      <tr><td>Availability</td><td>${volunteer.availability}</td></tr>
      <tr><td>Skills</td><td>${volunteer.skills.join(', ') || 'Not specified'}</td></tr>
      <tr><td>Why Join</td><td>${volunteer.whyJoin}</td></tr>
    </table>
    <a href="${process.env.CORS_ORIGIN?.replace('5173', '5174') ?? 'http://localhost:5173'}/admin/volunteers" class="btn">
      Review in Admin Panel
    </a>
  `
  await sendMail({
    to: ADMIN_EMAIL,
    subject: `New Volunteer Registration: ${volunteer.fullName}`,
    html: htmlWrapper('Admin: New Volunteer', body),
  })
}

// ─── 3. Volunteer approved ───────────────────────────────────────────────────

export async function sendVolunteerApproved(volunteer: IVolunteer): Promise<void> {
  const body = `
    <h2>You're In! 🎉</h2>
    <p>Congratulations, <strong>${volunteer.fullName}</strong>! Your application to join SUN Foundation as a volunteer has been <strong style="color: ${BRAND_GREEN};">approved</strong>.</p>
    <div class="highlight">
      <strong>Next Steps:</strong>
      <ol style="margin: 10px 0; padding-left: 20px; line-height: 2;">
        <li>Our <strong>${volunteer.teamPreference}</strong> team lead will contact you soon</li>
        <li>Join our volunteer WhatsApp group (link coming shortly)</li>
        <li>Attend the next orientation session</li>
      </ol>
    </div>
    <p>You are now part of a community of <strong>500+ volunteers</strong> across Andhra Pradesh, all working towards a better India. Welcome, changemaker! 🌱</p>
    <p style="color: #888; font-size: 13px;">Questions? Reach us at <a href="mailto:${ADMIN_EMAIL}" style="color: ${BRAND_ORANGE};">${ADMIN_EMAIL}</a> or WhatsApp us at +91 94948 08589</p>
  `
  await sendMail({
    to: volunteer.email,
    subject: `You're In! SUN Foundation Volunteer Confirmed 🎉`,
    html: htmlWrapper('Volunteer Approved', body),
  })
}

// ─── 4. Donation receipt (to donor) ─────────────────────────────────────────

export async function sendDonationReceipt(receipt: ReceiptData): Promise<void> {
  const body = `
    <h2>Thank you for your donation! ❤️</h2>
    <p>Dear <strong>${receipt.donorName}</strong>, your generous contribution to SUN Foundation has been received. Here are your donation details:</p>
    <table class="table">
      <tr><td>Donation ID</td><td style="font-family: monospace;">${receipt.donationId}</td></tr>
      <tr><td>Payment ID</td><td style="font-family: monospace;">${receipt.paymentId}</td></tr>
      <tr><td>Amount</td><td style="font-weight: bold; color: ${BRAND_ORANGE};">${receipt.amount}</td></tr>
      <tr><td>Date</td><td>${receipt.date}</td></tr>
      <tr><td>PAN Provided</td><td>${receipt.pan}</td></tr>
    </table>
    <div class="highlight">
      <strong>80G Tax Exemption</strong><br/>
      ${receipt.panEligibleNote}
    </div>
    <p>Your donation will directly fund:<br/>
    🍽️ Meals for underprivileged families &bull; 🏥 Free health camps &bull; 📚 Student scholarships &bull; 💻 Digital education</p>
    <p style="color: #888; font-size: 13px;">
      ${receipt.ngoName}<br/>${receipt.ngoReg}
    </p>
  `
  await sendMail({
    to: receipt.email,
    subject: `Thank you for your donation of ${receipt.amount} to SUN Foundation ❤️`,
    html: htmlWrapper('Donation Receipt', body),
  })
}

// ─── 5. Contact auto-reply (to sender) ──────────────────────────────────────

export async function sendContactAutoReply(firstName: string, email: string, subject: string): Promise<void> {
  const body = `
    <h2>We received your message, ${firstName}!</h2>
    <p>Thank you for reaching out to SUN Foundation. This is an automated confirmation that we have received your message regarding: <strong>${subject}</strong>.</p>
    <div class="highlight">
      We aim to respond to all enquiries within <strong>24–48 hours</strong> on business days (Mon–Fri).
    </div>
    <p>If your matter is urgent, you can reach us at:</p>
    <ul style="color: #555; line-height: 2; font-size: 15px;">
      <li>📞 <strong>+91 94948 08589</strong> (Mon–Fri, 9AM–6PM)</li>
      <li>💬 WhatsApp: <a href="https://wa.me/919494808589" style="color: ${BRAND_ORANGE};">wa.me/919494808589</a></li>
    </ul>
    <p style="color: #888; font-size: 13px;">— The SUN Foundation Team</p>
  `
  await sendMail({
    to: email,
    subject: `We received your message — SUN Foundation`,
    html: htmlWrapper('Contact Received', body),
  })
}

// ─── 6. Contact admin notification ──────────────────────────────────────────

export async function sendContactAdminNotification(data: {
  firstName: string; lastName: string; email: string; phone: string; subject: string; message: string
}): Promise<void> {
  const body = `
    <h2>New Contact Form Submission</h2>
    <table class="table">
      <tr><td>Name</td><td>${data.firstName} ${data.lastName}</td></tr>
      <tr><td>Email</td><td><a href="mailto:${data.email}" style="color: ${BRAND_ORANGE};">${data.email}</a></td></tr>
      <tr><td>Phone</td><td>${data.phone || '—'}</td></tr>
      <tr><td>Subject</td><td>${data.subject}</td></tr>
    </table>
    <p><strong>Message:</strong></p>
    <div class="highlight">${data.message}</div>
    <a href="${process.env.CORS_ORIGIN?.replace('5173', '5174') ?? 'http://localhost:5173'}/admin/dashboard" class="btn">
      Open Admin Panel
    </a>
  `
  await sendMail({
    to: ADMIN_EMAIL,
    subject: `New Contact Form: ${data.subject} from ${data.firstName} ${data.lastName}`,
    html: htmlWrapper('Admin: New Contact', body),
  })
}
