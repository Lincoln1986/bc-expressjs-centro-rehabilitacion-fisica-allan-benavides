# 📋 Instrucciones de Trabajo — Allán Benavides

## 🏗️ Estructura de Repositorios

### Repositorio Guía (referencia)
- **Ruta**: `C:\Users\sena\Documents\NALLA\Bootcamps\bc-expressjs`
- **Propósito**: Fuente de verdad para todo el contenido del bootcamp
- **Contenido**: Semanas 01-16 con teoría, prácticas, proyectos y rúbricas
- **Acceso**: Solo lectura — NO editar directamente

### Repositorio Personal (desarrollo)
- **Ruta**: `C:\Users\sena\Documents\NALLA\Bootcamps\bc-expressjs-centro-rehabilitacion-fisica-allan-benavides`
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

---

## 🌿 Método de Entrega por Ramas

Cada semana se entrega en una **rama separada** con este formato:

```
week-XX
```

**Ejemplo**:
- `week-01`
- `week-02`
- `week-03`

### Flujo de trabajo

1. **Leer la semana** del repositorio guía (`bc-expressjs/bootcamp/week-XX-*/`)
2. **Crear una nueva rama** en el repositorio personal
3. **Desarrollar** todo lo solicitado en esa semana
4. **Subir la rama** a GitHub para entrega

### Ramas existentes

| Rama | Estado |
|------|--------|
| `main` | Rama principal |
| `week-01` | ✅ Completada |
| `week-02` | ✅ Completada |

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

### Paso 2: Crear rama en el repositorio personal

```bash
cd C:\Users\sena\Documents\NALLA\Bootcamps\bc-expressjs-centro-rehabilitacion-fisica-allan-benavides
git checkout main
git pull origin main
git checkout -b week-XX
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

## 📝 Notas Importantes

- **Siempre** crear una rama nueva para cada semana (`week-XX`)
- **Nunca** modificar `main` directamente
- **Leer** `rubrica-evaluacion.md` para conocer criterios de evaluación
- **Verificar** que `pnpm build` pase antes de entregar
- **Adaptar** todo al dominio de Centro de Rehabilitación Física

---

_Creado: 2026-08-25 | Última actualización: 2026-08-25_
