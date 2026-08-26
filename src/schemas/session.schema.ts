// ============================================
// SCHEMAS — Validación Zod para sesiones
// ============================================
import { z } from 'zod';

export const createSessionSchema = z.object({
  patientName: z
    .string({ required_error: 'patientName es obligatorio' })
    .min(1, 'patientName no puede estar vacío')
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
  notes: z.string().trim().optional(),
  therapistId: z.string().uuid('therapistId debe ser un UUID válido'),
});

export const updateSessionSchema = createSessionSchema.partial();

export type CreateSessionDto = z.infer<typeof createSessionSchema>;
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;
