// ============================================
// SCHEMAS — Validación Zod para sesiones
// ============================================
import { z } from 'zod';

// Schema de creación — campos obligatorios
export const createSessionSchema = z.object({
  patientName: z
    .string({ required_error: 'patientName es obligatorio' })
    .min(1, 'patientName no puede estar vacío')
    .trim(),
  therapistName: z
    .string({ required_error: 'therapistName es obligatorio' })
    .min(1, 'therapistName no puede estar vacío')
    .trim(),
  category: z
    .string({ required_error: 'category es obligatorio' })
    .min(1, 'category no puede estar vacío')
    .trim(),
  exercise: z
    .string({ required_error: 'exercise es obligatorio' })
    .min(1, 'exercise no puede estar vacío')
    .trim(),
  price: z
    .number({ required_error: 'price es obligatorio' })
    .positive('price debe ser mayor a 0'),
  active: z.boolean().default(true),
});

// Schema de actualización — todos los campos opcionales
export const updateSessionSchema = createSessionSchema.partial();

// Tipos inferidos desde los schemas (single source of truth)
export type CreateSessionDto = z.infer<typeof createSessionSchema>;
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;
