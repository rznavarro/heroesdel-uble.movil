# Los Héroes de Ñuble - Versión Móvil

Sistema educativo preuniversitario adaptado para dispositivos móviles con funcionalidades completas de chat, IA educativa, música y gestión académica.

## 🚀 Características

- **Adaptación Móvil Completa**: Interfaz optimizada para dispositivos móviles
- **Chat en Tiempo Real**: Sistema de mensajería con Supabase
- **IA Educativa**: Integración con OpenAI para asistencia académica
- **Módulo de Historia**: Videos educativos de YouTube integrados
- **Reproductor de Música**: 50 canciones organizadas por categorías
- **PWA**: Instalable como aplicación nativa
- **13 Perfiles de Usuario**: Orientados a diferentes instituciones

## 🛠️ Tecnologías

- **Frontend**: React 19, TypeScript, Vite
- **Animaciones**: Motion (Framer Motion)
- **Estilos**: Tailwind CSS 4
- **Base de Datos**: Supabase
- **IA**: OpenAI API / Google Gemini
- **Deployment**: Vercel

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/rznavarro/heroesdel-uble.movil.git
cd heroesdel-uble.movil
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
# Edita .env con tus credenciales
```

4. Ejecuta en desarrollo:
```bash
npm run dev
```

## 🌐 Deployment en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_OPENAI_API_KEY` (opcional)
   - `GEMINI_API_KEY` (opcional)

3. El deployment se realizará automáticamente

## 📱 Funcionalidades Móviles

- **Navegación por Gestos**: Swipe entre secciones
- **Bottom Navigation**: Navegación táctil optimizada
- **Responsive Design**: Adaptación automática a diferentes tamaños
- **PWA**: Instalación como app nativa
- **Offline Support**: Funcionalidad básica sin conexión

## 🎯 Perfiles de Usuario

El sistema incluye 13 perfiles predefinidos (VX-01 a VX-13) orientados a:
- Universidad de Chile
- Pontificia Universidad Católica
- Universidad de Concepción
- Universidad Técnica Federico Santa María
- Y otras instituciones prestigiosas

## 🔧 Scripts Disponibles

- `npm run dev`: Servidor de desarrollo
- `npm run build`: Build de producción
- `npm run preview`: Preview del build
- `npm run lint`: Verificación de tipos TypeScript

## 📄 Licencia

© 2026 Preuniversitario Los Héroes de Ñuble - Todos los derechos reservados