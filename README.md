# UPDS JUDGE

UPDS JUDGE es una plataforma web **propuesta** para administrar concursos de programación competitiva. El alcance documentado contempla gestión de concursos, problemas, envíos de soluciones, evaluación automática, veredictos, ranking e historial de participación.

> **Estado actual:** el repositorio contiene documentación, diagramas, recursos y un script SQL inicial de dominio. La aplicación frontend no está presente en este checkout, por lo que no hay una implementación local verificable ni scripts de ejecución disponibles aquí. Las funcionalidades del MVP se encuentran diseñadas o planificadas; no se las presenta como implementadas.

## Problema y objetivo

La propuesta busca reducir la gestión manual y fragmentada de concursos de programación, que dificulta la trazabilidad de participantes, envíos y resultados.

El objetivo general definido es diseñar e implementar un MVP que permita administrar concursos, recibir y evaluar soluciones automáticamente, comunicar veredictos y calcular rankings trazables mediante un frontend independiente y un backend separado.

## Estado y alcance documentado

| Estado                              | Elementos                                                                                                                                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Documentado o diseñado**          | Problema, propuesta de valor, backlog de 15 historias, Definition of Ready, UML, modelo de datos preliminar, reglas de ranking y plan de Sprint 0.                                 |
| **Disponible en este repositorio**  | Documentación Markdown, fuentes PlantUML, imágenes y capturas existentes, e `database/script-inicial.sql`.                                                                         |
| **Planificado**                     | Registro y roles, concursos, importación ZIP, participación, consulta de problemas, envíos en C++, Python y C#, veredictos, ranking, congelamiento e historial.                    |
| **Pendiente o no verificable aquí** | Código de `frontend/`, configuración de React/Vite, scripts npm, variables de entorno, contrato OpenAPI, integración Judge0, SignalR, pipeline, migraciones y repositorio backend. |

## Repositorios y responsabilidades

- **Frontend:** [UPDS-JUDGE-FRONT](https://github.com/Alex-Fernandez-2003/UPDS-JUDGE-FRONT.git). La decisión vigente lo define como una aplicación independiente con **React, Vite y TypeScript**.
- **Backend:** repositorio independiente con **URL pendiente**. Está a cargo de otro integrante y se documenta como ASP.NET Core MVC/Web API que expondrá una API para el frontend.

La interfaz principal corresponde al frontend independiente; no se documenta Razor como su interfaz principal. Este checkout no incluye `frontend/`, por lo cual no permite confirmar dependencias, Tailwind CSS, configuración, variables de entorno ni comandos npm del repositorio frontend enlazado.

## Ejecución del frontend

No hay `frontend/package.json` ni carpeta `frontend/` en la estructura actual. En consecuencia, no existen instrucciones locales verificables para instalar o ejecutar React con Vite, ni variables de entorno que puedan documentarse sin inventarlas.

Cuando el código del frontend esté incorporado en este checkout, las instrucciones deberán derivarse exclusivamente de `frontend/package.json`, sus archivos `vite.config.*`, `tsconfig*.json`, la configuración de Tailwind si existe y un eventual `.env.example`.

## Estructura real del repositorio

```text
REPOSITORIO/
├── .atl/
│   └── skill-registry.md
├── database/
│   └── script-inicial.sql
├── docs/
│   ├── capturas/
│   ├── images/
│   ├── puml/
│   ├── 01-contexto-y-diagnostico.md
│   ├── 02-mvp-y-propuesta-valor.md
│   ├── 03-product-backlog.md
│   ├── 04-dor-y-refinamiento.md
│   ├── 05-modelado-uml.md
│   ├── 06-arquitectura-datos.md
│   ├── 07-plan-ready-to-sprint.md
│   ├── 08-sprint-0-fabrica-software.md
│   ├── README.md
│   ├── informe-final.tex
│   └── informe-final.pdf
├── .gitignore
├── README.md
└── frontend/
   ├── public/
   ├── src/
   │   ├── assets/
   │   ├── components/
   │   │   ├── common/
   │   │   ├── forms/
   │   │   ├── navigation/
   │   │   └── tables/
   │   ├── features/
   │   │   ├── administration/
   │   │   ├── auth/
   │   │   ├── contests/
   │   │   ├── problems/
   │   │   ├── ranking/
   │   │   └── submissions/
   │   ├── hooks/
   │   ├── layouts/
   │   ├── lib/
   │   │   ├── api/
   │   │   ├── auth/
   │   │   └── realtime/
   │   ├── pages/
   │   ├── routes/
   │   ├── styles/
   │   ├── types/
   │   ├── App.css
   │   ├── App.tsx
   │   ├── index.css
   │   └── main.tsx
   ├── package.json
   ├── package-lock.json
   ├── vite.config.ts
   └── tsconfig*.json
```

> `frontend/` no figura porque no existe en el árbol inspeccionado. Su ausencia es una diferencia respecto de la estructura documentada en algunos archivos de `docs/`.

## Integrantes

- Wilson Yucra Rengifo
- Cristhian Joel Amador Gallardo
- Arnold Daniel Torrez Zarate
- Daniel Javier Aramayo Mancilla
- Enny Anaí Lopez Saldaña Beymar
- Angelo Vasquez Acha
- Alex Saul Fernandez Valdez

## Documentación disponible

- [Contexto y diagnóstico](docs/01-contexto-y-diagnostico.md)
- [MVP y propuesta de valor](docs/02-mvp-y-propuesta-valor.md)
- [Product Backlog](docs/03-product-backlog.md)
- [Definition of Ready y refinamiento](docs/04-dor-y-refinamiento.md)
- [Modelado UML](docs/05-modelado-uml.md)
- [Arquitectura de datos](docs/06-arquitectura-datos.md)
- [Plan Ready to Sprint](docs/07-plan-ready-to-sprint.md)
- [Sprint 0](docs/08-sprint-0-fabrica-software.md)
- [Índice de documentación](docs/README.md)
- [Informe final en LaTeX](docs/informe-final.tex)

## Nota sobre el backlog

La captura disponible del backlog contiene 15 historias entre `UJ-05` y `UJ-20`; la numeración salta de `UJ-16` a `UJ-18`. No se inventa una historia `UJ-17` para completar la secuencia.
