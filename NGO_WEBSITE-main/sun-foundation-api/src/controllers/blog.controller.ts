import { Request, Response, NextFunction } from 'express'
import { BlogPost } from '../models/BlogPost'
import { successResponse, errorResponse } from '../utils/apiResponse'
import { generateUniqueSlug } from '../utils/slugify'
import type { BlogInput, BlogUpdateInput } from '../validators/blog.schema'

// GET /api/blog  (public)
export async function listPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1)
    const limit = Math.min(50, parseInt(req.query.limit as string) || 9)
    const category = req.query.category as string | undefined
    const search = req.query.search as string | undefined
    const showAll = req.query.all === 'true' // admin view

    const filter: Record<string, unknown> = {}
    if (!showAll) filter.status = 'Published'
    if (category && category !== 'All') filter.category = category
    if (search) {
      filter.$text = { $search: search }
    }

    const total = await BlogPost.countDocuments(filter)
    const posts = await BlogPost.find(filter)
      .select('-content') // Exclude heavy content in list view
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    successResponse(res, 200, 'Blog posts fetched', posts, {
      page, limit, total, totalPages: Math.ceil(total / limit),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/blog/:slug  (public)
export async function getPostBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).lean()
    if (!post) {
      errorResponse(res, 404, 'Blog post not found')
      return
    }
    // Only published posts visible to public (admin routes can bypass)
    if (post.status !== 'Published' && !req.admin) {
      errorResponse(res, 404, 'Blog post not found')
      return
    }
    successResponse(res, 200, 'Blog post', post)
  } catch (err) {
    next(err)
  }
}

// POST /api/blog  (admin)
export async function createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as BlogInput
    const slug = await generateUniqueSlug(body.title)

    const post = await BlogPost.create({
      ...body,
      slug,
      publishedAt: body.status === 'Published' ? new Date() : undefined,
    })

    successResponse(res, 201, 'Blog post created', post)
  } catch (err) {
    next(err)
  }
}

// PUT /api/blog/:id  (admin)
export async function updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as BlogUpdateInput

    const updates: Record<string, unknown> = { ...body }

    // Regenerate slug if title changed
    if (body.title) {
      updates.slug = await generateUniqueSlug(body.title as string, req.params.id as string)
    }

    const post = await BlogPost.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    if (!post) {
      errorResponse(res, 404, 'Blog post not found')
      return
    }
    successResponse(res, 200, 'Blog post updated', post)
  } catch (err) {
    next(err)
  }
}

// PATCH /api/blog/:id/publish  (admin)
export async function togglePublish(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const post = await BlogPost.findById(req.params.id)
    if (!post) {
      errorResponse(res, 404, 'Blog post not found')
      return
    }

    post.status = post.status === 'Published' ? 'Draft' : 'Published'
    if (post.status === 'Published' && !post.publishedAt) {
      post.publishedAt = new Date()
    }
    await post.save()

    successResponse(res, 200, `Post ${post.status === 'Published' ? 'published' : 'unpublished'}`, post)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/blog/:id  (admin)
export async function deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id)
    if (!post) {
      errorResponse(res, 404, 'Blog post not found')
      return
    }
    successResponse(res, 200, 'Blog post deleted', null)
  } catch (err) {
    next(err)
  }
}
