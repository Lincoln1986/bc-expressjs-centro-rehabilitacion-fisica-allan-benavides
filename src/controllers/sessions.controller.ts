// ============================================
// CONTROLLER — Thin controller (3 pasos)
// ============================================
// 1. Extraer datos de req
// 2. Llamar al service
// 3. Responder con res
// NO contiene lógica de negocio.

import type { Request, Response } from 'express';
import * as service from '../services/sessions.service.js';
import type {
  SingleResponse,
  PaginatedResponse,
  ErrorResponse,
  Session,
} from '../types/index.js';

// GET /api/v1/sessions — Listar con paginación
export async function getAll(req: Request, res: Response): Promise<void> {
  const page = Number(req.query['page'] ?? 1);
  const limit = Number(req.query['limit'] ?? 10);

  const result = await service.getAll({ page, limit });

  const response: PaginatedResponse<Session> = result;
  res.status(200).json(response);
}

// GET /api/v1/sessions/:id — Obtener por ID
export async function getById(req: Request, res: Response): Promise<void> {
  const id = req.params['id'] as string;

  const session = await service.getById(id);
  if (!session) {
    const response: ErrorResponse = {
      error: 'Not Found',
      message: `Session ${id} not found`,
    };
    res.status(404).json(response);
    return;
  }

  const response: SingleResponse<Session> = { data: session };
  res.status(200).json(response);
}

// POST /api/v1/sessions — Crear nuevo recurso
export async function create(req: Request, res: Response): Promise<void> {
  const { patientName, therapistName, category, exercise, price, active } = req.body;

  // Validación básica
  if (!patientName || !therapistName || !category || !exercise || price === undefined) {
    const response: ErrorResponse = {
      error: 'Bad Request',
      message: 'Missing required fields: patientName, therapistName, category, exercise, price',
    };
    res.status(400).json(response);
    return;
  }

  const newSession = await service.create({
    patientName,
    therapistName,
    category,
    exercise,
    price,
    active: active ?? true,
  });

  const response: SingleResponse<Session> = { data: newSession };
  res.status(201).json(response);
}

// PUT /api/v1/sessions/:id — Actualizar recurso
export async function update(req: Request, res: Response): Promise<void> {
  const id = req.params['id'] as string;
  const dto = req.body;

  const updated = await service.update(id, dto);
  if (!updated) {
    const response: ErrorResponse = {
      error: 'Not Found',
      message: `Session ${id} not found`,
    };
    res.status(404).json(response);
    return;
  }

  const response: SingleResponse<Session> = { data: updated };
  res.status(200).json(response);
}

// DELETE /api/v1/sessions/:id — Eliminar recurso
export async function remove(req: Request, res: Response): Promise<void> {
  const id = req.params['id'] as string;

  const deleted = await service.remove(id);
  if (!deleted) {
    const response: ErrorResponse = {
      error: 'Not Found',
      message: `Session ${id} not found`,
    };
    res.status(404).json(response);
    return;
  }

  res.status(204).send();
}
