import { useState } from 'react';
import { motion } from 'motion/react';

interface LogoFullscreenProps {
  onToggleFullscreen: () => void;
  isFullscreen?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LogoFullscreen({ 
  onToggleFullscreen, 
  isFullscreen = false, 
  className = '',
  size = 'md'
}: LogoFullscreenProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.button
      onClick={onToggleFullscreen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative ${sizeClasses[size]} rounded-lg overflow-hidden
        border-2 transition-all duration-300 cursor-pointer
        ${isFullscreen 
          ? 'border-vortex-accent shadow-lg shadow-vortex-accent/20' 
          : 'border-slate-700 hover:border-vortex-accent/50'
        }
        ${className}
      `}
      title={isFullscreen ? 'Salir de pantalla completa' : 'Activar pantalla completa'}
    >
      {/* Logo Image */}
      <img 
        src="/logo.png" 
        alt="Preuniversitario Los Héroes de Ñuble"
        className="w-full h-full object-cover"
      />
      
      {/* Overlay Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-vortex-accent/20 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1 : 0 }}
          className="text-white text-xs font-bold"
        >
          {isFullscreen ? '⤓' : '⤢'}
        </motion.div>
      </motion.div>

      {/* Status Indicator */}
      {isFullscreen && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-vortex-accent rounded-full border-2 border-vortex-dark" />
      )}
    </motion.button>
  );
}