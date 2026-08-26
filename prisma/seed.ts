// prisma/seed.ts — Datos iniciales del dominio
// Ejecutar con: pnpm dlx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed de Centro de Rehabilitación Física...');

  // Limpiar datos existentes (idempotente)
  await prisma.session.deleteMany();
  await prisma.therapist.deleteMany();

  // Crear terapeutas
  const draElena = await prisma.therapist.create({
    data: {
      name: 'Dra. Elena Gómez',
      specialty: 'Fisioterapia',
      email: 'elena.gomez@rehab.com',
      phone: '+57 300 123 4567',
    },
  });

  const drRicardo = await prisma.therapist.create({
    data: {
      name: 'Dr. Ricardo Silva',
      specialty: 'Rehabilitación Deportiva',
      email: 'ricardo.silva@rehab.com',
      phone: '+57 300 234 5678',
    },
  });

  const licMateo = await prisma.therapist.create({
    data: {
      name: 'Lic. Mateo Ríos',
      specialty: 'Terapia Ocupacional',
      email: 'mateo.rios@rehab.com',
      phone: '+57 300 345 6789',
    },
  });

  console.log(`✅ ${3} terapeutas creados`);

  // Crear sesiones de rehabilitación
  const sessions = await prisma.session.createMany({
    data: [
      { patientName: 'Carlos Mendoza', category: 'fisioterapia', exercise: 'Rehabilitación de rodilla', price: 45.0, therapistId: draElena.id, notes: 'Post-operatorio LCA' },
      { patientName: 'Ana María Torres', category: 'deportiva', exercise: 'Readaptación de hombro', price: 60.0, therapistId: drRicardo.id },
      { patientName: 'Jorge Ramírez', category: 'neurologica', exercise: 'Estimulación de marcha', price: 75.0, therapistId: draElena.id, active: false },
      { patientName: 'Luisa Fernández', category: 'fisioterapia', exercise: 'Fortalecimiento lumbar', price: 40.0, therapistId: draElena.id },
      { patientName: 'Sofía Castro', category: 'deportiva', exercise: 'Recuperación de ligamento', price: 65.0, therapistId: drRicardo.id },
      { patientName: 'Pedro Gutiérrez', category: 'neurologica', exercise: 'Control de equilibrio', price: 80.0, therapistId: draElena.id },
      { patientName: 'Camila Vargas', category: 'terapia-ocupacional', exercise: 'Entrenamiento de actividades diarias', price: 50.0, therapistId: licMateo.id },
      { patientName: 'David Morales', category: 'fisioterapia', exercise: 'Electroestimulación', price: 55.0, therapistId: draElena.id },
    ],
  });

  console.log(`✅ ${sessions.count} sesiones creadas`);
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
