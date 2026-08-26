// ============================================
// APP — Configuración Express
// ============================================
import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import { sessionsRouter } from './routes/sessions.routes.js';
import type { ErrorResponse } from './types/index.js';

export function createApp(): Application {
  const app = express();

  // 1. express.json() — parseo de body
  app.use(express.json());

  // 2. Logger personalizado — loggear todas las peticiones
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
      );
    });
    next();
  });

  // 3. Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', week: '03', domain: 'Centro de Rehabilitación Física' });
  });

  // 4. Rutas del recurso principal
  app.use('/api/v1/sessions', sessionsRouter);

  // 5. Handler para rutas no encontradas (404)
  app.use((_req, res) => {
    const response: ErrorResponse = {
      error: 'Not Found',
      message: 'Route not found',
    };
    res.status(404).json(response);
  });

  // 6. Error handler global — SIEMPRE el último app.use()
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`[ERROR] ${err.message}`);
    const response: ErrorResponse = {
      error: 'Internal Server Error',
      message: err.message,
    };
    res.status(500).json(response);
  });

  return app;
}
