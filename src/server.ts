import 'dotenv/config';
import { app } from './app';
import { connectDB } from './lib/mongoose';

const PORT = Number(process.env.PORT) || 3000;

async function main(): Promise<void> {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log(`Auth: http://localhost:${PORT}/api/v1/auth`);
    console.log(`Patients: http://localhost:${PORT}/api/v1/patients`);
  });
}

main().catch((err) => {
  console.error('Fatal error on startup:', err);
  process.exit(1);
});
