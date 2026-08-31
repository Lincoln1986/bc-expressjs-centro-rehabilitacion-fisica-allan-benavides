// ============================================
// SEED — Insertar datos de prueba
// Centro de Rehabilitación Física — Semana 06
// ============================================

import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Therapist } from './models/therapist.model';
import { Session } from './models/session.model';

async function seed(): Promise<void> {
  await connectDB();

  // Limpiar colecciones (orden inverso)
  await Session.deleteMany({});
  await Therapist.deleteMany({});
  console.log('Collections cleared');

  // Paso A: Insertar terapeutas y capturar _id
  const [terapeuta1, terapeuta2, terapeuta3] = await Therapist.insertMany([
    {
      name: 'Dr. Carlos Mendoza',
      specialty: 'Fisioterapia Deportiva',
      email: 'carlos.mendoza@rehabilitacion.com',
      phone: '+57 300 123 4567',
      active: true,
    },
    {
      name: 'Dra. Ana García',
      specialty: 'Rehabilitación Neurológica',
      email: 'ana.garcia@rehabilitacion.com',
      phone: '+57 300 234 5678',
      active: true,
    },
    {
      name: 'Dr. Luis Rodríguez',
      specialty: 'Fisioterapia Musculoesquelética',
      email: 'luis.rodriguez@rehabilitacion.com',
      phone: '+57 300 345 6789',
      active: true,
    },
  ]);
  console.log('Therapists inserted');

  // Paso B: Insertar sesiones referenciando los _id
  await Session.insertMany([
    {
      patientName: 'Juan Pérez',
      category: 'Recuperación de Rodilla',
      exercise: 'Ejercicios de movilidad pasiva',
      price: 85000,
      active: true,
      scheduledAt: new Date('2026-09-01T09:00:00Z'),
      notes: 'Post operatorio LCA',
      therapist: terapeuta1._id,
    },
    {
      patientName: 'María López',
      category: 'Rehabilitación Lumbar',
      exercise: 'Fortalecimiento del core',
      price: 75000,
      active: true,
      scheduledAt: new Date('2026-09-01T10:30:00Z'),
      notes: 'Hernia discal L4-L5',
      therapist: terapeuta2._id,
    },
    {
      patientName: 'Pedro Sánchez',
      category: 'Recuperación de Hombro',
      exercise: 'Rango de movimiento activo',
      price: 80000,
      active: true,
      scheduledAt: new Date('2026-09-01T14:00:00Z'),
      therapist: terapeuta1._id,
    },
    {
      patientName: 'Laura Martínez',
      category: 'Rehabilitación Neurológica',
      exercise: 'Coordinación y equilibrio',
      price: 95000,
      active: true,
      scheduledAt: new Date('2026-09-02T08:00:00Z'),
      notes: 'Paciente en fase de recuperación',
      therapist: terapeuta2._id,
    },
    {
      patientName: 'Andrés Gómez',
      category: 'Fortalecimiento Muscular',
      exercise: 'Ejercicios con resistencia',
      price: 70000,
      active: true,
      scheduledAt: new Date('2026-09-02T11:00:00Z'),
      therapist: terapeuta3._id,
    },
  ]);
  console.log('Sessions inserted');

  console.log('Seed completed successfully');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
