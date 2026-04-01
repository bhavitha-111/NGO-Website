/**
 * Seed script — populate the database with initial data.
 * Run: npm run seed
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './config/db'
import { Admin } from './models/Admin'
import { Event } from './models/Event'
import { BlogPost } from './models/BlogPost'
import { GalleryImage } from './models/GalleryImage'

// ─── Seed Data ────────────────────────────────────────────────────────────────

const adminData = {
  username: 'sunadmin',
  email: 'admin@sun.org',
  password: 'Sun@2024',
}

const eventsData = [
  {
    title: 'Annual Tree Plantation Drive 2024',
    slug: 'annual-tree-plantation-drive-2024',
    description:
      'Join us for our flagship annual tree plantation drive. We aim to plant 5,000 saplings across the city\'s green belt areas. Volunteers of all ages are welcome. Refreshments and tools provided.',
    date: new Date('2024-12-15T08:00:00.000Z'),
    endDate: new Date('2024-12-15T17:00:00.000Z'),
    location: 'Cubbon Park, Bengaluru',
    category: 'Environment',
    status: 'upcoming',
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1/sun-foundation/events/tree-plantation.jpg',
    imagePublicId: 'sun-foundation/events/tree-plantation',
    highlights: '5000 saplings | All ages welcome | Tools provided',
    registrationLink: 'https://forms.gle/placeholder',
    isFeatured: true,
  },
  {
    title: 'Winter Health Camp & Blood Donation',
    slug: 'winter-health-camp-blood-donation-2024',
    description:
      'Free health check-up camp covering BMI, blood pressure, blood sugar, and eye tests. Blood donation drive running in parallel. Certified doctors and nurses on site. All donors receive a certificate of appreciation.',
    date: new Date('2024-12-22T09:00:00.000Z'),
    endDate: new Date('2024-12-22T16:00:00.000Z'),
    location: 'SUN Foundation Community Hall, Koramangala',
    category: 'Health',
    status: 'upcoming',
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1/sun-foundation/events/health-camp.jpg',
    imagePublicId: 'sun-foundation/events/health-camp',
    highlights: 'Free check-up | Blood donation | Doctor consultation',
    isFeatured: false,
  },
  {
    title: 'Mid-Year Education Fair 2024',
    slug: 'mid-year-education-fair-2024',
    description:
      'SUN Foundation partnered with 12 schools to host a scholarship fair and distribute free study kits to 400+ underprivileged students. This event brought together educators, parents, and donors to celebrate learning.',
    date: new Date('2024-06-10T10:00:00.000Z'),
    endDate: new Date('2024-06-10T15:00:00.000Z'),
    location: 'Town Hall, Mysuru',
    category: 'Education',
    status: 'past',
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1/sun-foundation/events/education-fair.jpg',
    imagePublicId: 'sun-foundation/events/education-fair',
    highlights: '400+ students | 12 schools | Free study kits',
    isFeatured: false,
  },
]

const blogsData = [
  {
    title: 'How Your Donation Planted 10,000 Trees This Monsoon',
    slug: 'how-your-donation-planted-10000-trees-this-monsoon',
    excerpt:
      'Thanks to our generous donors, SUN Foundation planted over 10,000 trees across 6 districts in Karnataka during the 2024 monsoon season. Here is the full impact story.',
    content: `
<h2>The Green Mission</h2>
<p>Every year, SUN Foundation undertakes a large-scale tree plantation drive timed with the monsoon season — when survival rates for saplings are highest. In 2024, with your support, we surpassed our own record.</p>

<h2>Where the Trees Were Planted</h2>
<p>Our teams worked across Bengaluru Rural, Tumakuru, Mysuru, Hassan, Shivamogga, and Chikkamagaluru districts. Over 200 volunteers participated in the 3-week drive, covering roadside areas, school compounds, and degraded forest patches.</p>

<h2>Species We Chose</h2>
<p>We prioritised native species: Neem, Peepal, Mango, Jackfruit, and Indian Gooseberry (Amla) — trees that provide shade, food, and ecological support for local wildlife.</p>

<h2>The Numbers</h2>
<ul>
  <li>10,427 saplings planted</li>
  <li>6 districts covered</li>
  <li>210 volunteers on ground</li>
  <li>89% survival rate tracked over 3 months</li>
</ul>

<h2>Your Role</h2>
<p>Every ₹500 donated plants and nurtures one tree for its first year. The ₹52 lakh raised in our Green Drive campaign went entirely towards saplings, transportation, and 6-month post-plantation care by local community members we employ seasonally.</p>

<p>Thank you for being part of this green story. The canopy you helped create will cool streets, clean air, and anchor ecosystems for decades to come.</p>
    `.trim(),
    author: 'Priya Nair',
    authorBio: 'Environmental Programme Lead at SUN Foundation',
    category: 'Environment',
    tags: ['plantation', 'monsoon', 'green', 'environment', 'impact'],
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1/sun-foundation/blog/tree-plantation-cover.jpg',
    imagePublicId: 'sun-foundation/blog/tree-plantation-cover',
    status: 'published',
    isFeatured: true,
    readTime: 4,
    publishedAt: new Date('2024-10-05T08:00:00.000Z'),
  },
  {
    title: '400 Children Received Free School Kits — Here Is Their Story',
    slug: '400-children-received-free-school-kits-here-is-their-story',
    excerpt:
      'At our Mid-Year Education Fair in Mysuru, 400 children from low-income families received full school kits. We spoke to three of them — and their smiles say it all.',
    content: `
<h2>A Morning in Mysuru</h2>
<p>The Town Hall in Mysuru was buzzing on June 10th. Rows of tables lined with colourful school bags, notebooks, pens, geometry boxes, and textbooks greeted hundreds of students who arrived with their parents early in the morning.</p>

<h2>Why School Kits?</h2>
<p>Research consistently shows that the cost of school supplies — though small in absolute terms — is a significant barrier for families living below the poverty line. Many children begin the academic year without basic materials, falling behind before they ever start.</p>

<h2>Three Stories Worth Telling</h2>

<h3>Ravi, 9, from Mysuru Rural</h3>
<p>"I never had a geometry box before. My teacher would lend me her ruler sometimes. Now I have my own and I draw really straight lines," Ravi told us, beaming.</p>

<h3>Lakshmi, 12, from Nanjangud</h3>
<p>Lakshmi is the first girl in her family to reach Class 7. Her mother, a domestic worker, travelled 40 km to attend the fair. "She will study well. She is very smart," her mother said.</p>

<h3>Mohammed Salim, 10, from T. Narasipur</h3>
<p>Salim wants to be an engineer. He picked up the mathematics textbook first and started reading it on the spot. His teacher, who accompanied the school group, laughed: "He finished his previous book in two months."</p>

<h2>The Numbers</h2>
<ul>
  <li>412 children received full school kits</li>
  <li>12 schools participated</li>
  <li>47 volunteers organised the event</li>
  <li>3 sponsor organisations co-funded the kits</li>
</ul>

<p>If you'd like to sponsor a child's school kit (₹800 covers one full kit), visit our Donate page. Every kit is a year of possibility.</p>
    `.trim(),
    author: 'Arjun Sharma',
    authorBio: 'Education Programme Coordinator at SUN Foundation',
    category: 'Education',
    tags: ['education', 'children', 'school', 'impact', 'kits'],
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1/sun-foundation/blog/school-kits-cover.jpg',
    imagePublicId: 'sun-foundation/blog/school-kits-cover',
    status: 'published',
    isFeatured: false,
    readTime: 5,
    publishedAt: new Date('2024-06-20T10:00:00.000Z'),
  },
]

const galleryData = [
  {
    title: 'Tree Plantation Drive — Cubbon Park',
    caption: 'Volunteers plant saplings at Cubbon Park during our 2023 Green Drive.',
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1/sun-foundation/gallery/tree-plantation-1.jpg',
    publicId: 'sun-foundation/gallery/tree-plantation-1',
    category: 'Environment',
    isFeatured: true,
  },
  {
    title: 'School Kit Distribution — Mysuru',
    caption: 'Children receive free school kits at the Mid-Year Education Fair.',
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1/sun-foundation/gallery/education-fair-1.jpg',
    publicId: 'sun-foundation/gallery/education-fair-1',
    category: 'Education',
    isFeatured: true,
  },
  {
    title: 'Blood Donation Drive',
    caption: 'Volunteers donating blood at our Winter Health Camp.',
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1/sun-foundation/gallery/health-camp-1.jpg',
    publicId: 'sun-foundation/gallery/health-camp-1',
    category: 'Health',
    isFeatured: false,
  },
  {
    title: 'Women Empowerment Workshop',
    caption: 'Participants at our skill development workshop for women entrepreneurs.',
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1/sun-foundation/gallery/women-workshop-1.jpg',
    publicId: 'sun-foundation/gallery/women-workshop-1',
    category: 'Women Empowerment',
    isFeatured: true,
  },
  {
    title: 'Community Kitchen — Flood Relief',
    caption: 'Our team running a community kitchen during the 2023 flood relief operations.',
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1/sun-foundation/gallery/flood-relief-1.jpg',
    publicId: 'sun-foundation/gallery/flood-relief-1',
    category: 'Disaster Relief',
    isFeatured: false,
  },
]

// ─── Seed Runner ──────────────────────────────────────────────────────────────

async function seed(): Promise<void> {
  await connectDB()

  console.log('🌱  Clearing existing seed data...')
  await Promise.all([
    Admin.deleteMany({}),
    Event.deleteMany({}),
    BlogPost.deleteMany({}),
    GalleryImage.deleteMany({}),
  ])

  // Admin — password is hashed via pre-save hook on the model
  console.log('👤  Creating admin user...')
  const admin = await Admin.create(adminData)
  console.log(`    ✓  Admin created: ${admin.email}`)

  // Events
  console.log('📅  Creating events...')
  const events = await Event.insertMany(eventsData)
  console.log(`    ✓  ${events.length} events created`)

  // Blog Posts
  console.log('📝  Creating blog posts...')
  const blogs = await BlogPost.insertMany(blogsData)
  console.log(`    ✓  ${blogs.length} blog posts created`)

  // Gallery
  console.log('🖼️   Creating gallery images...')
  const gallery = await GalleryImage.insertMany(galleryData)
  console.log(`    ✓  ${gallery.length} gallery images created`)

  console.log('\n✅  Seed complete!')
  console.log('────────────────────────────────────')
  console.log('  Admin login:')
  console.log(`    Email   : ${adminData.email}`)
  console.log(`    Password: ${adminData.password}`)
  console.log('────────────────────────────────────\n')

  await mongoose.disconnect()
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err)
  mongoose.disconnect().finally(() => process.exit(1))
})
