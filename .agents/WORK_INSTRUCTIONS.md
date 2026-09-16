# 📋 Instrucciones de Trabajo — Allán Benavides

## 🏗️ Estructura de Repositorios

### Repositorio Guía (referencia)
- **Ruta**: `C:\Users\sena\Documents\Bootcamps\bc-expressjs`
- **Propósito**: Fuente de verdad para todo el contenido del bootcamp
- **Contenido**: Semanas 01-16 con teoría, prácticas, proyectos y rúbricas
- **Acceso**: Solo lectura — NO editar directamente

### Repositorio Personal (desarrollo)
- **Ruta**: `C:\Users\sena\Documents\Bootcamps\bc-expressjs-centro-rehabilitacion-fisica-allan-benavides`
- **Propósito**: Donde se desarrollan y entregan las semanas/actividades
- **GitHub**: [Repositorio remoto](https://github.com/allan-benavides/bc-expressjs-centro-rehabilitacion-fisica-allan-benavides)

---

## 🎯 Dominio del Proyecto

**Nombre**: Centro de Rehabilitación Física

**Entidades principales**:
| Entidad | Descripción |
|---------|-------------|
| `patients` | Pacientes del centro de rehabilitación |
| `therapists` | Terapeutas/fisioterapeutas que atienden pacientes |
| `sessions` | Sesiones de rehabilitación programadas |
| `exercises` | Ejercicios terapéuticos asignados a pacientes |

**Nota**: Para información detallada del dominio, revisar la rama `week-01`.

---

## 🌿 Método de Entrega por Ramas

Cada semana se entrega en una **rama separada** con este formato:

```
week-XX
```

**Ramas existentes**:
| Rama | Estado |
|------|--------|
| `main` | Rama principal |
| `week-01` | ✅ Completada |
| `week-02` | ✅ Completada |
| `week-03` | ✅ Completada |
| `week-04` | ✅ Completada |
| `week-05` | ✅ Completada |
| `week-06` | ⏳ Pendiente |

### Flujo de trabajo

1. **Leer la semana** del repositorio guía (`bc-expressjs/bootcamp/week-XX-*/`)
2. **Crear una nueva rama** en el repositorio personal
3. **Crear una carpeta** con el mismo nombre de la semana
4. **Desarrollar** todo lo solicitado en esa semana
5. **Subir la rama** a GitHub para entrega

---

## 📚 Cómo Trabajar una Semana

### Paso 1: Leer el contenido del repositorio guía

```
bc-expressjs/bootcamp/week-XX-nombre_semana/
├── README.md                 # Objetivos y estructura de la semana
├── rubrica-evaluacion.md     # Criterios de evaluación
├── 1-teoria/                 # Material teórico
├── 2-practicas/              # Ejercicios guiados
├── 3-proyecto/               # Proyecto integrador
│   ├── README.md             # Instrucciones del proyecto
│   └── starter/              # Código inicial para adaptar
├── 4-recursos/               # Recursos adicionales
└── 5-glosario/               # Glosario de términos
```

### Paso 2: Crear rama y carpeta en el repositorio personal

```bash
# Navegar al repositorio personal
cd C:\Users\sena\Documents\Bootcamps\bc-expressjs-centro-rehabilitacion-fisica-allan-benavides

# Crear y cambiar a la nueva rama
git checkout -b week-XX

# Crear la carpeta de la semana
mkdir week-XX
```

### Paso 3: Desarrollar adaptando al dominio

- Tomar el código del `starter/` como base
- **Renombrar** `items` por la entidad de tu dominio (ej: `patients`, `sessions`)
- **Ajustar** los campos de los tipos/interfaces a tu dominio
- **Implementar** toda la lógica requerida por la semana
- **Asegurar** que `pnpm build` compile sin errores TypeScript

### Paso 4: Entregar

```bash
git add .
git commit -m "feat: week-XX — [descripción breve]"
git push origin week-XX
```

---

## 🛠️ Stack y Convenciones Técnicas

### Paquetes
- **Gestor**: `pnpm` (NUNCA `npm` ni `yarn`)
- **Versión exacta**: Sin `^`, `~` o rangos en `package.json`

### Tecnologías
- Node.js 22+
- Express 5
- TypeScript 5.x (strict mode)
- Prisma (cuando aplique)
- MongoDB + Mongoose (semana 06+)
- Zod (validación)
- Jest + Supertest (testing)

### Arquitectura en Capas
```
src/
├── app.ts              # Configuración Express
├── server.ts           # Entry point
├── routes/             # Mapeo URL → controller
├── controllers/        # Req → Service → Res (thin)
├── services/           # Lógica de negocio
├── repositories/       # Acceso a datos
├── validators/         # Schemas Zod
├── types/              # Interfaces y tipos
└── utils/              # Funciones utilitarias
```

### Convenciones de Código
- **Código**: Inglés (variables, funciones, clases)
- **Documentación**: Español (READMEs, teoría, comentarios educativos)
- **Nomenclatura**: PascalCase para tipos, camelCase para funciones
- **Archivos**: kebab-case para rutas (`patient.routes.ts`)
- **Tipos**: Interfaces para dominio, DTOs para transferencia
- **PKs**: `id String @id @default(uuid()) @db.Uuid` (en Prisma) o `ObjectId` (en Mongoose)

### Contratos de Respuesta
```json
// Listado paginado
{ "data": [...], "total": 20, "page": 1, "limit": 5 }

// Recurso individual
{ "data": { "id": "uuid", ... } }

// Error
{ "error": "Not Found", "message": "Patient not found" }
```

### Status Codes
| Método | Éxito | Error |
|--------|-------|-------|
| GET | 200 | 404 |
| POST | 201 | 400 |
| PUT | 200 | 400, 404 |
| DELETE | 204 | 404 |

---

## 📊 Estructura por Semana (entrega)

```
week-XX/
├── README.md              # Descripción de tu implementación
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── types.ts           # Tipos de TU dominio
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── repositories/
├── package.json
├── tsconfig.json
└── .env
```

---

## 🔄 Resumen del Proceso

```
┌─────────────────────────────┐
│  1. Usuario indica semana   │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  2. Leer semana en guía     │
│  bc-expressjs/bootcamp/     │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  3. Crear rama en repo      │
│  personal                   │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  4. Desarrollar adaptando   │
│  al dominio de rehab.       │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  5. Push a GitHub           │
└─────────────────────────────┘
```

---

## 📝 Notas Importantes

- **Siempre** crear una rama nueva para cada semana
- **Nunca** modificar `main` directamente
- **Leer** `rubrica-evaluacion.md` para conocer criterios de evaluación
- **Verificar** que `pnpm build` pase antes de entregar
- **Adaptar** todo al dominio de Centro de Rehabilitación Física
- **Nombre** de carpeta = nombre de rama = semana del guía

---

_Creado: 2026-08-25 | Última actualización: Septiembre 2026_

---

## 📈 Estado del Bootcamp

| Semana | Tema | Estado | Rama |
|--------|------|--------|------|
| 01 | Node.js Fundamentals | ✅ | `week-01` |
| 02 | Express Intro | ✅ | `week-02` |
| 03 | REST API Arquitectura | ✅ | `week-03` |
| 04 | Validación y Error Handling | ✅ | `week-04` |
| 05 | PostgreSQL + Prisma | ✅ | `week-05` |
| 06 | MongoDB + Mongoose | ✅ | `week-06` |
| 07 | Autenticación JWT | ✅ | `week-07` |
| 08 | Autorización y Seguridad | ✅ | `week-08` |
| 09 | Testing | ✅ | `week-09` |
| 10 | Uploads y Emails | ⏳ | Pendiente |
| 11 | WebSockets | ⏳ | Pendiente |
| 12 | Caching y Performance | ⏳ | Pendiente |
| 13 | OpenAPI y Swagger | ⏳ | Pendiente |
| 14 | Docker | ⏳ | Pendiente |
| 15 | CI/CD y Deployment | ⏳ | Pendiente |
| 16 | Proyecto Final | ⏳ | Pendiente |
