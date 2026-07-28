import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Session, FinalReport } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_PATH = join(__dirname, '../data/sessions.json');
const OUTPUT_PATH = join(__dirname, '../output/report.json');

export async function loadSessions(): Promise<Session[]> {
  try {
    const rawData = await readFile(DATA_PATH, 'utf-8');
    const sessions: Session[] = JSON.parse(rawData);
    return sessions;
  } catch (error) {
    throw new Error(`No se pudo leer el archivo de datos en: ${DATA_PATH}`);
  }
}

export async function saveReport(report: FinalReport): Promise<void> {
  try {
    const outputDir = dirname(OUTPUT_PATH);
    await mkdir(outputDir, { recursive: true });
    await writeFile(OUTPUT_PATH, JSON.stringify(report, null, 2), 'utf-8');
  } catch (error) {
    throw new Error('No se pudo guardar el reporte de salida.');
  }
}