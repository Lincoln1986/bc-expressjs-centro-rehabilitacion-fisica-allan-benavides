import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import patientRouter from './routes/patient.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

// ============================================
// APP — Configuración Express
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 07: Autenticación JWT
// ============================================

export const app = express();

app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación
app.use('/api/v1/auth', authRouter);

// Rutas de pacientes (recurso principal del dominio)
app.use('/api/v1/patients', patientRouter);

// Ruta de health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', week: '07', domain: 'Centro de Rehabilitación Física' });
});

// Middlewares de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);
