import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Clock, Users, Globe, FileText, ExternalLink } from 'lucide-react';

interface HistoryResource {
  id: string;
  title: string;
  type: 'video' | 'document' | 'timeline' | 'quiz';
  description: string;
  url?: string;
  embedId?: string;
  duration?: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  topics: string[];
}

const HISTORY_RESOURCES: HistoryResource[] = [
  {
    id: 'main-video',
    title: 'Historia de Chile - Clase Principal',
    type: 'video',
    description: 'Video educativo principal sobre la historia de Chile, cubriendo los períodos más importantes desde la época precolombina hasta la actualidad.',
    embedId: 'ttdq818TGD0',
    duration: '45 min',
    difficulty: 'Intermedio',
    topics: ['Historia de Chile', 'Períodos Históricos', 'Cultura Nacional', 'Procesos Sociales']
  },
  {
    id: 'timeline',
    title: 'Línea de Tiempo Interactiva',
    type: 'timeline',
    description: 'Explora los eventos más importantes de la historia chilena de forma cronológica e interactiva.',
    difficulty: 'Básico',
    topics: ['Cronología', 'Eventos Históricos', 'Fechas Importantes']
  },
  {
    id: 'independence',
    title: 'La Independencia de Chile',
    type: 'document',
    description: 'Análisis detallado del proceso de independencia, sus causas, desarrollo y consecuencias.',
    difficulty: 'Avanzado',
    topics: ['Independencia', 'Siglo XIX', 'Procesos Políticos']
  },
  {
    id: 'quiz-colonial',
    title: 'Evaluación: Período Colonial',
    type: 'quiz',
    description: 'Pon a prueba tus conocimientos sobre el período colonial chileno.',
    difficulty: 'Intermedio',
    topics: ['Período Colonial', 'Evaluación', 'Repaso']
  }
];

const STUDY_TOPICS = [
  'Pueblos Originarios',
  'Conquista Española',
  'Período Colonial',
  'Independencia',
  'República Conservadora',
  'República Liberal',
  'Siglo XX',
  'Chile Contemporáneo'
];

export default function ModuleHistory() {
  const [selectedResource, setSelectedResource] = useState<HistoryResource>(HISTORY_RESOURCES[0]);
  const [activeTab, setActiveTab] = useState<'resources' | 'topics' | 'notes'>('resources');

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'timeline': return <Clock className="w-4 h-4" />;
      case 'quiz': return <Users className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'text-green-400 bg-green-900/20 border-green-600/30';
      case 'Intermedio': return 'text-amber-400 bg-amber-900/20 border-amber-600/30';
      case 'Avanzado': return 'text-red-400 bg-red-900/20 border-red-600/30';
      default: return 'text-slate-400 bg-slate-900/20 border-slate-600/30';
    }
  };

  const renderResourceContent = () => {
    if (selectedResource.type === 'video' && selectedResource.embedId) {
      return (
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${selectedResource.embedId}?rel=0&modestbranding=1`}
            title={selectedResource.title}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      );
    }

    return (
      <div className="aspect-video bg-slate-900/50 rounded-lg border border-slate-700 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 bg-vortex-accent/20 rounded-full flex items-center justify-center">
          {getResourceIcon(selectedResource.type)}
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">{selectedResource.title}</h3>
          <p className="text-sm text-slate-400 max-w-md">{selectedResource.description}</p>
          {selectedResource.type === 'document' && (
            <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-vortex-accent hover:bg-red-700 text-white rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
              Abrir Documento
            </button>
          )}
          {selectedResource.type === 'timeline' && (
            <div className="mt-4 text-xs text-slate-500">
              Funcionalidad en desarrollo - Próximamente disponible
            </div>
          )}
          {selectedResource.type === 'quiz' && (
            <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Users className="w-4 h-4" />
              Iniciar Evaluación
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif italic text-white mb-2">Historia de Chile</h1>
          <p className="text-sm text-slate-400">
            Explora la rica historia de nuestro país desde sus orígenes hasta la actualidad
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-vortex-accent" />
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Módulo Educativo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Navigation Tabs */}
          <div className="flex lg:flex-col gap-2">
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'resources'
                  ? 'bg-vortex-accent text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Play className="w-4 h-4" />
              Recursos
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'topics'
                  ? 'bg-vortex-accent text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Temas
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'notes'
                  ? 'bg-vortex-accent text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              Apuntes
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'resources' && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Recursos Disponibles</h3>
              {HISTORY_RESOURCES.map((resource) => (
                <motion.button
                  key={resource.id}
                  onClick={() => setSelectedResource(resource)}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedResource.id === resource.id
                      ? 'bg-vortex-accent/10 border-vortex-accent/50 text-white'
                      : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                      selectedResource.id === resource.id ? 'bg-vortex-accent/20' : 'bg-slate-800'
                    }`}>
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{resource.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
                        {resource.duration && (
                          <span className="text-xs text-slate-500">{resource.duration}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {activeTab === 'topics' && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Temas de Estudio</h3>
              <div className="space-y-2">
                {STUDY_TOPICS.map((topic, index) => (
                  <div
                    key={topic}
                    className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/30 border border-slate-700/50"
                  >
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                      {index + 1}
                    </div>
                    <span className="text-sm text-slate-300">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Mis Apuntes</h3>
              <div className="p-4 bg-slate-900/30 border border-slate-700/50 rounded-lg">
                <p className="text-xs text-slate-500 italic">
                  Funcionalidad de apuntes en desarrollo. Próximamente podrás tomar notas durante las clases.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Resource Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-900/30 border border-slate-700/50 rounded-lg">
            <div>
              <h2 className="text-lg font-semibold text-white">{selectedResource.title}</h2>
              <p className="text-sm text-slate-400 mt-1">{selectedResource.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-3 py-1 rounded-full border ${getDifficultyColor(selectedResource.difficulty)}`}>
                {selectedResource.difficulty}
              </span>
              {selectedResource.duration && (
                <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                  {selectedResource.duration}
                </span>
              )}
            </div>
          </div>

          {/* Resource Content */}
          {renderResourceContent()}

          {/* Topics Tags */}
          <div className="flex flex-wrap gap-2">
            {selectedResource.topics.map((topic) => (
              <span
                key={topic}
                className="text-xs px-3 py-1 bg-blue-900/20 text-blue-300 border border-blue-600/30 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}