import { Response } from 'express'

export interface ApiSuccessResponse<T = unknown> {
  success: true
  message: string
  data: T
  meta?: Record<string, unknown>
}

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Array<{ field: string; message: string }>
  stack?: string
}

export function successResponse<T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
  meta?: Record<string, unknown>
): Response {
  const body: ApiSuccessResponse<T> = { success: true, message, data }
  if (meta) body.meta = meta
  return res.status(statusCode).json(body)
}

export function errorResponse(
  res: Response,
  statusCode: number,
  message: string,
  errors?: Array<{ field: string; message: string }>
): Response {
  const body: ApiErrorResponse = { success: false, message }
  if (errors) body.errors = errors
  return res.status(statusCode).json(body)
}
