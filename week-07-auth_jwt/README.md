# 🏥 Semana 07 — Autenticación JWT — Centro de Rehabilitación Física

## 🎯 Objetivo

Implementar un sistema de autenticación completo con **bcrypt**, **JWT access/refresh tokens** y **cookies HttpOnly**, aplicado al dominio de Centro de Rehabilitación Física.

## 📋 Dominio

**Centro de Rehabilitación Física**

| Entidad | Descripción |
|---------|-------------|
| `patients` | Pacientes del centro de rehabilitación |
| `therapists` | Terapeutas/fisioterapeutas |
| `sessions` | Sesiones de rehabilitación |
| `exercises` | Ejercicios terapéuticos |

## ✅ Endpoints Implementados

### Autenticación

| Método | Ruta | Descripción | Autenticado |
|--------|------|-------------|-------------|
| POST | `/api/v1/auth/register` | Registro de usuario | ❌ |
| POST | `/api/v1/auth/login` | Login con cookies HttpOnly | ❌ |
| POST | `/api/v1/auth/refresh` | Renovar access token | ❌ |
| GET | `/api/v1/auth/me` | Perfil del usuario | ✅ |
| POST | `/api/v1/auth/logout` | Cerrar sesión | ✅ |

### Pacientes (Recurso Principal)

| Método | Ruta | Descripción | Autenticado |
|--------|------|-------------|-------------|
| GET | `/api/v1/patients` | Listar todos los pacientes | ✅ |
| GET | `/api/v1/patients/:id` | Obtener paciente por ID | ✅ |
| POST | `/api/v1/patients` | Crear nuevo paciente | ✅ |
| PATCH | `/api/v1/patients/:id` | Actualizar paciente | ✅ |
| DELETE | `/api/v1/patients/:id` | Eliminar paciente | ✅ |

## 🏗️ Estructura del Proyecto

```
week-07-auth_jwt/
├── src/
│   ├── app.ts                    # Configuración Express
│   ├── server.ts                 # Entry point
│   ├── lib/
│   │   └── mongoose.ts           # Conexión a MongoDB
│   ├── errors/
│   │   └── AppError.ts           # Clase de error
│   ├── types/
│   │   └── express.d.ts          # Tipos extendidos
│   ├── utils/
│   │   └── jwt.ts                # Funciones JWT
│   ├── middlewares/
│   │   ├── auth.middleware.ts    # Middleware de autenticación
│   │   ├── errorHandler.ts       # Manejo global de errores
│   │   └── notFound.ts          # Ruta no encontrada
│   ├── models/
│   │   ├── user.model.ts         # Modelo de usuario
│   │   └── patient.model.ts      # Modelo de paciente
│   ├── schemas/
│   │   ├── auth.schema.ts        # Schemas de autenticación
│   │   └── patient.schema.ts     # Schemas de paciente
│   ├── repositories/
│   │   ├── users.repository.ts   # Operaciones de usuario
│   │   └── patient.repository.ts # Operaciones de paciente
│   ├── services/
│   │   ├── auth.service.ts       # Lógica de autenticación
│   │   └── patient.service.ts    # Lógica de pacientes
│   ├── controllers/
│   │   ├── auth.controller.ts    # Handlers de auth
│   │   └── patient.controller.ts # Handlers de pacientes
│   └── routes/
│       ├── auth.routes.ts        # Rutas de auth
│       └── patient.routes.ts     # Rutas de pacientes
├── docker-compose.yml            # MongoDB
├── package.json
├── tsconfig.json
└── .env.example
```

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus secretos JWT
# Generar secretos con: openssl rand -base64 64

# Levantar MongoDB
docker compose up -d

# Ejecutar el servidor
npm run dev
```

## 🔒 Características de Seguridad

- ✅ Contraseñas hasheadas con bcrypt (salt rounds 10)
- ✅ Access token (15 min) + Refresh token (7 días)
- ✅ Tokens almacenados en cookies HttpOnly
- ✅ Refresh token hasheado en base de datos
- ✅ Rotación de refresh token en cada renovación
- ✅ Rutas protegidas con middleware de autenticación
- ✅ Prevención de user enumeration attacks

## 📝 Modelo de Paciente

```typescript
interface IPatient {
  firstName: string;      // Nombre
  lastName: string;       // Apellido
  email: string;          // Email (único)
  phone: string;          // Teléfono
  dateOfBirth: Date;      // Fecha de nacimiento
  diagnosis: string;      // Diagnóstico
  medicalHistory?: string; // Historial médico (opcional)
  emergencyContact: string; // Contacto de emergencia
  emergencyPhone: string;  // Teléfono de emergencia
  active: boolean;         // Estado activo
  registeredBy: ObjectId;  // Usuario que registró
}
```

## 🧪 Pruebas

```bash
# 1. Registrar usuario
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Password123","name":"Test User"}'

# 2. Login (guardar cookies)
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Password123"}' \
  -c cookies.txt

# 3. Obtener perfil
curl http://localhost:3000/api/v1/auth/me -b cookies.txt

# 4. Crear paciente
curl -X POST http://localhost:3000/api/v1/patients \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"firstName":"Juan","lastName":"Pérez","email":"juan@test.com","phone":"1234567890","dateOfBirth":"1990-01-01","diagnosis":"Lumbalgia","emergencyContact":"María","emergencyPhone":"0987654321"}'

# 5. Listar pacientes
curl http://localhost:3000/api/v1/patients -b cookies.txt
```

---

_Semana 07 completada — Septiembre 2026_
