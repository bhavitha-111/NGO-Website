import { Router } from 'express'
import { listImages, uploadImage, deleteGalleryImage } from '../controllers/gallery.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { upload, uploadToCloudinary } from '../middleware/upload.middleware'

const router = Router()

// Public
router.get('/', listImages)

// Admin
router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  uploadToCloudinary('sun-foundation/gallery'),
  uploadImage
)
router.delete('/:id', authMiddleware, deleteGalleryImage)

export default router
