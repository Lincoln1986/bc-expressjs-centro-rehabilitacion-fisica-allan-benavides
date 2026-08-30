// ============================================
// SCHEMA ZOD: Session validation
// Centro de Rehabilitación Física
// ============================================

import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createSessionSchema = z.object({
  patientName: z.string().min(1, 'El nombre del paciente es requerido').max(150),
  category: z.string().min(1, 'La categoría es requerida').max(100),
  exercise: z.string().min(1, 'El ejercicio es requerido').max(200),
  price: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
  active: z.boolean().optional(),
  scheduledAt: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
  therapist: z.string().regex(objectIdRegex, 'ID de terapeuta inválido'),
});

export const updateSessionSchema = z.object({
  patientName: z.string().min(1).max(150).optional(),
  category: z.string().min(1).max(100).optional(),
  exercise: z.string().min(1).max(200).optional(),
  price: z.number().min(0).optional(),
  active: z.boolean().optional(),
  scheduledAt: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
  therapist: z.string().regex(objectIdRegex, 'ID de terapeuta inválido').optional(),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;
export type UpdateSessionInput = z.infer<typeof updateSessionSchema>;
