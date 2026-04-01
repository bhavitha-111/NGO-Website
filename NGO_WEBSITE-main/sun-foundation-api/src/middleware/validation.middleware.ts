import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'
import { errorResponse } from '../utils/apiResponse'

/**
 * Middleware factory: validates req.body against a Zod schema.
 * Replaces req.body with the parsed + coerced value on success.
 */
export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const errors = formatZodErrors(result.error)
      errorResponse(res, 400, 'Validation failed', errors)
      return
    }

    req.body = result.data
    next()
  }
}

/**
 * Middleware factory: validates req.query against a Zod schema.
 */
export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query)

    if (!result.success) {
      const errors = formatZodErrors(result.error)
      errorResponse(res, 400, 'Invalid query parameters', errors)
      return
    }

    req.query = result.data as typeof req.query
    next()
  }
}

function formatZodErrors(error: ZodError): Array<{ field: string; message: string }> {
  return error.issues.map((issue) => ({
    field: issue.path.map(String).join('.') || 'root',
    message: issue.message,
  }))
}
