// ============================================
// TYPES — Centro de Rehabilitación Física
// ============================================

export interface Session {
  id: number;
  patientName: string;
  therapistName: string;
  category: string;
  exercise: string;
  price: number;
  active: boolean;
  createdAt: Date;
}

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

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}
