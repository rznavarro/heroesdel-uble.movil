import React from 'react';
import { motion } from 'motion/react';
import { Home, BookOpen, MessageCircle, Music, User } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
}

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'hub',
    label: 'Inicio',
    icon: Home,
    path: '/'
  },
  {
    id: 'academic',
    label: 'Académico',
    icon: BookOpen,
    path: '/academic'
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: MessageCircle,
    path: '/chat',
    badge: 3 // Ejemplo de badge para mensajes no leídos
  },
  {
    id: 'music',
    label: 'Música',
    icon: Music,
    path: '/music'
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: User,
    path: '/profile'
  }
];

export default function BottomNavigation({ activeTab = 'hub', onTabChange }: BottomNavigationProps) {
  
  const handleTabPress = (item: NavItem) => {
    if (onTabChange) {
      onTabChange(item.id);
    }
    
    // Haptic feedback para dispositivos compatibles
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };
  
  return (
    <motion.nav 
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-vortex-surface/95 backdrop-blur-md border-t border-slate-800/50"
    >
      <div className="flex items-center justify-around h-full px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleTabPress(item)}
              className={`flex flex-col items-center justify-center min-w-[60px] h-14 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-vortex-accent/20 text-vortex-accent' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'text-vortex-accent' : ''}`} />
                
                {/* Badge para notificaciones */}
                {item.badge && item.badge > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-white">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  </motion.div>
                )}
              </div>
              
              <span className={`text-xs font-medium mt-1 ${
                isActive ? 'text-vortex-accent' : 'text-slate-500'
              }`}>
                {item.label}
              </span>
              
              {/* Indicador activo */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 w-8 h-1 bg-vortex-accent rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Safe area para iOS */}
      <div className="h-safe-bottom bg-vortex-surface/95" />
    </motion.nav>
  );
}