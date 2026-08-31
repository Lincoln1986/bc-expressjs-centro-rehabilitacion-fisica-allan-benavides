# 🏥 Semana 06 — MongoDB + Mongoose ORM

## Centro de Rehabilitación Física — API con MongoDB

Entrega del proyecto semanal 06: **MongoDB + Mongoose ORM** con el dominio asignado de **Centro de Rehabilitación Física**.

---

## 🎯 Objetivo

Implementar una API REST completa usando Express 5, TypeScript, Mongoose y MongoDB, con dos entidades relacionadas, paginación, manejo de errores específicos de MongoDB y seed de datos.

---

## 🏗️ Dominio

**Centro de Rehabilitación Física**

### Diagrama de Entidades

```
┌─────────────────────┐       ┌─────────────────────────────┐
│     Therapist       │       │         Session             │
├─────────────────────┤       ├─────────────────────────────┤
│ _id: ObjectId       │◄──1:N─│ _id: ObjectId               │
│ name                │       │ patientName                 │
│ specialty           │       │ category                    │
│ email (unique)      │       │ exercise                    │
│ phone               │       │ price                       │
│ active              │       │ active                      │
│ createdAt           │       │ scheduledAt                 │
│ updatedAt           │       │ notes                       │
└─────────────────────┘       │ therapist (ref → Therapist) │
                              │ createdAt                   │
                              │ updatedAt                   │
                              └─────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```text
.
├── docker-compose.yml           # MongoDB 7
├── src/
│   ├── lib/mongoose.ts          # connectDB / disconnectDB
│   ├── models/
│   │   ├── therapist.model.ts   # Schema Therapist
│   │   └── session.model.ts     # Schema Session (con ref)
│   ├── errors/AppError.ts       # Clase AppError
│   ├── middlewares/              # errorHandler + notFound
│   ├── schemas/
│   │   ├── therapist.schema.ts  # Zod validation
│   │   └── session.schema.ts    # Zod validation con ObjectId
│   ├── repositories/             # Mongoose CRUD + error handling
│   ├── services/                 # Lógica de negocio
│   ├── controllers/              # Thin controllers
│   ├── routes/                   # Mapeo URL → controller
│   ├── app.ts                    # Config Express
│   ├── server.ts                 # Entry point
│   └── seed.ts                   # Datos demo
├── package.json
├── tsconfig.json
└── .env.example
```

---

## ✅ Requisitos Cumplidos

| Requisito | Estado |
|-----------|--------|
| 2 modelos Mongoose (Therapist + Session) | ✅ |
| Referencia ObjectId con `ref` | ✅ |
| `{ timestamps: true }` en ambos schemas | ✅ |
| Campo `unique` (email) | ✅ |
| Seed con 3 terapeutas + 5 sesiones | ✅ |
| Manejo de errores 11000 → 409 | ✅ |
| Manejo de CastError → 400 | ✅ |
| Paginación con `?page&limit` | ✅ |
| Validación Zod con `safeParse()` | ✅ |
| `.lean()` en queries de lectura | ✅ |
| `.populate('therapist')` en Session | ✅ |

---

## 🛠️ Iniciar el Proyecto

```bash
# 1. Levantar MongoDB
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Ejecutar seed
pnpm seed

# 5. Iniciar servidor
pnpm dev
```

---

## 🧪 Endpoints

### Therapists (Entidad Secundaria)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/therapists?page=1&limit=10` | Listar con paginación |
| GET | `/api/v1/therapists/:id` | Obtener por ID |
| POST | `/api/v1/therapists` | Crear (validar con Zod) |
| PUT | `/api/v1/therapists/:id` | Actualizar |
| DELETE | `/api/v1/therapists/:id` | Eliminar |

### Sessions (Entidad Principal)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/sessions?page=1&limit=10` | Listar con paginación + populate |
| GET | `/api/v1/sessions/:id` | Obtener por ID con terapeuta |
| POST | `/api/v1/sessions` | Crear (validar con Zod) |
| PUT | `/api/v1/sessions/:id` | Actualizar |
| DELETE | `/api/v1/sessions/:id` | Eliminar |

---

## 📋 Ejemplos de Request

### Crear Therapist
```bash
POST /api/v1/therapists
Content-Type: application/json

{
  "name": "Dr. Nuevo Terapeuta",
  "specialty": "Fisioterapia Pediátrica",
  "email": "nuevo@rehabilitacion.com",
  "phone": "+57 300 456 7890"
}
```

### Crear Session
```bash
POST /api/v1/sessions
Content-Type: application/json

{
  "patientName": "Nuevo Paciente",
  "category": "Recuperación de Tornillo",
  "exercise": "Movilización articular",
  "price": 70000,
  "therapist": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

---

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| ← Semana 05: PostgreSQL + Prisma | **Semana 06: MongoDB + Mongoose** | Semana 07: Autenticación JWT → |
