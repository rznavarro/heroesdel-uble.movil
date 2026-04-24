import { Bot, Key, ExternalLink } from 'lucide-react';

export default function AISetupGuide() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900/50 rounded-xl border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vortex-accent to-purple-600 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Configurar Asistente IA</h2>
          <p className="text-sm text-slate-400">Integra OpenAI para funciones educativas avanzadas</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">Paso 1: Obtener API Key</span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Necesitas una API key de OpenAI para habilitar las funciones de IA educativa.
          </p>
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Obtener API Key
          </a>
        </div>

        <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-green-300">Paso 2: Configurar Variable</span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Agrega tu API key al archivo .env en la raíz del proyecto:
          </p>
          <div className="bg-slate-800 p-3 rounded border font-mono text-xs text-green-400">
            VITE_OPENAI_API_KEY="sk-tu-api-key-aqui"
          </div>
        </div>

        <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-amber-300">Paso 3: Reiniciar Servidor</span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Después de agregar la API key, reinicia el servidor de desarrollo:
          </p>
          <div className="bg-slate-800 p-3 rounded border font-mono text-xs text-amber-400">
            npm run dev
          </div>
        </div>

        <div className="p-4 bg-purple-900/20 border border-purple-600/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Funciones Disponibles</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1">
            <li>• <strong>Resolver Dudas:</strong> Explicaciones paso a paso</li>
            <li>• <strong>Explicar Conceptos:</strong> Definiciones claras con ejemplos</li>
            <li>• <strong>Generar Resúmenes:</strong> Síntesis de temas complejos</li>
            <li>• <strong>Ayuda Matemática:</strong> Resolución de problemas</li>
            <li>• <strong>Asistencia de Idiomas:</strong> Traducciones y gramática</li>
          </ul>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-slate-500">
            Sin API key, el sistema usará respuestas simuladas para demostración.
          </p>
        </div>
      </div>
    </div>
  );
}