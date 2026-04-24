# METAPROMPT: Adaptación Móvil del Sistema Educativo "Los Héroes de Ñuble"

## CONTEXTO DEL SISTEMA
Sistema educativo web desarrollado en React + TypeScript con las siguientes características:
- **Arquitectura**: React 18, Vite, TypeScript, Tailwind CSS, Motion/Framer Motion
- **Backend**: Node.js con Supabase (PostgreSQL)
- **Funcionalidades principales**: 
  - Chat en tiempo real con IA educativa integrada
  - Módulos académicos (Historia, Matemáticas, Lenguaje, etc.)
  - Sistema de música/audio
  - Dashboard personalizado por usuario
  - Gestión de guías y notas
  - Perfiles de usuario (VX-01 a VX-13)

## OBJETIVO DE LA ADAPTACIÓN
Transformar la aplicación web desktop en una PWA (Progressive Web App) completamente optimizada para dispositivos móviles, manteniendo toda la funcionalidad pero adaptando la experiencia de usuario a pantallas táctiles pequeñas.

## DIRECTRICES DE IMPLEMENTACIÓN

### 1. ARQUITECTURA MÓVIL

#### 1.1 Detección de Dispositivo
```typescript
// Crear hook personalizado para detección
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  
  // Lógica de detección basada en:
  // - window.innerWidth < 768px
  // - navigator.userAgent
  // - touch capabilities
  // - orientation changes
}
```

#### 1.2 Layout Responsivo
- **Componente MobileLayout**: Wrapper principal para vistas móviles
- **Navegación inferior**: BottomNavigation con 5 tabs principales
- **Header móvil**: MobileHeader con título, usuario y acciones contextuales
- **Gestión de estado**: Mantener estado global pero optimizar renders

### 2. NAVEGACIÓN Y UX MÓVIL

#### 2.1 Estructura de Navegación
```
Bottom Navigation (5 tabs):
├── 🏠 Inicio (MainHub adaptado)
├── 📚 Académico (Módulos educativos)
├── 💬 Chat (Chat + IA)
├── 🎵 Música (Player móvil)
└── 👤 Perfil (Dashboard personal)
```

#### 2.2 Patrones de Navegación Móvil
- **Swipe gestures**: Entre módulos y secciones
- **Pull-to-refresh**: En listas de mensajes y contenido
- **Modal sheets**: Para formularios y configuraciones
- **Tabs horizontales**: Dentro de cada módulo
- **Breadcrumbs móviles**: Navegación jerárquica clara

### 3. COMPONENTES MÓVILES ESPECÍFICOS

#### 3.1 Chat Móvil
```typescript
// MobileChatView.tsx
- Lista de conversaciones (MobileChatList)
- Vista de chat individual con teclado optimizado
- Botones de IA accesibles con scroll horizontal
- Mensajes con swipe para acciones rápidas
- Input con botones de acción flotantes
```

#### 3.2 Módulos Académicos Móviles
```typescript
// MobileModuleView.tsx
- Cards deslizables para contenido
- Videos responsive con controles táctiles
- Formularios optimizados para teclado móvil
- Listas con infinite scroll
- Filtros en modal sheets
```

#### 3.3 Reproductor de Música Móvil
```typescript
// MobileMusicPlayer.tsx
- Mini player persistente en bottom
- Full screen player con gestos
- Playlist en modal sheet
- Controles táctiles grandes
- Visualización de ondas de audio
```

### 4. OPTIMIZACIONES TÉCNICAS

#### 4.1 Performance Móvil
- **Lazy loading**: Componentes y rutas
- **Image optimization**: WebP, lazy loading, placeholders
- **Bundle splitting**: Por módulos
- **Service Worker**: Caching estratégico
- **Virtual scrolling**: Para listas largas

#### 4.2 Gestión de Estado Móvil
```typescript
// Optimizar re-renders
- React.memo para componentes pesados
- useMemo/useCallback para cálculos
- Context splitting por funcionalidad
- Estado local vs global optimizado
```

#### 4.3 Offline Support
- **PWA manifest**: Instalación como app nativa
- **Service Worker**: Cache de recursos críticos
- **Offline indicators**: Estado de conexión
- **Sync en background**: Cuando vuelve conexión

### 5. INTERACCIONES TÁCTILES

#### 5.1 Gestos Implementados
```typescript
// Usar react-spring o framer-motion
- Swipe left/right: Navegación entre tabs
- Pull down: Refresh de contenido
- Long press: Menús contextuales
- Pinch zoom: En imágenes y videos
- Double tap: Acciones rápidas
```

#### 5.2 Feedback Táctil
- **Haptic feedback**: En acciones importantes
- **Visual feedback**: Estados pressed/hover
- **Loading states**: Skeletons y spinners
- **Error states**: Mensajes claros y acciones

