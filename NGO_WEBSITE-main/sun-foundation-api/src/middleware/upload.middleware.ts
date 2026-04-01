import multer, { FileFilterCallback } from 'multer'
import { Request, Response, NextFunction } from 'express'
import { UploadApiResponse } from 'cloudinary'
import cloudinary from '../config/cloudinary'
import { errorResponse } from '../utils/apiResponse'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * Multer memory storage — file goes into req.file.buffer
 */
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'))
    }
  },
})

/**
 * Upload buffer from multer to Cloudinary.
 * Attaches cloudinary result to req.cloudinaryResult
 */
declare global {
  namespace Express {
    interface Request {
      cloudinaryResult?: UploadApiResponse
    }
  }
}

export function uploadToCloudinary(folder: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.file) {
      next()
      return
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      errorResponse(res, 500, 'Image uploads are not configured. Please set Cloudinary env vars on Render.')
      return
    }

    try {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'image',
            quality: 'auto',
            fetch_format: 'auto',
          },
          (error, result) => {
            if (error) reject(error)
            else if (result) resolve(result)
            else reject(new Error('Cloudinary upload returned no result'))
          }
        )
        uploadStream.end(req.file!.buffer)
      })

      req.cloudinaryResult = result
      next()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Image upload failed'
      errorResponse(res, 500, message)
    }
  }
}
