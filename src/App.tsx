import { useState, useEffect } from 'react';
import LoginGate from './components/LoginGate';
import Dashboard from './components/Dashboard';
import ModuleAcademic from './components/ModuleAcademic';
import ModulePhysical from './components/ModulePhysical';
import MainHub from './components/MainHub';
import InstitutionalLogo from './components/InstitutionalLogo';
import { motion, AnimatePresence } from 'motion/react';
import { VORTEX_PROFILES } from './data/profiles';
import { UserProfile } from './types';
import { ChevronLeft, Grid, Maximize, Minimize, Focus } from 'lucide-react';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('hub');
  const [isInitializing, setIsInitializing] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [globalData, setGlobalData] = useState<{ guides: any[], notes: any[] }>({ guides: [], notes: [] });

  // Sync with server every 10 seconds (basic polling instead of sockets for now)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        if (res.ok) {
          const data = await res.json();
          setGlobalData(data);
        }
      } catch (err) {
        console.error("Error fetching global data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const addGlobalGuide = async (guide: any) => {
    try {
      const res = await fetch('/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(guide)
      });
      if (res.ok) {
        const newGuide = await res.json();
        setGlobalData(prev => ({ ...prev, guides: [newGuide, ...prev.guides] }));
      }
    } catch (err) {
      console.error("Error adding guide:", err);
    }
  };

  const addGlobalNote = async (note: any) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
      });
      if (res.ok) {
        const newNote = await res.json();
        setGlobalData(prev => ({ ...prev, notes: [newNote, ...prev.notes] }));
      }
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement));
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const element = document.documentElement as any;
      const requestMethod = element.requestFullscreen || 
                           element.webkitRequestFullscreen || 
                           element.mozRequestFullScreen || 
                           element.msRequestFullscreen;

      if (requestMethod) {
        requestMethod.call(element).catch((err: any) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } else {
      const doc = document as any;
      const exitMethod = doc.exitFullscreen || 
                         doc.webkitExitFullscreen || 
                         doc.mozCancelFullScreen || 
                         doc.msExitFullscreen;
      
      if (exitMethod) {
        exitMethod.call(doc).catch((err: any) => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
      }
    }
  };

  useEffect(() => {
    // Reset scroll when tab changes
    const mainArea = document.querySelector('main');
    if (mainArea) mainArea.scrollTo(0, 0);

    const savedCode = localStorage.getItem('vortex_code');
    const savedData = localStorage.getItem('vortex_user_data');
    
    if (savedCode) {
      const baseProfile = VORTEX_PROFILES[savedCode] || VORTEX_PROFILES['VX-13'];
      if (savedData) {
        const customData = JSON.parse(savedData);
        if (customData.code === savedCode) {
          setUserProfile({ ...baseProfile, ...customData });
        } else {
          setUserProfile(baseProfile);
        }
      } else {
        setUserProfile(baseProfile);
      }
    }
    // Artificial delay to feel "premium"
    setTimeout(() => setIsInitializing(false), 800);
  }, []);

  const handleLogin = (code: string) => {
    const profile = VORTEX_PROFILES[code] || VORTEX_PROFILES['VX-13'];
    setUserProfile(profile);
    localStorage.setItem('vortex_code', code);
    // Try to load existing data for this code
    const savedData = localStorage.getItem(`vortex_data_${code}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserProfile({ ...profile, ...parsed });
    }
  };

  const updateProfile = (newData: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated = { ...userProfile, ...newData };
    setUserProfile(updated);
    localStorage.setItem(`vortex_data_${userProfile.code}`, JSON.stringify(updated));
  };

  const handleLogout = () => {
    setUserProfile(null);
    localStorage.removeItem('vortex_code');
    setActiveTab('hub');
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-vortex-dark flex flex-col items-center justify-center gap-8">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 flex items-center justify-center"
        >
          <InstitutionalLogo className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-vortex-accent text-3xl font-serif italic tracking-widest text-center"
        >
          LOS HÉROES<br/>
          <span className="text-sm tracking-[0.5em] text-white">DE ÑUBLE</span>
        </motion.div>
      </div>
    );
  }

  if (!userProfile) {
    return <LoginGate onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Merge personal profile with global guides/notes
    const connectedProfile = userProfile ? {
      ...userProfile,
      guides: globalData.guides,
      notes: globalData.notes
    } : null;

    if (!connectedProfile) return null;

    switch (activeTab) {
      case 'hub':
        return <MainHub onSelectModule={setActiveTab} userName={connectedProfile.name} onToggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />;
      case 'dashboard':
        return <Dashboard profile={connectedProfile} updateProfile={updateProfile} />;
      case 'academic':
      case 'history':
      case 'languages':
      case 'paes-math':
      case 'paes-lang':
      case 'psychology':
      case 'doctrine':
      case 'admin':
        return (
          <ModuleAcademic 
            profile={connectedProfile} 
            updateProfile={updateProfile} 
            activeTab={activeTab} 
            onAddGlobalGuide={addGlobalGuide}
            onAddGlobalNote={addGlobalNote}
          />
        );
      case 'physical':
        return <ModulePhysical profile={connectedProfile} updateProfile={updateProfile} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-slate-700 py-20 border border-slate-800 rounded opacity-50">
            <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded flex items-center justify-center mb-6 text-2xl font-serif italic">?</div>
            <h3 className="text-xl font-serif italic mb-2 tracking-widest text-slate-500">Terminal Restringida</h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Enlace encriptado o módulo en desarrollo</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-vortex-dark">
      {/* Sidebar is now conditional or hidden in isolated mode */}
      {/* For this specific request, we won't show the sidebar at all if we are in a module, 
          instead we show a "Back to Menu" button to keep it isolated. */}
      
      <main className={`min-h-screen ${activeTab === 'hub' ? '' : 'p-6 md:p-12'} relative flex flex-col scroll-smooth`}>
        {/* Isolated Navigation Bar (only when not in HUB) */}
        {activeTab !== 'hub' && (
          <nav className="fixed top-0 left-0 right-0 h-16 bg-vortex-surface/80 backdrop-blur-md border-b border-white/5 z-40 px-6 flex items-center justify-between">
            <button 
              onClick={() => setActiveTab('hub')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-all text-[10px] uppercase tracking-widest font-bold group"
            >
              <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-[#2563eb]/50">
                <ChevronLeft className="w-4 h-4" />
              </div>
              Regresar al Menú Principal
            </button>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleFullscreen}
                className="flex items-center gap-2 px-3 py-1.5 rounded border border-vortex-accent/20 hover:border-vortex-accent/50 text-slate-500 hover:text-vortex-accent transition-all text-[9px] uppercase tracking-widest font-bold bg-vortex-accent/5"
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Esc' : 'Pantalla Completa'}</span>
              </button>
              <div className="hidden md:block h-4 w-px bg-white/10 mx-1" />
              <div className="hidden md:flex items-center gap-4">
                <span className="text-[10px] text-slate-600 font-mono italic">TERMINAL // {activeTab.toUpperCase()}</span>
                <button onClick={handleLogout} className="text-slate-500 hover:text-vortex-accent transition-colors text-[9px] uppercase tracking-widest font-bold">Cerrar Sesión</button>
              </div>
            </div>
          </nav>
        )}

        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-vortex-accent/5 rounded-full blur-[150px] -z-10 select-none pointer-events-none" />
        
        {/* Loading Indicator for "Page Changes" */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`loader-${activeTab}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 h-0.5 bg-vortex-accent z-50 pointer-events-none origin-left`}
          />
        </AnimatePresence>

        <div className={`flex-1 ${activeTab !== 'hub' ? 'pt-16' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={activeTab === 'hub' ? 'w-full' : 'max-w-7xl mx-auto'}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {activeTab !== 'hub' && (
          <footer className="mt-auto py-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between gap-4 text-[9px] text-slate-600 uppercase tracking-[0.3em] font-bold">
            <div className="flex gap-4 items-center">
              <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full opacity-50"></span>
              <p>© 2026 PREUNIVERSITARIO LOS HÉROES DE ÑUBLE // V2.0.0</p>
            </div>
            <div className="flex gap-8">
              <p>Destino: {userProfile.targetInstitution}</p>
              <p>ID Sesión: {userProfile.code}</p>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
