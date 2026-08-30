// ============================================
// SERVICE: Therapist business logic
// Centro de Rehabilitación Física
// ============================================

import * as therapistRepository from '../repositories/therapist.repository';
import { ITherapist } from '../models/therapist.model';

export async function getAllTherapists(page?: number, limit?: number) {
  return therapistRepository.findAll(page, limit);
}

export async function getTherapistById(id: string) {
  return therapistRepository.findById(id);
}

export async function createTherapist(data: ITherapist) {
  return therapistRepository.create(data);
}

export async function updateTherapist(id: string, data: Partial<ITherapist>) {
  return therapistRepository.update(id, data);
}

export async function deleteTherapist(id: string) {
  return therapistRepository.remove(id);
}
