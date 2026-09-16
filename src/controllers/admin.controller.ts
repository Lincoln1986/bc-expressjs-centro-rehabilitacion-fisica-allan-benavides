import { Request, Response, NextFunction } from 'express';
import * as adminService from '../services/admin.service';

// ============================================
// CONTROLADOR DE ADMINISTRACIÓN
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 08: RBAC — Solo accesible por admins
// ============================================

export async function listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await adminService.listUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const user = await adminService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    await adminService.deleteUser(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const stats = await adminService.getStats();
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
}
