import { motion } from 'motion/react';
import InstitutionalLogo from './InstitutionalLogo';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Dumbbell, 
  Shield, 
  FileText, 
  History, 
  BrainCircuit, 
  Languages, 
  Target,
  ShieldHalf,
  ChevronRight,
  Maximize,
  Minimize,
  Focus
} from 'lucide-react';

export const MODULES = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Vista general de rendimiento y estadísticas' },
  { id: 'physical', label: 'Ed. Física', icon: Dumbbell, desc: 'Control de tiempos y marcas físicas' },
  { id: 'academic', label: 'Académico Gen.', icon: GraduationCap, desc: 'Bóveda de guías y apuntes generales' },
  { id: 'paes-math', label: 'Matemáticas PAES', icon: Target, desc: 'Entrenamiento específico de razonamiento matemático' },
  { id: 'paes-lang', label: 'Lenguaje PAES', icon: FileText, desc: 'Comprensión lectora y vocabulario' },
  { id: 'psychology', label: 'Psicología', icon: BrainCircuit, desc: 'Tests psicométricos y perfil personal' },
  { id: 'history', label: 'Historia Naval', icon: History, desc: 'Cultura institucional y tradiciones' },
  { id: 'doctrine', label: 'Vida Castrense', icon: Shield, desc: 'Reglamento y doctrina operativa' },
  { id: 'admin', label: 'Gestión', icon: FileText, desc: 'Control de admisión y trámites' },
  { id: 'languages', label: 'Inglés', icon: Languages, desc: 'Competencia lingüística institucional' },
];

interface MainHubProps {
  onSelectModule: (id: string) => void;
  userName: string;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export default function MainHub({ onSelectModule, userName, onToggleFullscreen, isFullscreen }: MainHubProps) {
  return (
    <div className="min-h-screen bg-vortex-dark p-6 md:p-12 animate-in fade-in duration-700">
      <header className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 flex items-center justify-center p-1">
              <InstitutionalLogo className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif italic text-lg tracking-tight leading-none text-white font-bold">LOS HÉROES</span>
              <span className="font-serif italic text-xs tracking-[0.3em] text-vortex-accent">DE ÑUBLE</span>
            </div>
          </div>
          <h1 className="text-4xl font-serif italic text-white mb-2">Sistema Central de Operaciones</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
            Bienvenido, <span className="text-vortex-accent">{userName}</span> // Acceso Autorizado
          </p>
        </div>
        
        <button 
          onClick={onToggleFullscreen}
          className="flex items-center gap-3 px-6 py-3 bg-vortex-surface/50 border border-vortex-accent/30 hover:border-vortex-accent rounded-lg text-[10px] uppercase tracking-[0.2em] text-vortex-accent font-bold transition-all hover:bg-vortex-accent/5 active:scale-95 group shadow-[0_0_15px_rgba(204,0,0,0.1)]"
        >
          {isFullscreen ? (
            <>
              <Minimize className="w-5 h-5" />
              <span>Salir de Pantalla Completa</span>
            </>
          ) : (
            <>
              <Maximize className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Modo Pantalla Completa</span>
            </>
          )}
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {MODULES.map((module, i) => (
          <motion.button
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelectModule(module.id)}
            className="group relative flex flex-col items-start p-8 bg-vortex-surface/40 border border-slate-800 rounded-xl hover:border-[#2563eb]/50 transition-all text-left overflow-hidden h-[240px]"
          >
            {/* Background Icon Accent */}
            <module.icon className="absolute -bottom-4 -right-4 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" />
            
            <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:border-[#2563eb]/30 group-hover:bg-[#2563eb]/5 transition-all">
              <module.icon className="w-6 h-6 text-slate-400 group-hover:text-[#2563eb] transition-colors" />
            </div>
            
            <h3 className="text-xl font-serif italic text-white mb-2 group-hover:text-[#2563eb] transition-colors">{module.label}</h3>
            <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{module.desc}</p>
            
            <div className="mt-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity">
              Acceder Módulo <ChevronRight className="w-3 h-3" />
            </div>
          </motion.button>
        ))}
      </div>
      
      <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-900 text-center">
        <p className="text-[10px] text-slate-600 font-mono italic tracking-widest uppercase">
          Preuniversitario Los Héroes de Ñuble // Seleccione protocolo de inicio
        </p>
      </footer>
    </div>
  );
}
