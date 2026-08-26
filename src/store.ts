import type { Session, CreateSessionDto, UpdateSessionDto } from './types.js';

// Store en memoria — simula una base de datos sin persistencia
// Los datos se pierden al reiniciar el servidor (se usará BD a partir de week-05)
const sessions: Session[] = [];
let nextId = 1;

// Obtener todas las sesiones
export function getAll(): Session[] {
  return [...sessions];
}

// Obtener una sesión por ID
export function getById(id: number): Session | undefined {
  return sessions.find((s) => s.id === id);
}

// Crear una nueva sesión
export function create(data: CreateSessionDto): Session {
  const newSession: Session = { id: nextId++, ...data };
  sessions.push(newSession);
  return newSession;
}

// Actualizar una sesión existente
export function update(id: number, data: UpdateSessionDto): Session | undefined {
  const index = sessions.findIndex((s) => s.id === id);
  if (index === -1) return undefined;

  sessions[index] = { ...sessions[index], ...data };
  return sessions[index];
}

// Eliminar una sesión
export function remove(id: number): boolean {
  const index = sessions.findIndex((s) => s.id === id);
  if (index === -1) return false;

  sessions.splice(index, 1);
  return true;
}
