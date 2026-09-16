import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';

// ============================================
// MIDDLEWARE GLOBAL DE ERRORES
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 08: Agregado manejo de ZodError (422)
// ============================================

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // AppError — errores operacionales controlados
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // ZodError — errores de validación de schemas
  if (err instanceof ZodError) {
    const messages = err.issues.map((issue) => issue.message);
    res.status(422).json({ error: 'Error de validación', details: messages });
    return;
  }

  // Error interno — no exponer stack trace en producción
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
}
