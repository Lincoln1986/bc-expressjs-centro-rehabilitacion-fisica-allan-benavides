import { z } from 'zod';

// ============================================
// SCHEMA DE PACIENTE
// ============================================
// Dominio: Centro de Rehabilitación Física
// ============================================

export const createPatientSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 caracteres'),
  dateOfBirth: z.coerce.date(),
  diagnosis: z.string().min(3, 'El diagnóstico debe tener al menos 3 caracteres'),
  medicalHistory: z.string().optional(),
  emergencyContact: z.string().min(2, 'El contacto de emergencia es requerido'),
  emergencyPhone: z.string().min(8, 'El teléfono de emergencia debe tener al menos 8 caracteres'),
  active: z.boolean().default(true),
});

export const updatePatientSchema = createPatientSchema.partial();

export type CreatePatientDto = z.infer<typeof createPatientSchema>;
export type UpdatePatientDto = z.infer<typeof updatePatientSchema>;
