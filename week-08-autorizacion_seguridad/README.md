# 🛡️ Semana 08 — Autorización y Seguridad

## 🎯 Objetivos de la Semana

- Implementar **RBAC** (Role-Based Access Control) con middleware `requireRole()`
- Aplicar **Helmet** para configurar cabeceras HTTP de seguridad
- Implementar **rate limiting** con `express-rate-limit` en endpoints públicos y de autenticación
- Configurar **CORS** correctamente para ambientes de desarrollo y producción
- Sanitizar inputs para prevenir **NoSQL injection** con `express-mongo-sanitize`

---

## 🏛️ Dominio

**Centro de Rehabilitación Física**

### Roles del Sistema

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| `user` | Terapeuta/usuario regular | Ver, crear y editar pacientes |
| `admin` | Administrador del centro | Todos los permisos + eliminar pacientes + gestionar usuarios |

---

## 📋 Endpoints Implementados

### Autenticación (`/api/v1/auth`)

| Método | Ruta | Acceso | Rate Limit |
|--------|------|--------|------------|
| POST | `/register` | Público | 5 req/15min |
| POST | `/login` | Público | 5 req/15min |
| POST | `/refresh` | Público | — |
| GET | `/me` | Autenticado | — |
| POST | `/logout` | Autenticado | — |

### Pacientes (`/api/v1/patients`)

| Método | Ruta | Acceso | RBAC |
|--------|------|--------|------|
| GET | `/` | Autenticado | Cualquier rol |
| GET | `/:id` | Autenticado | Cualquier rol |
| POST | `/` | Autenticado | Cualquier rol |
| PATCH | `/:id` | Autenticado | Cualquier rol |
| DELETE | `/:id` | Autenticado | Solo `admin` |

### Administración (`/api/v1/admin`)

| Método | Ruta | Acceso | RBAC |
|--------|------|--------|------|
| GET | `/users` | Autenticado | Solo `admin` |
| GET | `/users/:id` | Autenticado | Solo `admin` |
| DELETE | `/users/:id` | Autenticado | Solo `admin` |
| GET | `/stats` | Autenticado | Solo `admin` |

### Health Check

| Método | Ruta | Acceso |
|--------|------|--------|
| GET | `/health` | Público |

---

## 🔒 Capas de Seguridad Implementadas

### 1. Helmet — Cabeceras HTTP

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
Content-Security-Policy: ...
Cross-Origin-Opener-Policy: same-origin
Referrer-Policy: no-referrer
```

### 2. Rate Limiting

- **Global**: 100 requests por IP cada 15 minutos
- **Auth** (login/register): 5 intentos por IP cada 15 minutos
- Headers: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`

### 3. CORS

- Whitelist de orígenes: `localhost:3000`, `localhost:5173`, `localhost:3001`
- `credentials: true` para cookies HttpOnly
- Preflight requests manejados

### 4. NoSQL Injection Sanitization

- `express-mongo-sanitize` elimina operadores MongoDB (`$gt`, `$where`, etc.)
- Aplicado después de `express.json()` y antes de las rutas

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Helmet | 8.0.0 | Cabeceras HTTP de seguridad |
| CORS | 2.8.5 | Control de acceso cross-origin |
| express-rate-limit | 7.5.0 | Limitación de tasa |
| express-mongo-sanitize | 2.2.0 | Sanitización NoSQL injection |

---

## 🚀 Setup

```bash
# Copiar variables de entorno
cp .env.example .env

# Levantar MongoDB
docker compose up -d

# Instalar dependencias
pnpm install

# Ejecutar seed (crear usuarios de prueba)
pnpm seed

# Ejecutar servidor
pnpm dev
```

---

## 🧪 Pruebas con Thunder Client / Postman

### 1. Login como user
```
POST http://localhost:3000/api/v1/auth/login
Body: { "email": "user@test.com", "password": "User1234!" }
Esperado: 200 OK + cookie accessToken
```

### 2. Acceder a ruta de usuario (debe funcionar)
```
GET http://localhost:3000/api/v1/patients
Cookie: (la que recibiste en el login)
Esperado: 200 OK
```

### 3. Intentar eliminar paciente con rol user (debe fallar)
```
DELETE http://localhost:3000/api/v1/patients/123
Cookie: (la que recibiste en el login de user)
Esperado: 403 Forbidden
```

### 4. Login como admin
```
POST http://localhost:3000/api/v1/auth/login
Body: { "email": "admin@test.com", "password": "Admin1234!" }
Esperado: 200 OK + cookie accessToken
```

### 5. Eliminar paciente con rol admin (debe funcionar)
```
DELETE http://localhost:3000/api/v1/patients/123
Cookie: (la que recibiste en el login de admin)
Esperado: 204 No Content
```

### 6. Verificar Rate Limiting
```
POST http://localhost:3000/api/v1/auth/login (6 veces seguidas)
Esperado: 6to request → 429 Too Many Requests
```

### 7. Verificar NoSQL Injection
```
POST http://localhost:3000/api/v1/auth/login
Body: { "email": { "$gt": "" }, "password": { "$gt": "" } }
Esperado: 401 Credenciales inválidas (sanitizado)
```

---

## 📁 Estructura de Archivos Nuevos

```
src/
├── config/
│   └── security.ts          ← Rate limiters + CORS options
├── middlewares/
│   ├── auth.middleware.ts    ← Semana 07 (existente)
│   └── requireRole.ts       ← RBAC middleware (NUEVO)
├── routes/
│   ├── admin.routes.ts      ← Rutas admin (NUEVO)
│   ├── auth.routes.ts       ← Actualizado con authLimiter
│   └── patient.routes.ts    ← Actualizado con requireRole en DELETE
├── controllers/
│   └── admin.controller.ts  ← Controlador admin (NUEVO)
├── services/
│   └── admin.service.ts     ← Servicio admin (NUEVO)
└── app.ts                   ← Actualizado con todas las capas de seguridad
```

---

## 🔑 Conceptos Clave

### Autenticación vs Autorización

| Concepto | Pregunta | Herramienta |
|----------|----------|-------------|
| **Autenticación** | ¿Quién eres? | JWT + bcrypt |
| **Autorización** | ¿Qué puedes hacer? | RBAC + `requireRole` |

### Flujo de Request

```
Request → Helmet → CORS → Rate Limit → authMiddleware → requireRole() → controller
```

### Diferencia entre 401 y 403

| Código | Significado | Cuándo usarlo |
|--------|-------------|---------------|
| **401 Unauthorized** | Sin autenticación válida | No hay token, o token expirado |
| **403 Forbidden** | Autenticado pero sin permiso | Token válido, pero rol insuficiente |

---

## ✅ Checklist de Seguridad Completo

- [x] authMiddleware en todas las rutas privadas
- [x] requireRole() en rutas que necesitan rol (DELETE patients, admin routes)
- [x] Helmet aplicado como primer middleware
- [x] CORS con whitelist de orígenes
- [x] Rate limit en endpoints de auth (5/15min)
- [x] Rate limit global (100/15min)
- [x] express-mongo-sanitize después de json()
- [x] Errores sin stack trace en producción (AppError)
- [x] Variables de entorno validadas
- [x] Contraseñas hasheadas con bcrypt
- [x] Refresh tokens hasheados en DB
- [x] Cookies HttpOnly + Secure + SameSite
- [x] JWT secrets distintos para access y refresh

---

_Semana 08 completada — Septiembre 2026_
