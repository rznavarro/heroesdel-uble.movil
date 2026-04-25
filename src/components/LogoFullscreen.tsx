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
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.button
      onClick={onToggleFullscreen}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative ${sizeClasses[size]} cursor-pointer
        transition-all duration-200 
        border-0 outline-none focus:outline-none
        bg-transparent p-0 m-0
        ${className}
      `}
      style={{ 
        border: 'none', 
        outline: 'none',
        boxShadow: 'none'
      }}
      title=""
    >
      {/* Logo Image - sin bordes ni marcos */}
      <img 
        src="/logo.png" 
        alt="Preuniversitario Los Héroes de Ñuble"
        className="w-full h-full object-contain border-0 outline-none"
        style={{ 
          border: 'none', 
          outline: 'none',
          boxShadow: 'none'
        }}
      />
    </motion.button>
  );
}