# 🏥 Semana 05 — PostgreSQL + Prisma ORM

## Centro de Rehabilitación Física — API con Prisma

Entrega del proyecto semanal 05: **PostgreSQL + Prisma ORM** con el dominio asignado de **Centro de Rehabilitación Física**.

---

## 🎯 Objetivo

Migrar la API del almacenamiento en memoria a **PostgreSQL** usando **Prisma ORM**, con migraciones versionadas, seed de datos y manejo de errores de base de datos.

---

## 🏗️ Dominio

**Centro de Rehabilitación Física**

### Diagrama de Entidades

```
┌─────────────────────┐       ┌─────────────────────────────┐
│     Therapist       │       │         Session             │
├─────────────────────┤       ├─────────────────────────────┤
│ id (UUID) PK        │──1:N──│ id (UUID) PK                │
│ name                │       │ patientName                 │
│ specialty           │       │ category                    │
│ email (unique)      │       │ exercise                    │
│ phone               │       │ price                       │
│ active              │       │ active                      │
│ createdAt           │       │ scheduledAt                 │
│ updatedAt           │       │ notes                       │
└─────────────────────┘       │ therapistId (FK → Therapist)│
                              │ createdAt                   │
                              │ updatedAt                   │
                              └─────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```text
.
├── docker-compose.yml           # PostgreSQL 16
├── prisma/
│   ├── schema.prisma            # Modelos Therapist + Session
│   ├── seed.ts                  # Datos demo (3 terapeutas, 8 sesiones)
│   └── migrations/              # Migraciones versionadas
├── src/
│   ├── lib/prisma.ts            # Singleton PrismaClient
│   ├── config/logger.ts         # Winston + Morgan
│   ├── errors/AppError.ts       # Clase AppError
│   ├── middlewares/              # errorHandler + notFound
│   ├── schemas/session.schema.ts # Zod validation
│   ├── repositories/             # Prisma CRUD + P2025/P2002
│   ├── services/                 # Lógica de negocio
│   ├── controllers/              # Thin controllers
│   ├── routes/                   # Mapeo URL → controller
│   ├── app.ts                    # Config Express
│   └── server.ts                 # Entry point
├── package.json
├── tsconfig.json
└── .env.example
```

---

## ✅ Requisitos Cumplidos

| Requisito | Estado |
|-----------|--------|
| 2 modelos Prisma (Therapist + Session) | ✅ |
| PKs como UUID (`@default(uuid()) @db.Uuid`) | ✅ |
| Relación 1:N con `@relation` | ✅ |
| Campo `@unique` (email) | ✅ |
| Seed idempotente con 3 terapeutas + 8 sesiones | ✅ |
| Manejo de errores P2025 → 404, P2002 → 409 | ✅ |
| Paginación con `?page&limit` | ✅ |
| Validación Zod con `safeParse()` | ✅ |

---

## 🛠️ Iniciar el Proyecto

```bash
# 1. Levantar PostgreSQL
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Ejecutar migración
pnpm dlx prisma migrate dev --name init

# 5. Ejecutar seed
pnpm dlx prisma db seed

# 6. Iniciar servidor
pnpm dev
```

---

## 🧪 Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/sessions?page=1&limit=10` | Listar con paginación |
| GET | `/api/v1/sessions/:id` | Obtener por ID con terapeuta |
| POST | `/api/v1/sessions` | Crear (validar con Zod) |
| PUT | `/api/v1/sessions/:id` | Actualizar |
| DELETE | `/api/v1/sessions/:id` | Eliminar |

---

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| ← Semana 04: Validación y Errores | **Semana 05: PostgreSQL + Prisma** | Semana 06: MongoDB + Mongoose → |
