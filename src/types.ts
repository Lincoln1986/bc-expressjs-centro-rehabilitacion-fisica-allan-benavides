// ============================================
// TYPES: Interfaz del recurso principal
// ============================================
// Dominio: Centro de Rehabilitación Física
// Recurso: Sesiones de rehabilitación

export interface Session {
  id: number;
  patientName: string;
  therapistName: string;
  category: string;
  exercise: string;
  price: number;
  active: boolean;
}

// DTO para crear una nueva sesión (sin id, se genera automáticamente)
export type CreateSessionDto = Omit<Session, 'id'>;

// DTO para actualización (todos los campos editables)
export type UpdateSessionDto = Partial<CreateSessionDto>;
