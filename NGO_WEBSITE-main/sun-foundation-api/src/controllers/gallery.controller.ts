import { Request, Response, NextFunction } from 'express'
import { GalleryImage } from '../models/GalleryImage'
import { successResponse, errorResponse } from '../utils/apiResponse'
import { deleteImage } from '../services/cloudinary.service'

// GET /api/gallery  (public)
export async function listImages(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const category = req.query.category as string | undefined
    const filter: Record<string, unknown> = {}
    if (category && category !== 'All') filter.category = category

    const images = await GalleryImage.find(filter)
      .sort({ uploadedAt: -1 })
      .lean()

    successResponse(res, 200, 'Gallery images fetched', images)
  } catch (err) {
    next(err)
  }
}

// POST /api/gallery  (admin) — file handled by upload middleware
export async function uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.cloudinaryResult) {
      errorResponse(res, 400, 'No image file provided or upload failed')
      return
    }

    const { caption = '', category = 'All' } = req.body as { caption?: string; category?: string }

    const image = await GalleryImage.create({
      url: req.cloudinaryResult.secure_url,
      publicId: req.cloudinaryResult.public_id,
      caption,
      category,
    })

    successResponse(res, 201, 'Image uploaded successfully', image)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/gallery/:id  (admin)
export async function deleteGalleryImage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const image = await GalleryImage.findById(req.params.id)
    if (!image) {
      errorResponse(res, 404, 'Image not found')
      return
    }

    // Delete from Cloudinary
    await deleteImage(image.publicId)

    // Delete from MongoDB
    await image.deleteOne()

    successResponse(res, 200, 'Image deleted', null)
  } catch (err) {
    next(err)
  }
}
