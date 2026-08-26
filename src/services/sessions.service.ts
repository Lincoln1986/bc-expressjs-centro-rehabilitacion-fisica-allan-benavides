// ============================================
// SERVICE — Lógica de negocio
// ============================================
import * as repo from '../repositories/sessions.repository.js';
import { AppError } from '../errors/AppError.js';
import type { CreateSessionDto, UpdateSessionDto } from '../schemas/session.schema.js';

export async function findAll(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function findById(id: string) {
  const session = await repo.findById(id);
  if (!session) throw new AppError(404, `Session ${id} not found`);
  return session;
}

export async function create(dto: CreateSessionDto) {
  return repo.create(dto);
}

export async function update(id: string, dto: UpdateSessionDto) {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Session ${id} not found`);
  return repo.update(id, dto);
}

export async function remove(id: string) {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Session ${id} not found`);
  await repo.remove(id);
}
