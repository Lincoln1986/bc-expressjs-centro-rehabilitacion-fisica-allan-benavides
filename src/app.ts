// ============================================
// APP — Configuración Express
// ============================================
import express from 'express';
import { morganMiddleware } from './config/logger.js';
import { sessionsRouter } from './routes/sessions.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(morganMiddleware);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', week: '05', domain: 'Centro de Rehabilitación Física' });
});

app.use('/api/v1/sessions', sessionsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
