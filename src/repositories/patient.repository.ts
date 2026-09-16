import { PatientModel, IPatient } from '../models/patient.model';
import { CreatePatientDto, UpdatePatientDto } from '../schemas/patient.schema';

// ============================================
// REPOSITORIO DE PACIENTES
// ============================================
// Dominio: Centro de Rehabilitación Física
// ============================================

export async function findAll(): Promise<IPatient[]> {
  return PatientModel.find().sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<IPatient | null> {
  return PatientModel.findById(id);
}

export async function findByEmail(email: string): Promise<IPatient | null> {
  return PatientModel.findOne({ email });
}

export async function create(data: CreatePatientDto, userId: string): Promise<IPatient> {
  return PatientModel.create({ ...data, registeredBy: userId });
}

export async function updateById(
  id: string,
  data: UpdatePatientDto
): Promise<IPatient | null> {
  return PatientModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteById(id: string): Promise<boolean> {
  const result = await PatientModel.findByIdAndDelete(id);
  return result !== null;
}
