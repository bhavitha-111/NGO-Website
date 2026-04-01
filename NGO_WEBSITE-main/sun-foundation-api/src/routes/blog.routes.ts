import { Router } from 'express'
import {
  listPosts, getPostBySlug, createPost,
  updatePost, togglePublish, deletePost,
} from '../controllers/blog.controller'
import { validateBody } from '../middleware/validation.middleware'
import { authMiddleware } from '../middleware/auth.middleware'
import { blogSchema, blogUpdateSchema } from '../validators/blog.schema'

const router = Router()

// Public
router.get('/', listPosts)
router.get('/:slug', getPostBySlug)

// Admin
router.post('/', authMiddleware, validateBody(blogSchema), createPost)
router.put('/:id', authMiddleware, validateBody(blogUpdateSchema), updatePost)
router.patch('/:id/publish', authMiddleware, togglePublish)
router.delete('/:id', authMiddleware, deletePost)

export default router
