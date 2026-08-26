// ============================================
// SERVER — Entry point
// ============================================
import app from './app.js';
import { logger } from './config/logger.js';

const PORT = process.env['PORT'] ? Number(process.env['PORT']) : 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Health: http://localhost:${PORT}/health`);
  logger.info(`API v1: http://localhost:${PORT}/api/v1/sessions`);
});

// Graceful shutdown
function shutdown(signal: string) {
  logger.info(`${signal} received. Shutting down gracefully...`);
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
