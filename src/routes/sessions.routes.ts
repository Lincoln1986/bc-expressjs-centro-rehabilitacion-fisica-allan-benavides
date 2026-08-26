// ============================================
// ROUTES — Registrar los 5 endpoints CRUD
// ============================================
import { Router } from 'express';
import * as controller from '../controllers/sessions.controller.js';

export const sessionsRouter = Router();

sessionsRouter.get('/', controller.getAll);
sessionsRouter.get('/:id', controller.getById);
sessionsRouter.post('/', controller.create);
sessionsRouter.put('/:id', controller.update);
sessionsRouter.delete('/:id', controller.remove);
