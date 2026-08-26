// ============================================
// SERVER — Entry point
// ============================================
import { createApp } from './app.js';

const PORT = process.env['PORT'] ?? '3000';
const app = createApp();

const server = app.listen(Number(PORT), () => {
  console.log(`\n╔══════════════════════════════════════════════════════╗`);
  console.log(`║   Centro de Rehabilitación Física — API REST v1     ║`);
  console.log(`║   Arquitectura en 4 capas: routes → ctrl → svc → repo ║`);
  console.log(`╚══════════════════════════════════════════════════════╝\n`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
  console.log(`📋 API v1: http://localhost:${PORT}/api/v1/sessions\n`);
});

// Graceful shutdown
function shutdown(signal: string) {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
