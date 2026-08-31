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
| 07 | Autenticación JWT | ⏳ Pendiente | — |
| 08 | Autorización y Seguridad | ⏳ Pendiente | — |
| 09 | Testing | ⏳ Pendiente | — |
| 10 | Uploads y Emails | ⏳ Pendiente | — |
| 11 | WebSockets | ⏳ Pendiente | — |
| 12 | Caching y Performance | ⏳ Pendiente | — |
| 13 | OpenAPI y Swagger | ⏳ Pendiente | — |
| 14 | Docker | ⏳ Pendiente | — |
| 15 | CI/CD y Deployment | ⏳ Pendiente | — |
| 16 | Proyecto Final | ⏳ Pendiente | — |

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Node.js | 22+ | Runtime |
| TypeScript | 5.8 | Tipado estático |
| Express | 5.1 | Framework HTTP |
| Prisma | 6.8 | ORM (PostgreSQL) — Semana 05 |
| Mongoose | 9.4 | ODM (MongoDB) — Semana 06+ |
| Zod | 3.24 | Validación de datos |
| Winston | 3.17 | Logging |
| Morgan | 1.10 | HTTP logging |
| PostgreSQL | 16 | Base de datos relacional |
| MongoDB | 7 | Base de datos NoSQL |

---

## 📁 Estructura del Repositorio

```
.
├── week-01/              # Node.js Fundamentals — CLI processor
├── week-02/              # Express Intro — CRUD en memoria
├── week-03/              # REST API — Arquitectura en 4 capas
├── week-04/              # Validación Zod + AppError + Winston
├── week-05/              # PostgreSQL + Prisma ORM
├── week-06/              # MongoDB + Mongoose ORM
├── .agents/
│   └── WORK_INSTRUCTIONS.md  # Instrucciones de trabajo
└── README.md
```

---

## 🏗️ Arquitectura Actual (Semana 06+)

```
src/
├── lib/
│   ├── prisma.ts            # Singleton PrismaClient (Semana 05)
│   └── mongoose.ts          # connectDB / disconnectDB (Semana 06)
├── config/logger.ts         # Winston + Morgan
├── errors/AppError.ts       # Errores operacionales
├── middlewares/              # errorHandler (4 params) + notFound
├── models/                  # Mongoose schemas (Semana 06+)
│   ├── therapist.model.ts
│   └── session.model.ts
├── schemas/                 # Zod validation (create + update)
├── repositories/             # CRUD + manejo de errores
├── services/                 # Lógica de negocio
├── controllers/              # Thin controllers (req → service → res)
├── routes/                   # Mapeo URL → controller
├── app.ts                    # Configuración Express + middleware order
├── server.ts                 # Entry point + graceful shutdown
└── seed.ts                   # Datos de prueba
```

---

## 🚀 Cómo Ejecutar

```bash
# Clonar repositorio
git clone https://github.com/Lincoln1986/bc-expressjs-centro-rehabilitacion-fisica-allan-benavides.git
cd bc-expressjs-centro-rehabilitacion-fisica-allan-benavides

# Ver ramas disponibles
git branch -a

# Cambiar a la semana que quieras trabajar
git checkout week-06

# Levantar base de datos (MongoDB para semana 06+)
docker compose up -d

# Instalar dependencias
pnpm install

# Ejecutar seed (insertar datos de prueba)
pnpm seed

# Ejecutar
pnpm dev
```

---

## 📋 Convenciones

- **Ramas**: `week-XX` (una rama por semana)
- **Paquetes**: Solo `pnpm` (nunca npm/yarn)
- **Código**: Inglés (variables, funciones)
- **Documentación**: Español (READMEs)
- **PKs**: UUID (`@default(uuid()) @db.Uuid`) en Prisma, ObjectId en Mongoose
- **Arquitectura**: 4 capas (routes → controllers → services → repositories)

---

## 📚 Semana 06 — MongoDB + Mongoose

### Entidades Implementadas

| Entidad | Tipo | Descripción |
|---------|------|-------------|
| `Therapist` | Secundaria | Terapeutas del centro |
| `Session` | Principal | Sesiones de rehabilitación (con ref a Therapist) |

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/therapists?page=1&limit=10` | Listar terapeutas |
| GET | `/api/v1/therapists/:id` | Obtener terapeuta |
| POST | `/api/v1/therapists` | Crear terapeuta |
| PUT | `/api/v1/therapists/:id` | Actualizar terapeuta |
| DELETE | `/api/v1/therapists/:id` | Eliminar terapeuta |
| GET | `/api/v1/sessions?page=1&limit=10` | Listar sesiones (con populate) |
| GET | `/api/v1/sessions/:id` | Obtener sesión con terapeuta |
| POST | `/api/v1/sessions` | Crear sesión |
| PUT | `/api/v1/sessions/:id` | Actualizar sesión |
| DELETE | `/api/v1/sessions/:id` | Eliminar sesión |

### Funcionalidades

- ✅ CRUD completo con Mongoose
- ✅ Paginación con `countDocuments` + `skip/limit`
- ✅ `.populate('therapist')` para obtener terapeuta completo
- ✅ Manejo de errores: 11000 → 409, CastError → 400
- ✅ Validación Zod para todos los endpoints
- ✅ Seed con 3 terapeutas + 5 sesiones

---

## 🔗 Repositorio Guía

El contenido pedagógico (teoría, prácticas, proyectos) se encuentra en el repositorio guía del bootcamp.

---

_Última actualización: Agosto 2026_
