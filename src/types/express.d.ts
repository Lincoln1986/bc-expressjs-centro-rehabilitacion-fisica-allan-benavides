import { JwtPayload } from '../utils/jwt';

// ============================================
// EXTENSIÓN DE TIPOS DE EXPRESS
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 07: Autenticación JWT
//
// Extiende la interface Request para incluir
// el campo user con el payload del JWT.
// ============================================

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
