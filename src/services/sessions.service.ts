// ============================================
// SERVICE — Lógica de negocio
// ============================================
import type { Session, PaginatedResponse } from '../types/index.js';
import * as repo from '../repositories/sessions.repository.js';
import { AppError } from '../errors/AppError.js';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Session>> {
  const { page, limit } = opts;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Session> {
  const session = await repo.findById(id);
  if (!session) throw new AppError(404, `Session ${id} not found`);
  return session;
}

export async function create(dto: repo.CreateSessionRepoDto): Promise<Session> {
  return repo.create(dto);
}

export async function update(id: number, dto: repo.UpdateSessionRepoDto): Promise<Session> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Session ${id} not found`);
  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Session ${id} not found`);
  await repo.remove(id);
}
