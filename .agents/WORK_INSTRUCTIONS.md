# 📋 Instrucciones de Trabajo — Codebuff Agent

## 🏛️ Dominio Asignado
**Centro de Rehabilitación Física**

| Entidad | Descripción |
|---------|-------------|
| `patients` | Pacientes del centro de rehabilitación |
| `therapists` | Terapeutas/fisioterapeutas |
| `sessions` | Sesiones de rehabilitación programadas |
| `exercises` | Ejercicios terapéuticos asignados |

---

## 📁 Repositorios

### 1. Repositorio Guía (Referencia)
- **Ruta**: `C:\Users\novio\Documents\GitHub\Bootcamps\bc-expressjs`
- **Propósito**: Contenido pedagógico del bootcamp (teoría, prácticas, proyectos)
- **Estructura por semana**: `bootcamp/week-XX-tema/`
  - `README.md` → Instrucciones y objetivos
  - `rubrica-evaluacion.md` → Criterios de evaluación
  - `1-teoria/` → Material teórico
  - `2-practicas/` → Ejercicios guiados
  - `3-proyecto/` → Proyecto semanal
  - `4-recursos/` → Recursos adicionales

### 2. Repositorio Personal (Desarrollo)
- **Ruta**: `C:\Users\novio\Documents\GitHub\Bootcamps\bc-expressjs-centro-rehabilitacion-fisica-allan-benavides`
- **Propósito**: Desarrollo de las semanas/actividades del bootcamp
- **GitHub**: Lincoln1986/bc-expressjs-centro-rehabilitacion-fisica-allan-benavides

---

## 🔄 Flujo de Trabajo

1. **El usuario solicita trabajar una semana específica** (ej: "trabajemos la semana 08")
2. **Leer la semana en el repositorio guía**: `bc-expressjs/bootcamp/week-XX-tema/README.md`
3. **Crear una nueva rama** en el repositorio personal: `week-XX`
4. **Desarrollar** la funcionalidad solicitada aplicando el dominio del proyecto
5. **Subir la rama** a GitHub con `git push`

---

## 📊 Estado de Semanas

| Semana | Tema | Estado | Rama |
|--------|------|--------|------|
| 01 | Node.js Fundamentals | ✅ | `week-01` |
| 02 | Express Intro | ✅ | `week-02` |
| 03 | REST API Arquitectura | ✅ | `week-03` |
| 04 | Validación y Error Handling | ✅ | `week-04` |
| 05 | PostgreSQL + Prisma | ✅ | `week-05` |
| 06 | MongoDB + Mongoose | ✅ | `week-06` |
| 07 | Autenticación JWT | ✅ | `week-07-auth_jwt` |
| 08 | Autorización y Seguridad | ✅ | `week-08` |
| 09 | Testing | ⏳ | Pendiente |
| 10 | Uploads y Emails | ⏳ | Pendiente |
| 11 | WebSockets | ⏳ | Pendiente |
| 12 | Caching y Performance | ⏳ | Pendiente |
| 13 | OpenAPI y Swagger | ⏳ | Pendiente |
| 14 | Docker | ⏳ | Pendiente |
| 15 | CI/CD y Deployment | ⏳ | Pendiente |
| 16 | Proyecto Final | ⏳ | Pendiente |

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Node.js | 22+ | Runtime |
| TypeScript | 5.x | Tipado estático |
| Express | 5.x | Framework HTTP |
| Prisma | 6.x | ORM (PostgreSQL) |
| Mongoose | 8-9.x | ODM (MongoDB) |
| Zod | 3.x | Validación de datos |
| bcrypt | 5.x | Hash de contraseñas |
| JWT | 9.x | Autenticación |
| Winston | 3.x | Logging |
| Morgan | 1.x | HTTP logging |

---

## 📁 Arquitectura del Proyecto (4 Capas)

```
src/
├── lib/                    # Prisma + Mongoose connections
├── config/                 # Logger (Winston + Morgan)
├── errors/                 # AppError personalizado
├── middlewares/             # errorHandler + notFound
├── models/                 # Mongoose schemas (MongoDB)
├── schemas/                # Zod validation (create + update)
├── repositories/           # CRUD + manejo de errores
├── services/               # Lógica de negocio
├── controllers/            # Thin controllers (req → service → res)
├── routes/                 # Mapeo URL → controller
├── utils/                  # Utilidades (JWT, helpers)
├── app.ts                  # Configuración Express + middleware
├── server.ts               # Entry point + graceful shutdown
└── seed.ts                 # Datos de prueba
```

---

## 📋 Convenciones

- **Ramas**: `week-XX` o `week-XX-tema` (una rama por semana)
- **Paquetes**: Solo `pnpm` (nunca npm/yarn)
- **Código**: Inglés (variables, funciones)
- **Documentación**: Español (READMEs)
- **PKs**: UUID en Prisma, ObjectId en Mongoose
- **API Versioning**: `/api/v1/...`
- **Entorno**: `.env.example` para variables de entorno

---

## 🔧 Comandos Útiles

```bash
# Ver ramas disponibles
git branch -a

# Cambiar a una semana
git checkout week-XX

# Crear nueva rama desde main
git checkout main
git checkout -b week-XX

# Levantar Docker (si aplica)
docker compose up -d

# Instalar dependencias
pnpm install

# Ejecutar seed
pnpm seed

# Ejecutar en desarrollo
pnpm dev

# Typecheck
pnpm tsc --noEmit
```

---

## ⚠️ Notas Importantes

1. **Siempre leer la semana del repositorio guía antes de desarrollar**
2. **Cada semana tiene su propia rama** — nunca trabajar en `main`
3. **Aplicar siempre el dominio** "Centro de Rehabilitación Física"
4. **Seguir la arquitectura de 4 capas** establecida
5. **Validar con Zod** todos los endpoints de entrada
6. **Manejar errores** con AppError y el errorHandler middleware

---

## 📚 Enlaces

- Repositorio Guía: https://github.com/ergrato-dev/bc-expressjs
- Repositorio Personal: https://github.com/Lincoln1986/bc-expressjs-centro-rehabilitacion-fisica-allan-benavides

---

*Última actualización: Septiembre 2026*
