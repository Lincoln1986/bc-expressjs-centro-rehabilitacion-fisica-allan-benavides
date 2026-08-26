# 🏥 Semana 02 — Express Intro

## Centro de Rehabilitación Física — API CRUD con Express

Entrega del proyecto semanal 02: **Express Intro** con el dominio asignado de **Centro de Rehabilitación Física**.

---

## 🎯 Objetivo

Construir una API REST completa con Express 5 y TypeScript sobre el dominio de **sesiones de rehabilitación**, aplicando routing, middlewares y manejo correcto de códigos HTTP.

---

## 🏗️ Dominio

**Centro de Rehabilitación Física**

| Entidad | Recurso |
|---------|---------|
| `Session` | Sesiones de rehabilitación con paciente, terapeuta, categoría, ejercicio y precio |

### Campos de `Session`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `number` | Identificador autoincremental |
| `patientName` | `string` | Nombre del paciente |
| `therapistName` | `string` | Nombre del terapeuta |
| `category` | `string` | Tipo de rehabilitación |
| `exercise` | `string` | Ejercicio realizado |
| `price` | `number` | Costo de la sesión |
| `active` | `boolean` | Si la sesión está activa |

---

## 📁 Estructura del Proyecto

```text
.
├── src/
│   ├── app.ts                    # Configuración Express + middlewares
│   ├── server.ts                 # Entry point + graceful shutdown
│   ├── types.ts                  # Interfaces TypeScript
│   ├── store.ts                  # Store en memoria con CRUD
│   └── routes/
│       └── sessions.routes.ts    # 5 endpoints REST
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## ✅ Endpoints Implementados

| Método | Ruta | Descripción | Status |
|--------|------|-------------|--------|
| GET | `/api/v1/sessions` | Listar todas las sesiones | 200 |
| GET | `/api/v1/sessions/:id` | Obtener sesión por ID | 200 / 404 |
| POST | `/api/v1/sessions` | Crear nueva sesión | 201 |
| PUT | `/api/v1/sessions/:id` | Actualizar sesión | 200 / 404 |
| DELETE | `/api/v1/sessions/:id` | Eliminar sesión | 204 / 404 |

---

## 🛠️ Cómo Ejecutar

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo (con watch)
pnpm dev

# Verificar compilación TypeScript
pnpm build

# Ejecutar en producción
pnpm start
```

---

## 🧪 Pruebas con curl

```bash
# Listar
curl http://localhost:3000/api/v1/sessions

# Crear
curl -X POST http://localhost:3000/api/v1/sessions \
  -H "Content-Type: application/json" \
  -d '{"patientName":"Carlos Mendoza","therapistName":"Dra. Elena Gómez","category":"fisioterapia","exercise":"Rehabilitación de rodilla","price":45,"active":true}'

# Obtener por ID
curl http://localhost:3000/api/v1/sessions/1

# Actualizar
curl -X PUT http://localhost:3000/api/v1/sessions/1 \
  -H "Content-Type: application/json" \
  -d '{"price":50,"active":false}'

# Eliminar
curl -X DELETE http://localhost:3000/api/v1/sessions/1
```

---

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| ← Semana 01: Node.js Fundamentals | **Semana 02: Express Intro** | Semana 03: REST API Arquitectura → |
