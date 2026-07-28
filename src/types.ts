export interface Session {
  id: string;
  patientName: string;
  therapistName: string;
  category: string;
  exercise: string;
  price: number;
  active: boolean;
}

export interface SummaryReport {
  totalSessions: number;
  activeSessions: number;
  inactiveSessions: number;
  averagePrice: number;
  mostExpensiveSession: Session | null;
  cheapestSession: Session | null;
}

export interface FinalReport {
  generatedAt: string;
  filterCategory: string | null;
  summary: SummaryReport;
  data: Session[];
}