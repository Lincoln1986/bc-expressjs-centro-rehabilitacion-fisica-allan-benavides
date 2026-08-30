// ============================================
// REPOSITORY: Therapist CRUD
// Centro de Rehabilitación Física
// ============================================

import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Therapist, ITherapist } from '../models/therapist.model';
import { AppError } from '../errors/AppError';

export interface PaginationResult {
  data: ITherapist[];
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
    Therapist.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Therapist.countDocuments(),
  ]);
  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function findById(id: string): Promise<ITherapist> {
  try {
    const therapist = await Therapist.findById(id).lean();
    if (!therapist) {
      throw new AppError(404, 'Terapeuta no encontrado');
    }
    return therapist;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}

export async function create(data: ITherapist): Promise<ITherapist> {
  try {
    const therapist = await Therapist.create(data);
    return therapist.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'El email ya está registrado');
    }
    throw err;
  }
}

export async function update(
  id: string,
  data: Partial<ITherapist>,
): Promise<ITherapist> {
  try {
    const therapist = await Therapist.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!therapist) {
      throw new AppError(404, 'Terapeuta no encontrado');
    }
    return therapist;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'El email ya está registrado');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const result = await Therapist.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(404, 'Terapeuta no encontrado');
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}
