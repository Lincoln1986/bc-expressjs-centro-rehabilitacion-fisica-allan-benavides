// ============================================
// APP — Configuración Express
// ============================================
import express from 'express';
import { morganMiddleware } from './config/logger.js';
import { sessionsRouter } from './routes/sessions.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// 1. Middlewares generales
app.use(express.json());
app.use(morganMiddleware);

// 2. Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', week: '04', domain: 'Centro de Rehabilitación Física' });
});

// 3. Rutas del dominio
app.use('/api/v1/sessions', sessionsRouter);

// 4. Not found — DESPUÉS de todas las rutas
app.use(notFound);

// 5. Error handler — ÚLTIMO middleware (4 params)
app.use(errorHandler);

export default app;
