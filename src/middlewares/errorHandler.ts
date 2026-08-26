// ============================================
// MIDDLEWARES — errorHandler (4 parámetros)
// ============================================
import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError, isAppError } from '../errors/AppError.js';
import { logger } from '../config/logger.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // 1. ZodError → 400 con issues
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

  // 2. AppError → statusCode personalizado
  if (isAppError(err)) {
    logger.warn(`AppError ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode).json({
      error: 'Application Error',
      message: err.message,
    });
    return;
  }

  // 3. Error genérico → 500
  const isProduction = process.env['NODE_ENV'] === 'production';
  logger.error(`Unhandled error: ${err instanceof Error ? err.message : String(err)}`);

  res.status(500).json({
    error: 'Internal Server Error',
    message: isProduction ? 'An unexpected error occurred' : (err instanceof Error ? err.message : 'Unknown error'),
    ...(!isProduction && err instanceof Error ? { stack: err.stack } : {}),
  });
}
