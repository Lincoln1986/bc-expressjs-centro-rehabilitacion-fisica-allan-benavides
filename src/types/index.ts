// ============================================
// TYPES — Centro de Rehabilitación Física
// ============================================

// Entity: Session
export interface Session {
  id: string;
  patientName: string;
  therapistName: string;
  category: string;
  exercise: string;
  price: number;
  active: boolean;
  createdAt: string;
}

// DTOs
export type CreateSessionDto = Omit<Session, 'id' | 'createdAt'>;
export type UpdateSessionDto = Partial<CreateSessionDto>;

// Response contracts
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
