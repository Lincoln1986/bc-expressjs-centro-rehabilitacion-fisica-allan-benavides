// ============================================
// REPOSITORY — Acceso a datos en memoria
// ============================================
import type { Session } from '../types/index.js';

export type CreateSessionRepoDto = Omit<Session, 'id' | 'createdAt'>;
export type UpdateSessionRepoDto = Partial<CreateSessionRepoDto>;

// Seed data — sesiones de rehabilitación
let sessions: Session[] = [
  { id: 1, patientName: 'Carlos Mendoza', therapistName: 'Dra. Elena Gómez', category: 'fisioterapia', exercise: 'Rehabilitación de rodilla', price: 45.0, active: true, createdAt: new Date() },
  { id: 2, patientName: 'Ana María Torres', therapistName: 'Dr. Ricardo Silva', category: 'deportiva', exercise: 'Readaptación de hombro', price: 60.0, active: true, createdAt: new Date() },
  { id: 3, patientName: 'Jorge Ramírez', therapistName: 'Dra. Elena Gómez', category: 'neurologica', exercise: 'Estimulación de marcha', price: 75.0, active: false, createdAt: new Date() },
];

let nextId = 4;

export async function findAll(): Promise<Session[]> {
  return [...sessions];
}

export async function findById(id: number): Promise<Session | undefined> {
  const session = sessions.find((s) => s.id === id);
  return session ? { ...session } : undefined;
}

export async function create(dto: CreateSessionRepoDto): Promise<Session> {
  const session: Session = { id: nextId++, ...dto, createdAt: new Date() };
  sessions.push(session);
  return { ...session };
}

export async function update(id: number, dto: UpdateSessionRepoDto): Promise<Session | undefined> {
  const index = sessions.findIndex((s) => s.id === id);
  if (index === -1) return undefined;
  sessions[index] = { ...sessions[index]!, ...dto };
  return { ...sessions[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = sessions.findIndex((s) => s.id === id);
  if (index === -1) return false;
  sessions.splice(index, 1);
  return true;
}
