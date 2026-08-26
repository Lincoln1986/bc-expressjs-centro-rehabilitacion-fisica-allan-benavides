# 🏥 Semana 04 — Validación, Errores y Logging

## Centro de Rehabilitación Física — API con Zod, AppError y Winston

Entrega del proyecto semanal 04: **Validación y Manejo de Errores** con el dominio asignado de **Centro de Rehabilitación Física**.

---

## 🎯 Objetivo

Integrar **validación de datos con Zod**, **manejo estructurado de errores con AppError** y **logging profesional con Winston + Morgan** en la API.

---

## 🏗️ Dominio

**Centro de Rehabilitación Física** — Recurso: `Session`

| Campo | Tipo | Validación Zod |
|-------|------|----------------|
| `patientName` | `string` | Obligatorio, min 1, trim |
| `therapistName` | `string` | Obligatorio, min 1, trim |
| `category` | `string` | Obligatorio, min 1, trim |
| `exercise` | `string` | Obligatorio, min 1, trim |
| `price` | `number` | Obligatorio, positivo |
| `active` | `boolean` | Opcional, default: true |

---

## 📁 Estructura del Proyecto

```text
src/
├── config/
│   └── logger.ts                  # Winston logger + Morgan middleware
├── errors/
│   └── AppError.ts                # Clase AppError para errores HTTP
├── middlewares/
│   ├── errorHandler.ts            # Error handler global (4 params)
│   └── notFound.ts                # 404 handler
├── schemas/
│   └── session.schema.ts          # Zod schemas (create + update)
├── repositories/
│   └── sessions.repository.ts     # Store en memoria con seed data
├── services/
│   └── sessions.service.ts        # Lógica de negocio + AppError
├── controllers/
│   └── sessions.controller.ts     # Thin controller con validación
├── routes/
│   └── sessions.routes.ts         # Mapeo URL → controller
├── types/
│   └── index.ts                   # Interfaces y contratos
├── app.ts                         # Configuración Express + middleware order
└── server.ts                      # Entry point + graceful shutdown
```

---

## ✅ Funcionalidades Implementadas

### 1. Validación con Zod
- Schema de creación (`createSessionSchema`) con validaciones
- Schema de actualización (`updateSessionSchema`) con `.partial()`
- Tipos inferidos con `z.infer<>`
- Validación en controller con `.safeParse()`
- Validación del parámetro `:id` con `z.coerce.number()`

### 2. Manejo de errores
- Clase `AppError` con `statusCode` e `isOperational`
- Service lanza `AppError(404, ...)` cuando no existe
- `errorHandler` distingue: `ZodError → 400`, `AppError → statusCode`, genérico → 500
- `notFound` handler para rutas inexistentes

### 3. Logging profesional
- Winston con nivel `http` en dev, `warn` en prod
- Formato colorizado en dev, JSON en prod
- Morgan integrado con stream de Winston
- `logger.info()` al iniciar servidor
- `logger.warn()` para AppErrors

---

## 🛠️ Cómo Ejecutar

```bash
pnpm install
pnpm dev
```

---

## 🧪 Pruebas de error

```bash
# Body inválido → 400 con issues
curl -X POST http://localhost:3000/api/v1/sessions \
  -H "Content-Type: application/json" \
  -d '{"patientName":""}'

# ID no numérico → 400
curl http://localhost:3000/api/v1/sessions/abc

# ID inexistente → 404
curl http://localhost:3000/api/v1/sessions/999

# Ruta inexistente → 404
curl http://localhost:3000/ruta-inexistente
```

---

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| ← Semana 03: REST API Arquitectura | **Semana 04: Validación y Errores** | Semana 05: PostgreSQL + Prisma → |
