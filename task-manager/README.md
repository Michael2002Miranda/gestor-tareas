# Gestor de Tareas

Una aplicación completa de gestión de tareas construida con Next.js, Supabase y Tailwind CSS.

## Características

- ✅ **CRUD completo** - Crear, leer, actualizar y eliminar tareas
- ✅ **Prioridades** - Organiza tareas por prioridad (Alta, Media, Baja)
- ✅ **Fechas límite** - Establece fechas de vencimiento
- ✅ **Estadísticas** - Dashboard con métricas de productividad
- ✅ **Seguridad** - Row Level Security con Supabase
- ✅ **Responsive** - Funciona en móvil y desktop
- ✅ **TypeScript** - Tipado completo para mejor desarrollo

## Stack Tecnológico

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js Server Actions
- **Base de datos**: Supabase (PostgreSQL)
- **Deploy**: Vercel

## Configuración Local

1. **Clonar el repositorio**
\`\`\`bash
git clone [tu-repo-url]
cd gestor-tareas
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edita `.env.local` con tus credenciales de Supabase:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio
\`\`\`

4. **Ejecutar en desarrollo**
\`\`\`bash
npm run dev
\`\`\`

## Deploy en Vercel

1. Conecta tu repositorio de GitHub con Vercel
2. Configura las variables de entorno en Vercel
3. ¡Deploy automático!

## Estructura del Proyecto

\`\`\`
├── app/
│   ├── actions/          # Server Actions
│   ├── dashboard/        # Página principal
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/              # Componentes shadcn/ui
│   ├── add-task-form.tsx
│   └── task-list.tsx
├── lib/
│   └── supabase.ts      # Cliente Supabase
└── scripts/
    └── 01-create-tables.sql  # Script de base de datos
\`\`\`

## Creado con v0

Este proyecto fue generado usando v0 de Vercel - el asistente de IA para desarrollo web.
