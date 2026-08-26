# 🏥 Semana 03 — REST API Arquitectura en Capas

## Centro de Rehabilitación Física — API con 4 Capas

Entrega del proyecto semanal 03: **REST API Arquitectura en Capas** con el dominio asignado de **Centro de Rehabilitación Física**.

---

## 🎯 Objetivo

Construir una API REST completa aplicando la arquitectura en 4 capas (`routes → controllers → services → repositories`) con contratos de respuesta tipados en TypeScript.

---

## 🏗️ Dominio

**Centro de Rehabilitación Física**

| Entidad | Recurso |
|---------|---------|
| `Session` | Sesiones de rehabilitación con paciente, terapeuta, categoría, ejercicio y precio |

### Campos de `Session`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `string` | UUID generado automáticamente |
| `patientName` | `string` | Nombre del paciente |
| `therapistName` | `string` | Nombre del terapeuta |
| `category` | `string` | Tipo de rehabilitación |
| `exercise` | `string` | Ejercicio realizado |
| `price` | `number` | Costo de la sesión |
| `active` | `boolean` | Si la sesión está activa |
| `createdAt` | `string` | Fecha de creación (ISO) |

---

## 📁 Estructura del Proyecto (4 Capas)

```text
src/
├── app.ts                              # Configuración Express + middlewares
├── server.ts                           # Entry point + graceful shutdown
├── types/
│   └── index.ts                        # Interfaces, DTOs, contratos de respuesta
├── routes/
│   └── sessions.routes.ts              # Capa 1: Mapeo URL → controller
├── controllers/
│   └── sessions.controller.ts          # Capa 2: Thin controller (req → service → res)
├── services/
│   └── sessions.service.ts             # Capa 3: Lógica de negocio + paginación
└── repositories/
    └── sessions.repository.ts          # Capa 4: Acceso a datos (store en memoria)
```

---

## ✅ Contratos de Respuesta

### Listado paginado — GET `/api/v1/sessions?page=1&limit=5`
```json
{
  "data": [...],
  "total": 20,
  "page": 1,
  "limit": 5
}
```

### Recurso individual — GET `/api/v1/sessions/:id`
```json
{
  "data": { "id": "uuid", "patientName": "...", ... }
}
```

### Error — GET `/api/v1/sessions/999`
```json
{
  "error": "Not Found",
  "message": "Session 999 not found"
}
```

---

## ✅ Endpoints Implementados

| Método | Ruta | Status | Descripción |
|--------|------|--------|-------------|
| GET | `/api/v1/sessions` | 200 | Listar con paginación `?page&limit` |
| GET | `/api/v1/sessions/:id` | 200 / 404 | Obtener por ID |
| POST | `/api/v1/sessions` | 201 | Crear nuevo recurso |
| PUT | `/api/v1/sessions/:id` | 200 / 404 | Actualizar recurso |
| DELETE | `/api/v1/sessions/:id` | 204 / 404 | Eliminar recurso |

---

## 🛠️ Cómo Ejecutar

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Verificar compilación TypeScript
pnpm build
```

---

## 🧪 Pruebas con curl

```bash
# Listar (paginado)
curl "http://localhost:3000/api/v1/sessions?page=1&limit=5"

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
| ← Semana 02: Express Intro | **Semana 03: REST API Arquitectura** | Semana 04: Validación y Error Handling → |
