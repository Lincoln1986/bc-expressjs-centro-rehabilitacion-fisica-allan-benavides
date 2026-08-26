// ============================================
// REPOSITORY — Acceso a datos en memoria
// ============================================
// Única capa que toca el store de datos.
// Todos los métodos son async Promise<T> para facilitar
// la futura migración a una base de datos real.

import type { Session, CreateSessionDto, UpdateSessionDto } from '../types/index.js';

// Store en memoria
const sessions: Session[] = [];

// Obtener todas las sesiones (copia defensiva)
export async function findAll(): Promise<Session[]> {
  return [...sessions];
}

// Obtener una sesión por ID
export async function findById(id: string): Promise<Session | undefined> {
  return sessions.find((s) => s.id === id);
}

// Crear una nueva sesión
export async function create(data: CreateSessionDto): Promise<Session> {
  const newSession: Session = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
  };
  sessions.push(newSession);
  return newSession;
}

// Actualizar una sesión existente
export async function update(id: string, data: UpdateSessionDto): Promise<Session | undefined> {
  const index = sessions.findIndex((s) => s.id === id);
  if (index === -1) return undefined;

  sessions[index] = { ...sessions[index], ...data };
  return sessions[index];
}

// Eliminar una sesión
export async function remove(id: string): Promise<boolean> {
  const index = sessions.findIndex((s) => s.id === id);
  if (index === -1) return false;

  sessions.splice(index, 1);
  return true;
}
