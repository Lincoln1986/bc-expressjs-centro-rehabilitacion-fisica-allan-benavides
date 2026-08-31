// ============================================
// ROUTES: Session endpoints
// Centro de Rehabilitación Física
// ============================================

import { Router } from 'express';
import * as sessionController from '../controllers/session.controller';

const router = Router();

router.get('/', sessionController.getAll);
router.get('/:id', sessionController.getById);
router.post('/', sessionController.create);
router.put('/:id', sessionController.update);
router.delete('/:id', sessionController.remove);

export default router;
