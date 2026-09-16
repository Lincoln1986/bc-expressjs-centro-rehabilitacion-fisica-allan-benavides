# 🧪 Semana 09 — Testing con Jest + Supertest

## 🎯 Objetivos de la Semana

- Configurar Jest con TypeScript usando `ts-jest`
- Escribir tests unitarios para la capa de servicios con mocks
- Escribir tests de integración para endpoints HTTP con Supertest
- Usar `mongodb-memory-server` para tests con MongoDB sin base de datos real
- Medir y configurar umbrales de cobertura de código

---

## 🏛️ Dominio

**Centro de Rehabilitación Física**

### Recursos Testeados

| Recurso | Tipo de Test | Archivo |
|---------|--------------|---------|
| `auth.service.ts` | Unit | `auth.service.test.ts` |
| `patient.service.ts` | Unit | `patient.service.test.ts` |
| Auth Routes | Integration | `auth.integration.test.ts` |
| Patient Routes | Integration | `patient.integration.test.ts` |

---

## 📊 Resumen de Tests

### Unit Tests (21 tests)

#### `auth.service.test.ts` — 10 tests
- ✅ register() — happy path
- ✅ register() — hash de contraseña
- ✅ register() — email duplicado (409)
- ✅ login() — credenciales válidas
- ✅ login() — usuario no existe (401)
- ✅ login() — contraseña incorrecta (401)
- ✅ login() — almacena hash de refresh token
- ✅ getMe() — usuario existe
- ✅ getMe() — usuario no existe (404)
- ✅ logout() — limpia refresh token

#### `patient.service.test.ts` — 11 tests
- ✅ getAll() — retorna todos los pacientes
- ✅ getAll() — array vacío
- ✅ getById() — retorna paciente por ID
- ✅ getById() — no existe (404)
- ✅ create() — crea paciente válido
- ✅ create() — email duplicado (409)
- ✅ update() — actualiza paciente
- ✅ update() — no existe (404)
- ✅ update() — update retorna null (404)
- ✅ remove() — elimina paciente
- ✅ remove() — no existe (404)

### Integration Tests (26 tests)

#### `auth.integration.test.ts` — 13 tests
- ✅ POST /register — 201 con datos válidos
- ✅ POST /register — 409 email duplicado
- ✅ POST /register — 422 datos inválidos
- ✅ POST /register — 422 contraseña débil
- ✅ POST /login — 200 con credenciales válidas
- ✅ POST /login — 401 contraseña incorrecta
- ✅ POST /login — 401 usuario no existe
- ✅ GET /me — 200 con token válido
- ✅ GET /me — 401 sin token
- ✅ GET /me — 401 token inválido
- ✅ POST /logout — 200 y limpia cookies
- ✅ POST /logout — 401 sin token
- ✅ GET /health — 200 status ok

#### `patient.integration.test.ts` — 13 tests
- ✅ GET /patients — 200 array vacío
- ✅ GET /patients — 401 sin auth
- ✅ POST /patients — 201 crea paciente
- ✅ POST /patients — 401 sin auth
- ✅ POST /patients — 409 email duplicado
- ✅ POST /patients — 422 datos inválidos
- ✅ GET /patients/:id — 200 retorna paciente
- ✅ GET /patients/:id — 404 no existe
- ✅ PATCH /patients/:id — 200 actualiza
- ✅ PATCH /patients/:id — 404 no existe
- ✅ DELETE /patients/:id — 204 admin elimina
- ✅ DELETE /patients/:id — 403 user no puede eliminar
- ✅ DELETE /patients/:id — 401 sin auth

---

## 🛠️ Stack de Testing

| Paquete | Versión | Uso |
|---------|---------|-----|
| Jest | 29.7.0 | Test runner |
| ts-jest | 29.3.2 | TypeScript en Jest |
| Supertest | 7.1.0 | Requests HTTP sin servidor |
| mongodb-memory-server | 10.1.4 | MongoDB en RAM para tests |

---

## 🚀 Setup

```bash
# Instalar dependencias
npm install

# Ejecutar todos los tests
npm test

# Ejecutar en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

---

## 📁 Estructura de Tests

```
src/__tests__/
├── setup.ts                    # Conexión MongoDB Memory Server
├── loadEnv.ts                  # Carga .env.test
├── auth.service.test.ts        # Unit tests — auth
├── patient.service.test.ts     # Unit tests — patients
├── auth.integration.test.ts    # Integration tests — auth routes
└── patient.integration.test.ts # Integration tests — patient routes
```

---

## 🔑 Conceptos Clave

### Unit Tests vs Integration Tests

| Característica | Unit Tests | Integration Tests |
|----------------|------------|-------------------|
| Qué testean | Servicio en aislamiento | Ciclo completo HTTP→DB |
| Base de datos | Mockeada (jest.mock) | Real (MongoDB Memory Server) |
| Velocidad | Rápido (~5s) | Más lento (~15s) |
| Dependencias | Mockeadas | Reales |

### Patrón AAA (Arrange, Act, Assert)

```ts
it('should return patient by id', async () => {
  // Arrange — preparar datos y mocks
  const mockPatient = createMockPatient();
  mockFindById.mockResolvedValue(mockPatient);

  // Act — ejecutar la función
  const result = await patientService.getById('patient-id-123');

  // Assert — verificar resultado
  expect(result.firstName).toBe('Juan');
});
```

### Hooks de Ciclo de Vida

```ts
beforeAll(async () => { await connectTestDB(); });   // Una vez al inicio
afterEach(async () => { await clearTestDB(); });      // Después de cada test
afterAll(async () => { await disconnectTestDB(); });  // Una vez al final
```

---

## 📊 Cobertura de Código

```bash
npm run test:coverage
```

Umbrales configurados en `jest.config.js`:
- Statements: 80%
- Branches: 70%
- Functions: 80%
- Lines: 80%

---

## ✅ Checklist de Verificación

- [x] `jest.config.js` configurado con `preset: 'ts-jest'`
- [x] `testEnvironment: 'node'` configurado
- [x] Scripts `test`, `test:watch`, `test:coverage` en package.json
- [x] `mongodb-memory-server` en beforeAll/afterAll
- [x] `clearTestDB()` en afterEach — estado limpio entre tests
- [x] Tests incluyen happy path Y casos de error
- [x] `jest.mock()` usado en unit tests
- [x] `request(app)` importa `app`, no `server`
- [x] Cobertura ≥ 80% statements y lines

---

_Semana 09 completada — Septiembre 2026_
