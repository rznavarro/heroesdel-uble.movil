import { motion } from 'motion/react';
import { Disc3, Pause, Play, Music } from 'lucide-react';
import { useState } from 'react';

interface Song {
  title: string;
  src: string;
  category: string;
}

interface ModuleMusicProps {
  isPlaying: boolean;
  songs: Song[];
  currentSongIndex: number;
  onTogglePlayback: () => void;
  onSelectSong: (index: number) => void;
}

export default function ModuleMusic({ isPlaying, songs, currentSongIndex, onTogglePlayback, onSelectSong }: ModuleMusicProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Obtener categorías únicas
  const categories = [...new Set(songs.map(song => song.category))];
  
  // Filtrar canciones por categoría
  const filteredSongs = selectedCategory 
    ? songs.filter(song => song.category === selectedCategory)
    : songs;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between bg-vortex-surface/50 -mx-6 md:-mx-12 px-6 md:px-12 mb-8">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-1">Módulo de Audio</h2>
          <div className="flex items-center gap-4">
            <span className="text-xl font-serif text-slate-100 italic">Música Motivacional</span>
            <span className="px-2 py-0.5 bg-vortex-accent/10 text-vortex-accent border border-vortex-accent/20 rounded text-[10px] font-bold uppercase tracking-wider">
              {songs.length} Canciones
            </span>
          </div>
        </div>
        <div className="flex gap-8 text-right hidden sm:flex">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Reproduciendo</div>
            <div className="text-lg font-serif italic text-vortex-accent">{songs[currentSongIndex]?.title.split(' - ')[0] || 'Ninguna'}</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reproductor Principal */}
        <div className="lg:col-span-1">
          <div className="vortex-card p-8 bg-vortex-surface/30 sticky top-8">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 8, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-vortex-accent via-red-900 to-slate-900 flex items-center justify-center border border-vortex-accent/30 shadow-[0_0_60px_rgba(204,0,0,0.2)] mb-6"
            >
              <Disc3 className="w-12 h-12 text-white/80" />
            </motion.div>

            <div className="text-center mb-6">
              <h3 className="text-lg font-serif text-white mb-2">Reproductor</h3>
              <p className="text-xs text-slate-400 mb-1">{songs[currentSongIndex]?.category}</p>
              <p className="text-sm text-vortex-accent font-semibold">{songs[currentSongIndex]?.title}</p>
            </div>

            <button
              onClick={onTogglePlayback}
              className="w-full h-12 rounded-xl bg-vortex-accent hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-white font-semibold mb-4"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pausar' : 'Reproducir'}
            </button>

            <div className="text-center">
              <p className="text-[10px] text-slate-600 font-mono uppercase tracking-wider">
                Canción {currentSongIndex + 1} de {songs.length}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Canciones */}
        <div className="lg:col-span-2">
          {/* Filtros por Categoría */}
          <div className="mb-6">
            <h3 className="text-lg font-serif text-white mb-4">Categorías</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === null
                    ? 'bg-vortex-accent text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                Todas ({songs.length})
              </button>
              {categories.map(category => {
                const count = songs.filter(s => s.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                      selectedCategory === category
                        ? 'bg-vortex-accent text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lista de Canciones */}
          <div className="vortex-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-5 h-5 text-vortex-accent" />
              <h3 className="text-lg font-serif text-white">
                {selectedCategory ? `${selectedCategory} (${filteredSongs.length})` : `Todas las Canciones (${songs.length})`}
              </h3>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredSongs.map((song, idx) => {
                const globalIndex = songs.findIndex(s => s.title === song.title);
                return (
                  <button
                    key={song.title}
                    onClick={() => onSelectSong(globalIndex)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors group ${
                      globalIndex === currentSongIndex
                        ? 'border-vortex-accent/50 bg-vortex-accent/10 text-white'
                        : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{song.title}</p>
                        <p className="text-xs text-slate-500">{song.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {globalIndex === currentSongIndex && isPlaying && (
                          <div className="flex gap-1">
                            <div className="w-1 h-4 bg-vortex-accent animate-pulse"></div>
                            <div className="w-1 h-4 bg-vortex-accent animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1 h-4 bg-vortex-accent animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        )}
                        <Play className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
