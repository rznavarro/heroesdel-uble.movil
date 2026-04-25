# Integración ElevenLabs - Agente de Voz

## 📋 Descripción

Se ha agregado un módulo dedicado para el **Agente de Voz ElevenLabs** que permite una integración limpia y no intrusiva del agente conversacional de IA por voz.

## 🎯 Características Implementadas

### ✅ Interfaz Dedicada
- **Módulo separado**: `ModuleVoiceAgent.tsx` con interfaz completa
- **Navegación integrada**: Accesible desde el hub principal y navegación móvil
- **Controles intuitivos**: Botones para activar/desactivar, micrófono, volumen y configuración

### ✅ Controles de Voz
- **Activación/Desactivación**: Control principal del agente
- **Micrófono**: Toggle para escucha activa
- **Volumen**: Control deslizante para ajustar audio
- **Configuración**: Panel de ajustes de voz

### ✅ Configuración Avanzada
- **Selección de Voz**: Rachel, Josh, Bella, Antoni
- **Velocidad**: Control de 0.5x a 2.0x
- **Estabilidad**: Ajuste de 0% a 100%
- **Claridad**: Control de calidad de voz

### ✅ Responsive Design
- **Móvil**: Navegación en bottom navigation como "Agente IA"
- **Desktop**: Acceso desde el hub principal
- **Adaptativo**: Interfaz que se ajusta a diferentes tamaños

## 🚀 Cómo Acceder

### Desktop
1. Desde el hub principal, hacer clic en **"Agente IA"** en la barra superior
2. O navegar directamente al módulo desde el menú

### Móvil
1. Usar la navegación inferior (bottom navigation)
2. Tocar el ícono de micrófono **"Agente IA"**

## 🔧 Integración con ElevenLabs

### Estructura Preparada
El módulo está preparado para recibir la integración real de ElevenLabs:

```typescript
// En ModuleVoiceAgent.tsx - línea 20
const initializeElevenLabsAgent = () => {
  // Aquí se integraría el SDK de ElevenLabs
  console.log('Inicializando agente de ElevenLabs...');
  
  // Ejemplo de integración:
  // const agent = new ElevenLabsAgent({
  //   apiKey: process.env.ELEVENLABS_API_KEY,
  //   voice: agentSettings.voice,
  //   settings: agentSettings
  // });
};
```

### Variables de Entorno Necesarias
Agregar al archivo `.env`:
```bash
# ElevenLabs Configuration
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
```

### Contenedor del Agente
El módulo incluye un contenedor dedicado (`elevenLabsRef`) donde se puede:
- Insertar el iframe del agente
- Montar el widget de ElevenLabs
- Integrar el SDK directamente

## 🎨 Diseño Visual

### Tema Consistente
- **Colores**: Integrado con el tema vortex-dark
- **Gradientes**: Purple-blue para destacar la funcionalidad de IA
- **Animaciones**: Motion/react para transiciones suaves
- **Iconografía**: Lucide-react icons consistentes

### Estados Visuales
- **Desactivado**: Interfaz gris con mensaje explicativo
- **Activado**: Gradiente colorido con controles activos
- **Escuchando**: Indicador visual rojo para micrófono activo
- **Hablando**: Indicador azul para síntesis de voz

## 📱 Experiencia Móvil

### Navegación Optimizada
- **Bottom Navigation**: Reemplazó "Perfil" por "Agente IA"
- **Gestos**: Soporte para interacciones táctiles
- **Responsive**: Controles adaptados para pantallas pequeñas

### Controles Táctiles
- **Botones grandes**: Fácil acceso en móvil
- **Sliders optimizados**: Controles de volumen y configuración
- **Feedback háptico**: Vibración en dispositivos compatibles

## 🔄 Próximos Pasos

### Para Integración Completa
1. **Obtener API Key** de ElevenLabs
2. **Configurar el agente** en el dashboard de ElevenLabs
3. **Implementar el SDK** en `initializeElevenLabsAgent()`
4. **Configurar variables de entorno** en Vercel
5. **Testear funcionalidad** en diferentes dispositivos

### Funcionalidades Adicionales
- **Historial de conversaciones**
- **Configuración de personalidad del agente**
- **Integración con el sistema educativo**
- **Análisis de interacciones**

## 🎯 Beneficios

### UX Mejorada
- **No intrusivo**: El agente no interfiere con otras funcionalidades
- **Acceso rápido**: Disponible desde navegación principal
- **Controles claros**: Interfaz intuitiva para todos los usuarios

### Escalabilidad
- **Modular**: Fácil de mantener y actualizar
- **Configurable**: Múltiples opciones de personalización
- **Extensible**: Preparado para futuras funcionalidades

---

**Estado**: ✅ Implementado y listo para integración con ElevenLabs
**Compatibilidad**: ✅ Desktop y Móvil
**Build**: ✅ Funcional sin errores