import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/requireRole';
import * as adminController from '../controllers/admin.controller';

// ============================================
// RUTAS DE ADMINISTRACIÓN
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 08: RBAC — Solo admins pueden acceder
// ============================================

const router = Router();

// Todas las rutas de este router requieren autenticación + rol admin
router.use(authMiddleware);
router.use(requireRole('admin'));

// GET /api/v1/admin/users — Listar todos los usuarios
router.get('/users', adminController.listUsers);

// GET /api/v1/admin/users/:id — Obtener un usuario por ID
router.get('/users/:id', adminController.getUserById);

// DELETE /api/v1/admin/users/:id — Eliminar un usuario
router.delete('/users/:id', adminController.deleteUser);

// GET /api/v1/admin/stats — Estadísticas del sistema
router.get('/stats', adminController.getStats);

export default router;
