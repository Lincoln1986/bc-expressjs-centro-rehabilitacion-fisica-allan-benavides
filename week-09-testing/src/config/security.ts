import rateLimit from 'express-rate-limit';
import cors, { CorsOptions } from 'cors';
import { Request, Response, NextFunction } from 'express';

// ============================================
// CONFIGURACIÓN DE SEGURIDAD
// ============================================
// Rate limiting, CORS y configuración de seguridad HTTP.
// Dominio: Centro de Rehabilitación Física
// ============================================

const isTest = process.env.NODE_ENV === 'test';

// Middleware vacío para deshabilitar rate limiting en tests
function noOpLimiter(_req: Request, _res: Response, next: NextFunction): void {
  next();
}

// ─── Rate Limiting Global ───────────────────────────────────────────────────
// Limita a 100 requests por IP cada 15 minutos.
// Aplica a TODOS los endpoints de la API.
// En test se deshabilita para permitir múltiples requests.

export const globalLimiter = isTest
  ? noOpLimiter
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      limit: 100,                // máximo 100 requests por ventana
      standardHeaders: 'draft-7', // incluye cabeceras RateLimit-* en respuesta
      legacyHeaders: false,       // desactiva cabeceras X-RateLimit-* antiguas
      message: {
        error: 'Demasiadas peticiones, intenta de nuevo en 15 minutos',
      },
    });

// ─── Rate Limiting para Autenticación ───────────────────────────────────────
// Más estricto: máximo 5 intentos por IP cada 15 minutos.
// Protege contra fuerza bruta en login/register.
// En test se deshabilita.

export const authLimiter = isTest
  ? noOpLimiter
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      limit: 5,                  // máximo 5 intentos
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message: {
        error: 'Demasiados intentos de autenticación, intenta en 15 minutos',
      },
    });

// ─── CORS — Cross-Origin Resource Sharing ───────────────────────────────────
// Whitelist de orígenes permitidos. NUNCA usar cors() a secas en producción.

const ALLOWED_ORIGINS = [
  'http://localhost:3000',   // Frontend local
  'http://localhost:5173',   // Vite dev server
  'http://localhost:3001',   // Frontend alternativo
];

export const corsOptions: CorsOptions = {
  origin: (requestOrigin, callback) => {
    // Permitir requests sin Origin (Postman, curl, servidores)
    if (!requestOrigin) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origen ${requestOrigin} no permitido`));
    }
  },
  credentials: true, // Necesario para enviar cookies HttpOnly
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
