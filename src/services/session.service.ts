// ============================================
// SERVICE: Session business logic
// Centro de Rehabilitación Física
// ============================================

import * as sessionRepository from '../repositories/session.repository';
import { ISession } from '../models/session.model';

export async function getAllSessions(page?: number, limit?: number) {
  return sessionRepository.findAll(page, limit);
}

export async function getSessionById(id: string) {
  return sessionRepository.findById(id);
}

export async function createSession(data: Record<string, unknown>) {
  const sessionData: ISession = {
    patientName: data.patientName as string,
    category: data.category as string,
    exercise: data.exercise as string,
    price: data.price as number,
    therapist: data.therapist as unknown as ISession['therapist'],
    active: data.active as boolean | undefined,
    scheduledAt: data.scheduledAt ? new Date(data.scheduledAt as string) : undefined,
    notes: data.notes as string | undefined,
  };
  return sessionRepository.create(sessionData);
}

export async function updateSession(id: string, data: Record<string, unknown>) {
  const updateData: Partial<ISession> = {};
  if (data.patientName !== undefined) updateData.patientName = data.patientName as string;
  if (data.category !== undefined) updateData.category = data.category as string;
  if (data.exercise !== undefined) updateData.exercise = data.exercise as string;
  if (data.price !== undefined) updateData.price = data.price as number;
  if (data.therapist !== undefined) updateData.therapist = data.therapist as unknown as ISession['therapist'];
  if (data.active !== undefined) updateData.active = data.active as boolean;
  if (data.scheduledAt !== undefined) updateData.scheduledAt = new Date(data.scheduledAt as string);
  if (data.notes !== undefined) updateData.notes = data.notes as string;
  return sessionRepository.update(id, updateData);
}

export async function deleteSession(id: string) {
  return sessionRepository.remove(id);
}
