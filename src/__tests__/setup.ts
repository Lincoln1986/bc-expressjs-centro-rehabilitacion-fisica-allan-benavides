import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// ============================================
// TEST SETUP — MongoDB Memory Server
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 09: Testing con Jest + Supertest
// ============================================

let mongoServer: MongoMemoryServer;

/**
 * Conectar a MongoDB Memory Server antes de TODOS los tests.
 */
export async function connectTestDB(): Promise<void> {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}

/**
 * Limpiar todas las colecciones entre tests.
 * Mantiene la conexión pero elimina los datos.
 */
export async function clearTestDB(): Promise<void> {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

/**
 * Desconectar y destruir la instancia de MongoDB.
 */
export async function disconnectTestDB(): Promise<void> {
  await mongoose.disconnect();
  await mongoServer.stop();
}
