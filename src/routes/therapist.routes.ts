// ============================================
// ROUTES: Therapist endpoints
// Centro de Rehabilitación Física
// ============================================

import { Router } from 'express';
import * as therapistController from '../controllers/therapist.controller';

const router = Router();

router.get('/', therapistController.getAll);
router.get('/:id', therapistController.getById);
router.post('/', therapistController.create);
router.put('/:id', therapistController.update);
router.delete('/:id', therapistController.remove);

export default router;
