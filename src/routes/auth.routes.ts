import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 07: Autenticación JWT
// ============================================

const router = Router();

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

// Rutas protegidas
router.get('/me', authMiddleware, authController.me);
router.post('/logout', authMiddleware, authController.logout);

export default router;
