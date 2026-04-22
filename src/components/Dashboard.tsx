import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Timer, 
  BookOpen, 
  Target,
  ChevronRight
} from 'lucide-react';
import { UserProfile } from '../types';

interface DashboardProps {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const institutionLabels: Record<string, string> = {
  'NAVY': 'Escuela Naval / Grumetes',
  'AIR_FORCE': 'Escuela de Aviación / Especialidades',
  'ARMY': 'Escuela Militar / Suboficiales',
  'PDI': 'Escuela de Investigaciones (PDI)',
  'CARABINEROS': 'Escuela de Carabineros',
  'GOPE': 'Grupo de Operaciones Especiales (GOPE)',
  'SPECIALTIES': 'Escuela de Especialidades'
};

export default function Dashboard({ profile, updateProfile }: DashboardProps) {
  const completedGuides = profile.guides.filter(g => g.status === 'RESOLVED').length;
  const totalGuides = profile.guides.length || 1;
  const academicProgress = Math.round((completedGuides / totalGuides) * 100);
  
  const bestRecord = profile.performanceHistory.length > 0 
    ? profile.performanceHistory.reduce((prev, curr) => prev.time < curr.time ? prev : curr)
    : { time: '--:--', type: '2.4K' };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      {/* Background Page Identifier */}
      <div className="absolute top-20 right-0 p-12 opacity-[0.02] pointer-events-none -z-10 rotate-12">
        <TrendingUp className="w-64 h-64" />
      </div>

      <header className="h-20 border-b border-slate-800 flex items-center justify-between bg-vortex-surface/50 -mx-6 md:-mx-12 px-6 md:px-12 mb-8">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-1">Alumno Designado</h2>
          <div className="flex items-center gap-4">
            <span className="text-xl font-serif text-slate-100 italic">{profile.code} // {profile.name}</span>
            <span className="px-2 py-0.5 bg-vortex-accent/10 text-vortex-accent border border-vortex-accent/20 rounded text-[10px] font-bold uppercase tracking-wider">
              {institutionLabels[profile.targetInstitution]}
            </span>
          </div>
        </div>
        <div className="flex gap-8 text-right hidden sm:flex">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Apuntes en Bitácora</div>
            <div className="text-2xl font-serif italic text-white">{profile.notes.length}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Guías Resueltas</div>
            <div className="text-2xl font-serif italic text-vortex-accent">{completedGuides}</div>
          </div>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: `Mejor Marca (${bestRecord.type})`, value: bestRecord.time, trend: 'Personal', icon: Timer, progress: profile.performanceHistory.length > 0 ? 100 : 0 },
          { label: 'Bitácora Académica', value: `${profile.notes.length}`, trend: 'Apuntes', icon: BookOpen, progress: Math.min(profile.notes.length * 10, 100) },
          { label: 'Dominio de Guías', value: `${academicProgress}%`, trend: 'Progreso', icon: Target, progress: academicProgress },
          { label: 'Rendimiento General', value: profile.performanceHistory.length > 0 ? '6.8' : '0.0', trend: 'Nota', icon: TrendingUp, progress: profile.performanceHistory.length > 0 ? 92 : 0 },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="vortex-card p-5"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</span>
              <span className="text-[10px] font-bold text-vortex-accent uppercase">{stat.trend}</span>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-serif italic text-white tracking-tight">{stat.value}</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                className="h-full bg-vortex-accent"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Physical Progression Chart Mockup */}
        <div className="lg:col-span-2 vortex-card p-8 bg-vortex-surface/30">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif text-white italic">Historial de Rendimiento</h3>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[8px] uppercase tracking-widest text-slate-500 mb-1">Métrica</p>
                <p className="text-[10px] font-bold text-vortex-accent uppercase italic font-serif">Marginal Gains</p>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end gap-2 px-2">
             {[15, 18, 16, 22, 20, 24, 18, 26, 22, 28, 26, 32].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                 <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 3}%` }}
                  className={`w-full transition-all duration-1000 ${i === 11 ? 'bg-vortex-accent shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-slate-800 group-hover:bg-slate-700'}`}
                 />
                 <span className="text-[8px] text-slate-600 font-mono">P{i+1}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Priority Subjects */}
        <div className="vortex-card p-8 flex flex-col border-vortex-accent/5">
          <div className="mb-6">
            <h3 className="text-xl font-serif text-white italic mb-1">Enfoque Semanal</h3>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Ramos Prioritarios</p>
          </div>
          <div className="space-y-6 flex-1">
            {profile.prioritySubjects.map((subject, i) => (
              <div key={subject} className="relative">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-vortex-accent/20 font-serif italic text-2xl">{subject.charAt(0)}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tight">{subject}</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {profile.academicScores.find(s => s.subject === subject)?.score || '0.0'}
                      </span>
                    </div>
                    <div className="h-0.5 bg-vortex-dark rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(profile.academicScores.find(s => s.subject === subject)?.score || 0) * 14}%` }}
                        className="h-full bg-vortex-accent/40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {profile.prioritySubjects.length === 0 && (
              <p className="text-xs text-slate-700 italic">No se han definido ramos de prioridad.</p>
            )}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-[9px] text-slate-600 font-mono italic mb-4">#MarginalGains // Disciplina sobre Motivación</p>
            <button className="vortex-button-secondary w-full group">
              Abrir Terminal de Estudio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
