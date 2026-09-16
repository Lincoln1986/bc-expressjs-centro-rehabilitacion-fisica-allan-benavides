import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

// ============================================
// MIDDLEWARE DE AUTORIZACIÓN RBAC
// ============================================
// Role-Based Access Control — autorización basada en roles.
// Debe usarse DESPUÉS de authMiddleware, que popula req.user.
//
// Uso:
//   router.delete('/:id', authMiddleware, requireRole('admin'), controller.remove);
//
// Diferencia:
//   401 = no autenticado (sin token o token inválido)
//   403 = autenticado pero sin permisos (rol insuficiente)
// ============================================

/**
 * Higher-order function que devuelve un middleware de autorización.
 * @param roles - Roles permitidos para acceder a la ruta
 */
export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    // authMiddleware ya debe haber corrido antes — req.user debe existir
    if (!req.user) {
      return next(new AppError(401, 'No autenticado'));
    }

    const userRole = req.user.role ?? '';

    if (!roles.includes(userRole)) {
      return next(
        new AppError(403, 'No autorizado — permisos insuficientes')
      );
    }

    next();
  };
}
