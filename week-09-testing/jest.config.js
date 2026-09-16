/** @type {import('jest').Config} */
const config = {
  // ts-jest transforma archivos .ts antes de ejecutarlos
  preset: 'ts-jest',

  // Node.js como entorno de ejecución (no browser)
  testEnvironment: 'node',

  // Patrón para encontrar archivos de test
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.spec.ts'],

  // Cargar variables de entorno antes de cada test
  setupFiles: ['<rootDir>/src/__tests__/loadEnv.ts'],

  // Excluir node_modules y dist del escaneo
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',          // entry point — no testear
    '!src/types/**',           // solo declaraciones
    '!src/**/*.d.ts',
    '!src/__tests__/**',       // excluir tests de cobertura
  ],

  // Umbrales de cobertura mínima (falla si no se alcanza)
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
      branches: 70,
      statements: 80,
    },
  },

  // Limpiar mocks automáticamente entre tests
  clearMocks: true,

  // Timeout para tests con mongodb-memory-server
  testTimeout: 30000,
};

module.exports = config;
