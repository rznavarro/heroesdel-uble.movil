import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Upload, 
  Clock, 
  Plus, 
  Search,
  BookOpen,
  Trash2,
  GraduationCap,
  Target,
  BrainCircuit,
  History,
  Shield,
  Languages
} from 'lucide-react';
import { UserProfile, Guide, Note } from '../types';

interface ModuleAcademicProps {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  activeTab?: string;
  onAddGlobalGuide: (guide: Guide) => void;
  onAddGlobalNote: (note: Note) => void;
}

const tabTitles: Record<string, { top: string; main: string; icon: string }> = {
  'academic': { top: 'Bóveda de Conocimiento', main: 'Académico General', icon: 'GraduationCap' },
  'paes-math': { top: 'Módulo de Entrenamiento', main: 'Matemáticas PAES', icon: 'Target' },
  'paes-lang': { top: 'Comprensión Lectora', main: 'Lenguaje PAES', icon: 'FileText' },
  'psychology': { top: 'Perfil Psicométrico', main: 'Psicología', icon: 'BrainCircuit' },
  'history': { top: 'Cultura Institucional', main: 'Historia Naval', icon: 'History' },
  'doctrine': { top: 'Reglamento Directivo', main: 'Vida Castrense', icon: 'Shield' },
  'admin': { top: 'Control de Trámites', main: 'Gestión Adm.', icon: 'FileText' },
  'languages': { top: 'Capacidad Idiomática', main: 'Inglés', icon: 'Languages' },
};

