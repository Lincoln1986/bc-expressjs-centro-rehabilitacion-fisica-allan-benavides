// ============================================
// APP — Configuración Express
// Centro de Rehabilitación Física — Semana 06
// ============================================

import express from 'express';
import therapistRouter from './routes/therapist.routes';
import sessionRouter from './routes/session.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', week: '06', domain: 'Centro de Rehabilitación Física' });
});

app.use('/api/v1/therapists', therapistRouter);
app.use('/api/v1/sessions', sessionRouter);

app.use(notFound);
app.use(errorHandler);
