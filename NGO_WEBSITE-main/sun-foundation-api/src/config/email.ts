import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function verifyEmailConfig(): Promise<void> {
  if (process.env.NODE_ENV === 'development' && !process.env.GMAIL_APP_PASSWORD?.startsWith('placeholder')) {
    try {
      await transporter.verify()
      console.log('✅ Email transporter ready')
    } catch {
      console.warn('⚠️  Email transporter not configured — emails disabled')
    }
  }
}

export default transporter
