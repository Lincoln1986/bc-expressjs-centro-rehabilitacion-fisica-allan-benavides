import { Request, Response, NextFunction } from 'express';
import * as patientService from '../services/patient.service';
import { createPatientSchema, updatePatientSchema } from '../schemas/patient.schema';

// ============================================
// CONTROLADOR DE PACIENTES
// ============================================
// Dominio: Centro de Rehabilitación Física
// ============================================

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const patients = await patientService.getAll();
    res.status(200).json(patients);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const patient = await patientService.getById(id);
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createPatientSchema.parse(req.body);
    const userId = req.user!.sub;
    const patient = await patientService.create(dto, userId);
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const dto = updatePatientSchema.parse(req.body);
    const patient = await patientService.update(id, dto);
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    await patientService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
