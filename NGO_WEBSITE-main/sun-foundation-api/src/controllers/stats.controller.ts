import { Request, Response, NextFunction } from 'express'
import { Volunteer } from '../models/Volunteer'
import { Donation } from '../models/Donation'
import { BlogPost } from '../models/BlogPost'
import { GalleryImage } from '../models/GalleryImage'
import { Event } from '../models/Event'
import { Contact } from '../models/Contact'
import { successResponse } from '../utils/apiResponse'

// GET /api/stats/dashboard  (admin)
export async function getDashboardStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Run all queries in parallel for speed
    const [
      totalVolunteers,
      pendingVolunteers,
      approvedVolunteers,
      donationStats,
      totalBlogPosts,
      publishedPosts,
      totalGalleryImages,
      totalEvents,
      upcomingEvents,
      newContacts,
    ] = await Promise.all([
      Volunteer.countDocuments(),
      Volunteer.countDocuments({ status: 'Pending' }),
      Volunteer.countDocuments({ status: 'Approved' }),
      Donation.aggregate([
        { $match: { status: 'Paid' } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $count: {} } } },
      ]),
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ status: 'Published' }),
      GalleryImage.countDocuments(),
      Event.countDocuments(),
      Event.countDocuments({ type: 'Upcoming' }),
      Contact.countDocuments({ status: 'New' }),
    ])

    const donationData = donationStats[0] ?? { total: 0, count: 0 }

    successResponse(res, 200, 'Dashboard statistics', {
      volunteers: {
        total: totalVolunteers,
        pending: pendingVolunteers,
        approved: approvedVolunteers,
        rejected: totalVolunteers - pendingVolunteers - approvedVolunteers,
      },
      donations: {
        total: donationData.count,
        totalAmountRaised: donationData.total,
      },
      blog: {
        total: totalBlogPosts,
        published: publishedPosts,
        drafts: totalBlogPosts - publishedPosts,
      },
      gallery: {
        total: totalGalleryImages,
      },
      events: {
        total: totalEvents,
        upcoming: upcomingEvents,
        past: totalEvents - upcomingEvents,
      },
      contacts: {
        new: newContacts,
      },
    })
  } catch (err) {
    next(err)
  }
}
