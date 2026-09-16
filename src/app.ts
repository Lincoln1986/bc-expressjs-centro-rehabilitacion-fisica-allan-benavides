import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import patientRouter from './routes/patient.routes';
import adminRouter from './routes/admin.routes';
import { globalLimiter, corsOptions } from './config/security';
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

// ─── 3. Rate Limiting Global ────────────────────────────────────────────────
// Limita requests a 100 por IP cada 15 minutos.
app.use(globalLimiter);

// ─── 4. Body Parser + Cookie Parser ─────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());

// ─── 5. Rutas ───────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/admin', adminRouter);

// ─── 6. Health check ────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', week: '08', domain: 'Centro de Rehabilitación Física' });
});

// ─── 7. Middlewares de errores (siempre al final) ───────────────────────────
app.use(notFound);
app.use(errorHandler);
