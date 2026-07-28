import type { Session, SummaryReport } from './types.js';

export function calculateSummary(sessions: Session[]): SummaryReport {
  if (sessions.length === 0) {
    return {
      totalSessions: 0,
      activeSessions: 0,
      inactiveSessions: 0,
      averagePrice: 0,
      mostExpensiveSession: null,
      cheapestSession: null,
    };
  }

  const activeSessions = sessions.filter((s) => s.active).length;
  const inactiveSessions = sessions.filter((s) => !s.active).length;

  const totalPrice = sessions.reduce((acc, s) => acc + s.price, 0);
  const averagePrice = Number((totalPrice / sessions.length).toFixed(2));

  const mostExpensiveSession = sessions.reduce((max, s) =>
    s.price > max.price ? s : max
  );

  const cheapestSession = sessions.reduce((min, s) =>
    s.price < min.price ? s : min
  );

  return {
    totalSessions: sessions.length,
    activeSessions,
    inactiveSessions,
    averagePrice,
    mostExpensiveSession,
    cheapestSession,
  };
}

export function filterByCategory(
  sessions: Session[],
  category: string
): Session[] {
  return sessions.filter(
    (s) => s.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAvailableCategories(sessions: Session[]): string[] {
  const categories = sessions.map((s) => s.category.toLowerCase());
  return Array.from(new Set(categories));
}