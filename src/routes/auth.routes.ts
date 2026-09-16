import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { authLimiter } from '../config/security';

// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 08: Rate limiting en endpoints de auth
// ============================================

const router = Router();

// Rutas públicas — con rate limiting estricto (5 intentos / 15 min)
router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh', authController.refresh);

// Rutas protegidas
router.get('/me', authMiddleware, authController.me);
router.post('/logout', authMiddleware, authController.logout);

export default router;
