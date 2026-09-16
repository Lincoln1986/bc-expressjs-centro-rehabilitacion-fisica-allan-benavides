import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import patientRouter from './routes/patient.routes';
import adminRouter from './routes/admin.routes';
import { globalLimiter } from './config/security';
import { corsOptions } from './config/security';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

// ============================================
// APP — Configuración Express + Capas de Seguridad
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 08: Autorización RBAC + Seguridad HTTP
// ============================================

export const app = express();

// ─── 1. Helmet — Cabeceras HTTP de seguridad ────────────────────────────────
// Debe ser el PRIMER middleware — agrega 12 headers de seguridad.
app.use(helmet());

// ─── 2. CORS — Control de acceso cross-origin ───────────────────────────────
// Whitelist de orígenes (no usar cors() a secas).
app.use(cors(corsOptions));

// Preflight requests para métodos no simples (Express 5: usar route参数)
app.options('/{*path}', cors(corsOptions));

// ─── 3. Rate Limiting Global ────────────────────────────────────────────────
// Limita requests a 100 por IP cada 15 minutos.
app.use(globalLimiter);

// ─── 4. Body Parser + Cookie Parser ─────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());

// ─── 5. Sanitización NoSQL Injection ────────────────────────────────────────
// Elimina operadores MongoDB ($gt, $where, etc.) de los inputs.
// Debe ir DESPUÉS de express.json() y ANTES de las rutas.
// NOTA: express-mongo-sanitize tiene problemas con Express 5 (req.query readonly).
// Se deshabilita temporalmente hasta que se publique una versión compatible.
// app.use(mongoSanitize());

// ─── 6. Rutas ───────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/admin', adminRouter);

// ─── 7. Health check ────────────────────────────────────────────────────────
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── 8. Middlewares de errores (siempre al final) ───────────────────────────
app.use(notFound);
app.use(errorHandler);
