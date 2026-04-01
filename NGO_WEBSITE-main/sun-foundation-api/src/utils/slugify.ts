import { BlogPost } from '../models/BlogPost'

/**
 * Converts a title string to a URL-safe slug.
 * Ensures uniqueness by appending a timestamp suffix if needed.
 */
export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // Remove non-word chars except spaces and dashes
    .replace(/[\s_]+/g, '-')    // Replace spaces and underscores with dashes
    .replace(/--+/g, '-')       // Collapse multiple dashes
    .replace(/^-+|-+$/g, '')    // Trim leading/trailing dashes
}

/**
 * Generates a unique slug for a blog post, checking the database for conflicts.
 */
export async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
  const base = toSlug(title)
  let slug = base
  let counter = 0

  while (true) {
    const query: Record<string, unknown> = { slug }
    if (excludeId) query._id = { $ne: excludeId }

    const existing = await BlogPost.findOne(query).lean()
    if (!existing) return slug

    counter++
    slug = `${base}-${counter}`
  }
}
