// ============================================
// SCHEMA ZOD: Therapist validation
// Centro de Rehabilitación Física
// ============================================

import { z } from 'zod';

export const createTherapistSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  specialty: z.string().min(1, 'La especialidad es requerida').max(100),
  email: z.string().email('Email inválido').max(100),
  phone: z.string().max(20).optional(),
  active: z.boolean().optional(),
});

export const updateTherapistSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  specialty: z.string().min(1).max(100).optional(),
  email: z.string().email('Email inválido').max(100).optional(),
  phone: z.string().max(20).optional(),
  active: z.boolean().optional(),
});

export type CreateTherapistInput = z.infer<typeof createTherapistSchema>;
export type UpdateTherapistInput = z.infer<typeof updateTherapistSchema>;
