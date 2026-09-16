import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';

// ============================================
// MIDDLEWARE DE AUTENTICACIÓN
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 07: Autenticación JWT
//
// Lee el token de la cookie HttpOnly y verifica su validez.
// Si es válido, adjunta el payload a req.user.
// ============================================

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.accessToken as string | undefined;

  if (!token) {
    return next(new AppError(401, 'No autenticado — token no encontrado'));
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch {
    next(new AppError(401, 'Token inválido o expirado'));
  }
}
