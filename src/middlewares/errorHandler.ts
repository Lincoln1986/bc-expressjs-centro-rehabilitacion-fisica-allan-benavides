// ============================================
// MIDDLEWARES — errorHandler (4 parámetros)
// ============================================
import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { isAppError } from '../errors/AppError.js';
import { logger } from '../config/logger.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    const issues = err.issues.map((issue) => ({
      field: issue.path.join('.') || 'unknown',
      message: issue.message,
    }));
    res.status(400).json({
      error: 'Validation Error',
      message: 'Datos de entrada inválidos',
      issues,
    });
    return;
  }

  if (isAppError(err)) {
    logger.warn(`AppError ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode).json({
      error: 'Application Error',
      message: err.message,
    });
    return;
  }

  const isProduction = process.env['NODE_ENV'] === 'production';
  logger.error(`Unhandled error: ${err instanceof Error ? err.message : String(err)}`);

  res.status(500).json({
    error: 'Internal Server Error',
    message: isProduction ? 'An unexpected error occurred' : (err instanceof Error ? err.message : 'Unknown error'),
    ...(!isProduction && err instanceof Error ? { stack: err.stack } : {}),
  });
}
