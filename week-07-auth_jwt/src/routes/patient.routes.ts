import { Router } from 'express';
import * as patientController from '../controllers/patient.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

// ============================================
// RUTAS DE PACIENTES
// ============================================
// Dominio: Centro de Rehabilitación Física
// Todas las rutas están protegidas con authMiddleware.
// ============================================

const router = Router();

// Todas las rutas de este router requieren autenticación
router.use(authMiddleware);

// GET /api/v1/patients — listar todos los pacientes
router.get('/', patientController.getAll);

// GET /api/v1/patients/:id — obtener un paciente por ID
router.get('/:id', patientController.getById);

// POST /api/v1/patients — crear un nuevo paciente
router.post('/', patientController.create);

// PATCH /api/v1/patients/:id — actualizar un paciente
router.patch('/:id', patientController.update);

// DELETE /api/v1/patients/:id — eliminar un paciente
router.delete('/:id', patientController.remove);

export default router;
