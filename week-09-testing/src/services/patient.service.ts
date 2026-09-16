import { IPatient } from '../models/patient.model';
import * as patientRepository from '../repositories/patient.repository';
import { CreatePatientDto, UpdatePatientDto } from '../schemas/patient.schema';
import { AppError } from '../errors/AppError';

// ============================================
// SERVICIO DE PACIENTES
// ============================================
// Dominio: Centro de Rehabilitación Física
// ============================================

export async function getAll(): Promise<IPatient[]> {
  return patientRepository.findAll();
}

export async function getById(id: string): Promise<IPatient> {
  const patient = await patientRepository.findById(id);
  if (!patient) {
    throw new AppError(404, 'Paciente no encontrado');
  }
  return patient;
}

export async function getByEmail(email: string): Promise<IPatient | null> {
  return patientRepository.findByEmail(email);
}

export async function create(
  dto: CreatePatientDto,
  userId: string
): Promise<IPatient> {
  // Verificar que no exista un paciente con el mismo email
  const existing = await patientRepository.findByEmail(dto.email);
  if (existing) {
    throw new AppError(409, 'Ya existe un paciente con este email');
  }
  return patientRepository.create(dto, userId);
}

export async function update(
  id: string,
  dto: UpdatePatientDto
): Promise<IPatient> {
  const patient = await patientRepository.findById(id);
  if (!patient) {
    throw new AppError(404, 'Paciente no encontrado');
  }
  const updated = await patientRepository.updateById(id, dto);
  if (!updated) {
    throw new AppError(404, 'Paciente no encontrado');
  }
  return updated;
}

export async function remove(id: string): Promise<void> {
  const deleted = await patientRepository.deleteById(id);
  if (!deleted) {
    throw new AppError(404, 'Paciente no encontrado');
  }
}
