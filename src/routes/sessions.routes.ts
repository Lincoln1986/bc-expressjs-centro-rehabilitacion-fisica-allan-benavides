import { Router } from 'express';
import * as store from '../store.js';
import type { CreateSessionDto, UpdateSessionDto } from '../types.js';

export const sessionsRouter = Router();

// GET /sessions — Listar todas las sesiones
sessionsRouter.get('/', (_req, res) => {
  const sessions = store.getAll();
  res.json(sessions);
});

// GET /sessions/:id — Obtener sesión por ID
sessionsRouter.get('/:id', (req, res) => {
  const id = Number(req.params['id']);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  const session = store.getById(id);
  if (!session) {
    res.status(404).json({ error: 'Session not found' });
    return;
  }

  res.json(session);
});

// POST /sessions — Crear nueva sesión
sessionsRouter.post('/', (req, res) => {
  const dto: CreateSessionDto = req.body;

  // Validación básica
  if (!dto.patientName || !dto.therapistName || !dto.category || !dto.exercise || dto.price === undefined) {
    res.status(400).json({ error: 'Missing required fields: patientName, therapistName, category, exercise, price' });
    return;
  }

  const newSession = store.create(dto);
  res.status(201).json(newSession);
});

// PUT /sessions/:id — Actualizar sesión completa
sessionsRouter.put('/:id', (req, res) => {
  const id = Number(req.params['id']);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  const dto: UpdateSessionDto = req.body;
  const updated = store.update(id, dto);

  if (!updated) {
    res.status(404).json({ error: 'Session not found' });
    return;
  }

  res.json(updated);
});

// DELETE /sessions/:id — Eliminar sesión
sessionsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params['id']);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  const deleted = store.remove(id);
  if (!deleted) {
    res.status(404).json({ error: 'Session not found' });
    return;
  }

  res.status(204).send();
});
