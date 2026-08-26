// ============================================
// ENTRY POINT — Orquesta todo el flujo
// ============================================

import { loadSessions, saveReport } from './fileManager.js';
import { filterByCategory, calculateSummary, getAvailableCategories } from './processor.js';
import type { FinalReport } from './types.js';

// Parse --category argument from CLI
function parseCategoryFilter(): string | null {
  const args = process.argv.slice(2);
  const categoryIndex = args.indexOf('--category');
  if (categoryIndex !== -1 && args[categoryIndex + 1]) {
    return args[categoryIndex + 1];
  }
  return null;
}

// Main function — orchestrates the entire flow
async function main(): Promise<void> {
  try {
    // 1. Parse CLI arguments
    const categoryFilter = parseCategoryFilter();

    // 2. Read data from JSON file
    const sessions = await loadSessions();

    // 3. Filter by category if provided
    let filteredSessions = sessions;
    if (categoryFilter) {
      const availableCategories = getAvailableCategories(sessions);
      const matchingCategory = availableCategories.find(
        (cat) => cat.toLowerCase() === categoryFilter.toLowerCase()
      );

      if (!matchingCategory) {
        console.error(`\n⚠️  Categoría "${categoryFilter}" no encontrada.`);
        console.error(`📋 Categorías disponibles: ${availableCategories.join(', ')}\n`);
        process.exit(1);
      }

      filteredSessions = filterByCategory(sessions, categoryFilter);
    }

    // 4. Calculate summary
    const summary = calculateSummary(filteredSessions);

    // 5. Build report object
    const report: FinalReport = {
      generatedAt: new Date().toISOString(),
      filterCategory: categoryFilter,
      summary,
      data: filteredSessions,
    };

    // 6. Print summary to console
    console.log('\n╔════════════════════════════════════════════════╗');
    console.log('║   Centro de Rehabilitación Física — Reporte   ║');
    console.log('╚════════════════════════════════════════════════╝\n');

    console.log(`📊 Total de sesiones:     ${summary.totalSessions}`);
    console.log(`✅ Sesiones activas:      ${summary.activeSessions}`);
    console.log(`❌ Sesiones inactivas:    ${summary.inactiveSessions}`);
    console.log(`💰 Precio promedio:       $${summary.averagePrice.toFixed(2)}`);

    if (summary.mostExpensiveSession) {
      console.log(`🔝 Más costosa:           ${summary.mostExpensiveSession.patientName} — $${summary.mostExpensiveSession.price}`);
    }

    if (summary.cheapestSession) {
      console.log(`💲 Más económica:         ${summary.cheapestSession.patientName} — $${summary.cheapestSession.price}`);
    }

    if (categoryFilter) {
      console.log(`\n🔍 Filtro aplicado: "${categoryFilter}"`);
    }

    console.log('');

    // 7. Write report to disk
    await saveReport(report);
    console.log('✅ Reporte generado exitosamente.\n');

  } catch (error) {
    if (error instanceof Error) {
      console.error(`\n❌ Error: ${error.message}\n`);
    } else {
      console.error('\n❌ Error desconocido.\n');
    }
    process.exit(1);
  }
}

// Run the program
main();
