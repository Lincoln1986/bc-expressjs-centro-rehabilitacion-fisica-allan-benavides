# Catálogo con Reporte de Sesiones — Centro de Rehabilitación Física

Entrega para el proyecto semanal 01: Node.js Fundamentals.

## Dominio asignado

**Centro de Rehabilitación Física** — recurso `Session` (`id`, `patientName`, `therapistName`, `category`, `exercise`, `price`, `active`).

## Estructura del Proyecto

```text
.
├── data/
│   └── sessions.json       # Datos iniciales de sesiones de rehabilitación (min. 10)
├── output/
│   └── report.json         # Reporte final generado en formato JSON
├── src/
│   ├── fileManager.ts      # Lectura y escritura de archivos usando fs/promises
│   ├── index.ts            # Punto de entrada y manejo del CLI (process.argv)
│   ├── processor.ts        # Cálculo de métricas y filtrado por categoría
│   └── types.ts            # Tipos e interfaces explícitas en TypeScript
├── package.json
├── tsconfig.json
└── README.md