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
| 06 | MongoDB + Mongoose | ⏳ Pendiente | — |
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
| Prisma | 6.8 | ORM (PostgreSQL) |
| Zod | 3.24 | Validación de datos |
| Winston | 3.17 | Logging |
| Morgan | 1.10 | HTTP logging |
| PostgreSQL | 16 | Base de datos relacional |

---

## 📁 Estructura del Repositorio

```
.
├── week-01/              # Node.js Fundamentals — CLI processor
├── week-02/              # Express Intro — CRUD en memoria
├── week-03/              # REST API — Arquitectura en 4 capas
├── week-04/              # Validación Zod + AppError + Winston
├── week-05/              # PostgreSQL + Prisma ORM
├── .agents/
│   └── WORK_INSTRUCTIONS.md  # Instrucciones de trabajo
└── README.md
```

---

## 🏗️ Arquitectura Actual (Semana 05+)

```
src/
├── lib/prisma.ts            # Singleton PrismaClient
├── config/logger.ts         # Winston + Morgan
├── errors/AppError.ts       # Errores operacionales
├── middlewares/              # errorHandler (4 params) + notFound
├── schemas/                 # Zod validation (create + update)
├── repositories/             # Prisma CRUD + manejo P2025/P2002
├── services/                 # Lógica de negocio
├── controllers/              # Thin controllers (req → service → res)
├── routes/                   # Mapeo URL → controller
├── app.ts                    # Configuración Express + middleware order
└── server.ts                 # Entry point + graceful shutdown
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
git checkout week-05

# Levantar PostgreSQL (solo semana 05+)
docker compose up -d

# Instalar dependencias
pnpm install

# Para semanas 05+: configurar base de datos
cp .env.example .env
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma db seed

# Ejecutar
pnpm dev
```

---

## 📋 Convenciones

- **Ramas**: `week-XX` (una rama por semana)
- **Paquetes**: Solo `pnpm` (nunca npm/yarn)
- **Código**: Inglés (variables, funciones)
- **Documentación**: Español (READMEs)
- **PKs**: UUID (`@default(uuid()) @db.Uuid`)
- **Arquitectura**: 4 capas (routes → controllers → services → repositories)

---

## 🔗 Repositorio Guía

El contenido pedagógico (teoría, prácticas, proyectos) se encuentra en el repositorio guía del bootcamp.

---

_Última actualización: Agosto 2026_
