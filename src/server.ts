// ============================================
// SERVER — Entry point
// Centro de Rehabilitación Física — Semana 06
// ============================================

import 'dotenv/config';
import { app } from './app';
import { connectDB } from './lib/mongoose';

const PORT = process.env['PORT'] ?? '3000';

async function main(): Promise<void> {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log(`API v1: http://localhost:${PORT}/api/v1/therapists`);
    console.log(`API v1: http://localhost:${PORT}/api/v1/sessions`);
  });
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
