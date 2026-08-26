// ============================================
// SERVICE — Lógica de negocio
// ============================================
// Contiene la lógica de paginación y validaciones de dominio.
// NO tiene imports de Express.

import type {
  Session,
  CreateSessionDto,
  UpdateSessionDto,
  PaginationParams,
  PaginatedResponse,
} from '../types/index.js';
import * as repository from '../repositories/sessions.repository.js';

// Listar sesiones con paginación
export async function getAll(
  params: PaginationParams
): Promise<PaginatedResponse<Session>> {
  const allSessions = await repository.findAll();
  const { page, limit } = params;

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedSessions = allSessions.slice(start, end);

  return {
    data: paginatedSessions,
    total: allSessions.length,
    page,
    limit,
  };
}

// Obtener una sesión por ID
export async function getById(id: string): Promise<Session | undefined> {
  return repository.findById(id);
}

// Crear una nueva sesión
export async function create(data: CreateSessionDto): Promise<Session> {
  return repository.create(data);
}

// Actualizar una sesión existente
export async function update(
  id: string,
  data: UpdateSessionDto
): Promise<Session | undefined> {
  return repository.update(id, data);
}

// Eliminar una sesión
export async function remove(id: string): Promise<boolean> {
  return repository.remove(id);
}
