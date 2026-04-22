import React from 'react';

export default function InstitutionalLogo({ className = "w-12 h-12", onClick }: { className?: string, onClick?: () => void }) {
  return (
    <div 
      className={`relative ${className} ${onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''}`} 
      onClick={onClick}
      title={onClick ? "Alternar pantalla completa" : undefined}
    >
      <img 
        src="/logo.png" 
        alt="Logo Los Héroes de Ñuble" 
        className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(204,0,0,0.3)]"
      />
    </div>
  );
}
