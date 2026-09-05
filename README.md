# Anzalia — Adapta tu CV con IA

Aplicación web que ayuda a adaptar el currículum de un usuario a distintas vacantes mediante un asistente de inteligencia artificial. El usuario registra su perfil profesional (experiencia, educación, proyectos, habilidades e idiomas), conversa con el asistente y genera versiones de CV adaptadas que puede visualizar y exportar en PDF.

## Tecnologías

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **PostgreSQL** + **Prisma ORM 7**
- **NextAuth v5** (autenticación con credenciales)
- **Vercel AI SDK 7** + **Google Gemini** (chat con streaming y herramientas)
- **@react-pdf/renderer** (exportación de CV a PDF)
- **Tailwind CSS 4**, **Zod** (validación), **react-icons**

## Objetivo del proyecto

Proyecto de aprendizaje enfocado en el uso práctico de herramientas de IA en el desarrollo: integración de modelos de lenguaje vía SDK, chat con streaming, herramientas llamadas por el modelo (acceso al perfil del usuario y contexto web) y generación de documentos a partir de datos estructurados.