### 6. ADAPTACIONES POR MÓDULO

#### 6.1 Chat + IA Educativa
```typescript
// Adaptaciones específicas:
- Teclado flotante que no oculte mensajes
- Botones de IA en carousel horizontal
- Respuestas de IA con formato móvil
- Compartir mensajes con sistema nativo
- Notificaciones push para nuevos mensajes
```

#### 6.2 Módulos Educativos
```typescript
// Historia, Matemáticas, etc.:
- Videos con controles táctiles
- PDFs con zoom y scroll optimizado
- Formularios step-by-step
- Progress indicators claros
- Bookmarks y favoritos
```

#### 6.3 Dashboard Personal
```typescript
// Perfil y estadísticas:
- Cards con información resumida
- Gráficos táctiles (Chart.js mobile)
- Configuraciones en grupos colapsables
- Foto de perfil con cámara nativa
- Exportar datos personales
```

### 7. CONSIDERACIONES DE DISEÑO

#### 7.1 Espaciado y Tamaños
```css
/* Tailwind classes móviles */
- Botones: min-h-[44px] (Apple guidelines)
- Texto: text-base mínimo (16px)
- Espaciado: p-4, gap-4 como mínimo
- Touch targets: w-12 h-12 mínimo
- Safe areas: pb-safe, pt-safe
```

#### 7.2 Tipografía Móvil
```css
/* Jerarquía clara */
- Títulos: text-xl a text-2xl
- Subtítulos: text-lg
- Cuerpo: text-base (nunca menor)
- Captions: text-sm (mínimo)
- Line height: leading-relaxed
```

#### 7.3 Colores y Contraste
- **Modo oscuro**: Mantener tema actual
- **Contraste**: WCAG AA mínimo
- **Estados**: Hover → Active states
- **Accesibilidad**: Focus visible, screen readers

### 8. IMPLEMENTACIÓN PROGRESIVA

#### Fase 1: Estructura Base
1. Crear hook useDeviceDetection
2. Implementar MobileLayout wrapper
3. Crear BottomNavigation
4. Adaptar routing para móvil

#### Fase 2: Componentes Core
1. MobileHeader con acciones contextuales
2. MobileChatView completo
3. Swipeable views entre módulos
4. Pull-to-refresh en listas

#### Fase 3: Módulos Específicos
1. Adaptar cada módulo académico
2. Mobile music player
3. Dashboard móvil
4. Configuraciones y perfil

#### Fase 4: PWA y Optimizaciones
1. Service Worker y manifest
2. Notificaciones push
3. Offline support
4. Performance optimizations

### 9. TESTING MÓVIL

#### 9.1 Dispositivos de Prueba
- **iOS**: iPhone SE, iPhone 14, iPad
- **Android**: Pixel 6, Samsung Galaxy, tablets
- **Navegadores**: Safari, Chrome, Firefox móvil
- **Orientaciones**: Portrait y landscape

#### 9.2 Métricas de Performance
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **Bundle size**: < 500KB inicial
- **Memory usage**: Monitorear en dispositivos low-end

### 10. CÓDIGO DE EJEMPLO

#### 10.1 Hook de Detección
```typescript
export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasTouch: false,
    orientation: 'portrait' as 'portrait' | 'landscape'
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const hasTouch = 'ontouchstart' in window;
      
      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        hasTouch,
        orientation: width > window.innerHeight ? 'landscape' : 'portrait'
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return deviceInfo;
};
```

#### 10.2 Layout Móvil Base
```typescript
export const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile } = useDeviceDetection();
  
  if (!isMobile) return <>{children}</>;
  
  return (
    <div className="min-h-screen bg-vortex-dark flex flex-col">
      <MobileHeader />
      <main className="flex-1 overflow-hidden pb-16">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
```

## RESULTADO ESPERADO

Una aplicación móvil nativa-like que:
- ✅ Mantiene toda la funcionalidad del sistema desktop
- ✅ Proporciona una experiencia táctil intuitiva
- ✅ Funciona offline con sincronización
- ✅ Se instala como PWA en el dispositivo
- ✅ Tiene performance óptima en dispositivos low-end
- ✅ Cumple estándares de accesibilidad móvil
- ✅ Integra con APIs nativas del dispositivo (cámara, notificaciones)

## INSTRUCCIONES PARA EL DESARROLLADOR

1. **Analiza el código actual** del sistema para entender la arquitectura
2. **Implementa progresivamente** siguiendo las fases definidas
3. **Mantén la coherencia** con el diseño y funcionalidad existente
4. **Prioriza la performance** en cada decisión técnica
5. **Testa en dispositivos reales** durante todo el desarrollo
6. **Documenta los cambios** y nuevos patrones implementados

Este metaprompt debe ser usado como guía completa para transformar el sistema educativo en una aplicación móvil de calidad profesional.