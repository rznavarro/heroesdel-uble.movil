import React from 'react';
import { useDeviceDetection } from '../../hooks/useDeviceDetection';
import MobileHeader from './MobileHeader';
import BottomNavigation from './BottomNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showBottomNav?: boolean;
  headerTitle?: string;
  headerActions?: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function MobileLayout({ 
  children, 
  showHeader = true, 
  showBottomNav = true,
  headerTitle,
  headerActions,
  activeTab,
  onTabChange
}: MobileLayoutProps) {
  const { isMobile } = useDeviceDetection();
  
  // Si no es móvil, renderizar contenido normal
  if (!isMobile) {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen bg-vortex-dark flex flex-col relative">
      {/* Header móvil */}
      {showHeader && (
        <MobileHeader 
          title={headerTitle}
          actions={headerActions}
        />
      )}
      
      {/* Contenido principal */}
      <main className={`flex-1 overflow-hidden ${showHeader ? 'pt-16' : ''} ${showBottomNav ? 'pb-20' : ''}`}>
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>
      
      {/* Navegación inferior */}
      {showBottomNav && (
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      )}
      
      {/* Safe area para iOS */}
      <style jsx>{`
        @supports (padding: max(0px)) {
          .min-h-screen {
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        }
      `}</style>
    </div>
  );
}