// ============================================
// ROUTES — Mapeo URL → controller
// ============================================
// Solo mapea Método HTTP + URL → función del controller.
// No contiene lógica.

import { Router } from 'express';
import * as controller from '../controllers/sessions.controller.js';

export const sessionsRouter = Router();

// GET /api/v1/sessions — Listar con paginación
sessionsRouter.get('/', controller.getAll);

// GET /api/v1/sessions/:id — Obtener por ID
sessionsRouter.get('/:id', controller.getById);

// POST /api/v1/sessions — Crear nuevo recurso
sessionsRouter.post('/', controller.create);

// PUT /api/v1/sessions/:id — Actualizar recurso
sessionsRouter.put('/:id', controller.update);

// DELETE /api/v1/sessions/:id — Eliminar recurso
sessionsRouter.delete('/:id', controller.remove);