export default function ModuleAcademic({ 
  profile, 
  updateProfile, 
  activeTab = 'academic', 
  onAddGlobalGuide, 
  onAddGlobalNote 
}: ModuleAcademicProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote] = useState({ tag: tabTitles[activeTab]?.main.toUpperCase() || 'MATEMÁTICAS', text: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTitle = tabTitles[activeTab] || tabTitles['academic'];

  const IconComponent = () => {
    switch (activeTab) {
      case 'paes-math': return <Target className="w-64 h-64" />;
      case 'psychology': return <BrainCircuit className="w-64 h-64" />;
      case 'history': return <History className="w-64 h-64" />;
      case 'doctrine': return <Shield className="w-64 h-64" />;
      case 'languages': return <Languages className="w-64 h-64" />;
      case 'academic': return <GraduationCap className="w-64 h-64" />;
      default: return <FileText className="w-64 h-64" />;
    }
  };

  const handleAddGuide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newGuide: Guide = {
      id: Math.random().toString(36).substr(2, 9),
      title: file.name,
      date: new Date().toLocaleDateString('es-CL'),
      status: 'PENDING',
      category: currentTitle.main,
    };

    onAddGlobalGuide(newGuide);
  };

  const handleDeleteGuide = (id: string) => {
    // For now we don't have a specific global delete, but we could add it.
    // In this connected version, we'll just filter locally for the user too.
    updateProfile({
      guides: profile.guides.filter(g => g.id !== id)
    });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.text.trim()) return;

    const note: Note = {
      id: Math.random().toString(36).substr(2, 9),
      tag: newNote.tag,
      text: newNote.text,
      date: new Date().toLocaleDateString('es-CL'),
    };

    onAddGlobalNote(note);
    setNewNote({ tag: currentTitle.main.toUpperCase(), text: '' });
    setShowNoteForm(false);
  };

  const filteredGuides = profile.guides.filter(g => 
    (g.category === currentTitle.main || activeTab === 'all') && (
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredNotes = profile.notes.filter(n => 
    n.tag === currentTitle.main.toUpperCase() || activeTab === 'all'
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
      {/* Background Page Identifier */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none -z-10 rotate-12">
        <IconComponent />
      </div>

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/5">
        <div>
          <h2 className="text-[10px] font-bold text-vortex-accent uppercase tracking-[0.3em] mb-2">{currentTitle.top}</h2>
          <h1 className="text-4xl font-serif text-white italic">{currentTitle.main}</h1>
        </div>
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleAddGuide} 
            className="hidden" 
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="vortex-button-primary flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Adjuntar Guía
          </button>
        </div>
      </header>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-vortex-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar guías o materias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="vortex-input w-full pl-12 bg-vortex-surface/50 border-slate-800"
          />
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredGuides.map((guide, i) => (
            <motion.div
              key={guide.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="vortex-card p-6 bg-vortex-surface/40 hover:border-vortex-accent/30 flex flex-col group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => handleDeleteGuide(guide.id)}
                  className="p-2 text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-900 rounded">
                  <FileText className="w-4 h-4 text-vortex-accent" />
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${
                  guide.status === 'RESOLVED' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' : 'bg-vortex-accent/5 text-vortex-accent border-vortex-accent/20'
                }`}>
                  {guide.status}
                </span>
              </div>
              
              <h3 className="text-lg font-serif italic text-white mb-2 leading-tight group-hover:text-vortex-accent transition-colors">{guide.title}</h3>
              <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-600 mt-auto pt-4 border-t border-slate-800/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {guide.date}
                </span>
              </div>
            </motion.div>
          ))}

          {filteredGuides.length === 0 && (
            <div className="col-span-full py-20 text-center vortex-card border-dashed border-slate-800 bg-transparent">
              <p className="text-slate-600 font-serif italic text-lg">No hay guías adjuntas en esta terminal.</p>
              <p className="text-[10px] uppercase tracking-widest mt-2">Usa el botón superior para subir material operativo.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="vortex-card p-8 bg-[#0a0e14]/30 border-slate-800">
        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
          <h3 className="text-xl font-serif text-white italic">Bitácora de Apuntes</h3>
          <button 
            onClick={() => setShowNoteForm(!showNoteForm)}
            className="vortex-button-secondary py-1 text-[9px]"
          >
            {showNoteForm ? 'Cancelar' : 'Nuevo Apunte'}
          </button>
        </div>

        <AnimatePresence>
          {showNoteForm && (
            <motion.form 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleAddNote}
              className="mb-8 space-y-4 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select 
                  className="vortex-input text-[10px] uppercase font-bold tracking-widest"
                  value={newNote.tag}
                  onChange={e => setNewNote({ ...newNote, tag: e.target.value })}
                >
                  <option value={currentTitle.main.toUpperCase()}>{currentTitle.main}</option>
                  <option value="IMPORTANTE">Importante</option>
                  <option value="REVISAR">Revisar</option>
                  <option value="DUDAS">Dudas</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Escritura de apunte o recordatorio..."
                  className="vortex-input md:col-span-3 text-xs"
                  value={newNote.text}
                  onChange={e => setNewNote({ ...newNote, text: e.target.value })}
                  autoFocus
                />
              </div>
              <button type="submit" className="vortex-button-primary w-full py-2">
                Archivar en Bitácora
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="space-y-1">
          {filteredNotes.map((note, i) => (
            <div key={note.id} className="flex gap-6 p-4 hover:bg-slate-800/20 transition-all group">
              <div className="hidden sm:block text-right min-w-[80px]">
                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest group-hover:text-vortex-accent transition-colors">{note.date}</p>
              </div>
              <div className="w-px bg-slate-800"></div>
              <div className="flex-1">
                <span className="text-[9px] font-bold text-vortex-accent mb-2 inline-block tracking-widest">
                  [{note.tag}]
                </span>
                <p className="text-sm text-slate-400 leading-relaxed font-light">{note.text}</p>
              </div>
              <button 
                onClick={async () => {
                  await fetch(`/api/notes/${note.id}`, { method: 'DELETE' });
                }}
                className="opacity-0 group-hover:opacity-100 text-slate-700 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {filteredNotes.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-700 font-serif italic">Bitácora vacía para esta sección. Registra tus apuntes específicos.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
