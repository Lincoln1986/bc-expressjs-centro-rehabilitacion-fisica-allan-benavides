// ============================================
// CONTROLLER: Therapist endpoints
// Centro de Rehabilitación Física
// ============================================

import { Request, Response, NextFunction } from 'express';
import * as therapistService from '../services/therapist.service';
import {
  createTherapistSchema,
  updateTherapistSchema,
} from '../schemas/therapist.schema';

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const page = Number(req.query['page']) || 1;
    const limit = Number(req.query['limit']) || 10;
    const result = await therapistService.getAllTherapists(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = req.params['id'] as string;
    const therapist = await therapistService.getTherapistById(id);
    res.json({ data: therapist });
  } catch (err) {
    next(err);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = createTherapistSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }
    const therapist = await therapistService.createTherapist(parsed.data);
    res.status(201).json({ data: therapist });
  } catch (err) {
    next(err);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = req.params['id'] as string;
    const parsed = updateTherapistSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }
    const therapist = await therapistService.updateTherapist(id, parsed.data);
    res.json({ data: therapist });
  } catch (err) {
    next(err);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = req.params['id'] as string;
    await therapistService.deleteTherapist(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
