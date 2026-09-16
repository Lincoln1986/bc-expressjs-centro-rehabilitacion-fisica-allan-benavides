# 🏥 Bootcamp Express.js — Centro de Rehabilitación Física

Repositorio con los ejercicios, prácticas y proyectos desarrollados durante el bootcamp de backend con Node.js y Express.js.

**Dominio asignado**: Centro de Rehabilitación Física

---

## 🎯 Dominio del Proyecto

Gestión de sesiones de rehabilitación física para un centro especializado.

| Entidad | Descripción |
|---------|-------------|
| `patients` | Pacientes del centro de rehabilitación |
| `therapists` | Terapeutas/fisioterapeutas que atienden pacientes |
| `sessions` | Sesiones de rehabilitación programadas |
| `exercises` | Ejercicios terapéuticos asignados a pacientes |

---

## 📊 Semanas Completadas

| Semana | Tema | Estado | Rama |
|--------|------|--------|------|
| 01 | Node.js Fundamentals | ✅ Completada | `week-01` |
| 02 | Express Intro | ✅ Completada | `week-02` |
| 03 | REST API Arquitectura en Capas | ✅ Completada | `week-03` |
| 04 | Validación y Error Handling | ✅ Completada | `week-04` |
| 05 | PostgreSQL + Prisma ORM | ✅ Completada | `week-05` |
| 06 | MongoDB + Mongoose | ✅ Completada | `week-06` |
| 07 | Autenticación JWT | ✅ Completada | `week-07` |
| 08 | Autorización y Seguridad | ✅ Completada | `week-08` |
| 09 | Testing | ✅ Completada | `week-09` |
| 10 | Uploads y Emails | ⏳ Pendiente | — |
| 11 | WebSockets | ⏳ Pendiente | — |
| 12 | Caching y Performance | ⏳ Pendiente | — |
| 13 | OpenAPI y Swagger | ⏳ Pendiente | — |
| 14 | Docker | ⏳ Pendiente | — |
| 15 | CI/CD y Deployment | ⏳ Pendiente | — |
| 16 | Proyecto Final | ⏳ Pendiente | — |

---

## 🧪 Suite de Testing

### Unit Tests (21 tests)
- `auth.service.test.ts` — 10 tests
- `patient.service.test.ts` — 11 tests

### Integration Tests (25 tests)
- `auth.integration.test.ts` — 12 tests
- `patient.integration.test.ts` — 13 tests

### Total: 46 tests ✅

### Ejecutar tests
```bash
npm test              # ejecutar todos los tests
npm run test:watch    # modo watch
npm run test:coverage # reporte de cobertura
```

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Node.js | 22+ | Runtime |
| TypeScript | 5.8 | Tipado estático |
| Express | 5.1 | Framework HTTP |
| Mongoose | 9.4 | ODM (MongoDB) |
| Jest | 29.7 | Test runner |
| Supertest | 7.1 | Testing HTTP |
| mongodb-memory-server | 10.1 | MongoDB en RAM |

---

## 🚀 Cómo Ejecutar

```bash
# Clonar repositorio
git clone https://github.com/Lincoln1986/bc-expressjs-centro-rehabilitacion-fisica-allan-benavides.git
cd bc-expressjs-centro-rehabilitacion-fisica-allan-benavides

# Ver ramas disponibles
git branch -a

# Cambiar a la semana que quieras trabajar
git checkout week-09

# Copiar variables de entorno
cp .env.example .env

# Levantar base de datos (MongoDB)
docker compose up -d

# Instalar dependencias
npm install

# Ejecutar
npm run dev
```

---

## 📋 Convenciones

- **Ramas**: `week-XX` (una rama por semana)
- **Código**: Inglés (variables, funciones)
- **Documentación**: Español (READMEs)
- **Arquitectura**: 4 capas (routes → controllers → services → repositories)

---

## 🔗 Repositorio Guía

El contenido pedagógico (teoría, prácticas, proyectos) se encuentra en el repositorio guía del bootcamp.

---

_Semana 09 completada — Septiembre 2026_
