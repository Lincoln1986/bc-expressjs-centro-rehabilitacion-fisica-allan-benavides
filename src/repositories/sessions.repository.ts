// ============================================
// REPOSITORY — Acceso a datos con Prisma
// ============================================
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/AppError.js';
import type { CreateSessionDto, UpdateSessionDto } from '../schemas/session.schema.js';

// Obtener todas las sesiones con paginación y relación
export async function findAll(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.session.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { therapist: true },
    }),
    prisma.session.count(),
  ]);

  return { data, total, page, limit };
}

// Obtener una sesión por ID con relación
export async function findById(id: string) {
  return prisma.session.findUnique({
    where: { id },
    include: { therapist: true },
  });
}

// Crear una nueva sesión
export async function create(dto: CreateSessionDto) {
  try {
    return await prisma.session.create({
      data: dto,
      include: { therapist: true },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw new AppError(409, 'Ya existe una sesión con esos datos');
      }
      if (err.code === 'P2025') {
        throw new AppError(404, 'Terapeuta no encontrado');
      }
    }
    throw err;
  }
}

// Actualizar una sesión
export async function update(id: string, dto: UpdateSessionDto) {
  try {
    return await prisma.session.update({
      where: { id },
      data: dto,
      include: { therapist: true },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new AppError(404, `Session ${id} not found`);
      }
      if (err.code === 'P2002') {
        throw new AppError(409, 'Ya existe una sesión con esos datos');
      }
    }
    throw err;
  }
}

// Eliminar una sesión
export async function remove(id: string) {
  try {
    await prisma.session.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new AppError(404, `Session ${id} not found`);
      }
    }
    throw err;
  }
}
