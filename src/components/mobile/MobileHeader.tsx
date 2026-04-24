import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Menu, Search, MoreVertical } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  searchable?: boolean;
  onSearch?: (query: string) => void;
}

export default function MobileHeader({ 
  title, 
  showBack = false, 
  onBack,
  actions,
  searchable = false,
  onSearch
}: MobileHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  
  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    const titles: Record<string, string> = {
      '/': 'Inicio',
      '/academic': 'Académico',
      '/history': 'Historia',
      '/chat': 'Chat',
      '/music': 'Música',
      '/profile': 'Perfil'
    };
    
    return titles[path] || 'Los Héroes de Ñuble';
  };
  
  return (
    <motion.header 
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-vortex-surface/95 backdrop-blur-md border-b border-slate-800/50"
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Lado izquierdo */}
        <div className="flex items-center gap-3">
          {showBack ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          )}
          
          <div>
            <h1 className="text-lg font-semibold text-white truncate max-w-[200px]">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
              Terminal Móvil
            </p>
          </div>
        </div>
        
        {/* Lado derecho */}
        <div className="flex items-center gap-2">
          {searchable && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </motion.button>
          )}
          
          {actions || (
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Indicador de carga */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-vortex-accent to-transparent opacity-0 animate-pulse" />
    </motion.header>
  );
}