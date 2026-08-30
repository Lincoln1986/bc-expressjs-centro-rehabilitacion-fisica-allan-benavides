// ============================================
// CONTROLLER: Session endpoints
// Centro de Rehabilitación Física
// ============================================

import { Request, Response, NextFunction } from 'express';
import * as sessionService from '../services/session.service';
import {
  createSessionSchema,
  updateSessionSchema,
} from '../schemas/session.schema';

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const page = Number(req.query['page']) || 1;
    const limit = Number(req.query['limit']) || 10;
    const result = await sessionService.getAllSessions(page, limit);
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
    const session = await sessionService.getSessionById(id);
    res.json({ data: session });
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
    const parsed = createSessionSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }
    const session = await sessionService.createSession(parsed.data);
    res.status(201).json({ data: session });
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
    const parsed = updateSessionSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }
    const session = await sessionService.updateSession(id, parsed.data);
    res.json({ data: session });
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
    await sessionService.deleteSession(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
