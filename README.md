# 🏥 Semana 01 — Centro de Rehabilitación Física

## Node.js Fundamentals — Procesador de Datos

Entrega del proyecto semanal 01: **Node.js Fundamentals** con el dominio asignado de **Centro de Rehabilitación Física**.

---

## 🎯 Objetivo

Construir una herramienta de línea de comandos (CLI) que lea datos de sesiones de rehabilitación desde un archivo JSON, los procese aplicando filtros y transformaciones, y genere un reporte con los resultados — todo usando **Node.js + TypeScript + async/await**.

---

## 🏗️ Dominio

**Centro de Rehabilitación Física**

| Entidad | Recurso |
|---------|---------|
| `Session` | Sesiones de rehabilitación con paciente, terapeuta, categoría, ejercicio y precio |

### Campos de `Session`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `string` | Identificador único de la sesión |
| `patientName` | `string` | Nombre del paciente |
| `therapistName` | `string` | Nombre del terapeuta |
| `category` | `string` | Tipo de rehabilitación (fisioterapia, deportiva, etc.) |
| `exercise` | `string` | Ejercicio realizado |
| `price` | `number` | Costo de la sesión |
| `active` | `boolean` | Si la sesión está activa |

---

## 📁 Estructura del Proyecto

```text
.
├── data/
│   └── sessions.json       # Datos iniciales de sesiones (10 registros)
├── output/
│   └── report.json         # Reporte final generado
├── src/
│   ├── fileManager.ts      # Lectura y escritura de archivos (fs/promises)
│   ├── index.ts            # Punto de entrada y manejo del CLI
│   ├── processor.ts        # Cálculo de métricas y filtrado por categoría
│   └── types.ts            # Interfaces TypeScript definidas
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✅ Requisitos Funcionales

| # | Requisito | Estado |
|---|-----------|--------|
| 1 | Leer datos desde `data/sessions.json` con `fs/promises` | ✅ |
| 2 | Mostrar resumen (total, activos, promedio, extremos) | ✅ |
| 3 | Filtrar por categoría con `--category` | ✅ |
| 4 | Generar reporte en `output/report.json` | ✅ |
| 5 | Manejo de errores (archivo no encontrado, categoría inexistente) | ✅ |

---

## 🛠️ Cómo Ejecutar

```bash
# Instalar dependencias
pnpm install

# Ejecutar sin filtro (muestra todas las sesiones)
pnpm dev

# Ejecutar con filtro por categoría
pnpm dev -- --category fisioterapia
pnpm dev -- --category deportiva
pnpm dev -- --category neurologica
pnpm dev -- --category terapia-ocupacional

# Verificar compilación TypeScript
pnpm build
```

---

## 📊 Ejemplo de Salida

```
╔════════════════════════════════════════════════╗
║   Centro de Rehabilitación Física — Reporte   ║
╚════════════════════════════════════════════════╝

📊 Total de sesiones:     10
✅ Sesiones activas:      7
❌ Sesiones inactivas:    3
💰 Precio promedio:       $55.30
🔝 Más costosa:           Pedro Gutiérrez — $80
💲 Más económica:         Miguel Ángel López — $35

✅ Reporte generado exitosamente.
```

---

## 🛠️ Entregables

| Entregable | Descripción | Estado |
|------------|-------------|--------|
| Código funcional | `pnpm build` sin errores TypeScript | ✅ |
| README.md | Descripción del proyecto y cómo ejecutarlo | ✅ |
| `data/sessions.json` | 10 registros adaptados al dominio | ✅ |
| `output/report.json` | Reporte generado | ✅ |

---

## 📋 Categorías Disponibles

| Categoría | Descripción |
|-----------|-------------|
| `fisioterapia` | Rehabilitación física general |
| `deportiva` | Rehabilitación deportiva |
| `neurologica` | Terapia neurológica |
| `terapia-ocupacional` | Terapia ocupacional |

---

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| — | **Semana 01: Node.js Fundamentals** | Semana 02: Express Intro → |
