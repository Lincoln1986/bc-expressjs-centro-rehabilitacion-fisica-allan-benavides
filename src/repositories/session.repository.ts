// ============================================
// REPOSITORY: Session CRUD
// Centro de Rehabilitación Física
// ============================================

import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Session, ISession } from '../models/session.model';
import { AppError } from '../errors/AppError';

export interface PaginationResult {
  data: ISession[];
  total: number;
  page: number;
  totalPages: number;
}

export async function findAll(
  page: number = 1,
  limit: number = 10,
): Promise<PaginationResult> {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Session.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('therapist')
      .lean(),
    Session.countDocuments(),
  ]);
  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function findById(id: string): Promise<ISession> {
  try {
    const session = await Session.findById(id).populate('therapist').lean();
    if (!session) {
      throw new AppError(404, 'Sesión no encontrada');
    }
    return session;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}

export async function create(data: ISession): Promise<ISession> {
  try {
    const session = await Session.create(data);
    return session.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Dato duplicado');
    }
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de terapeuta inválido');
    }
    throw err;
  }
}

export async function update(
  id: string,
  data: Partial<ISession>,
): Promise<ISession> {
  try {
    const session = await Session.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!session) {
      throw new AppError(404, 'Sesión no encontrada');
    }
    return session;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Dato duplicado');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const result = await Session.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(404, 'Sesión no encontrada');
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}
