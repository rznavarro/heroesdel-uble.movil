import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Mic, MicOff, Volume2, VolumeX, Settings, Play, Pause } from 'lucide-react';

interface ModuleVoiceAgentProps {
  profile?: any;
}

export default function ModuleVoiceAgent({ profile }: ModuleVoiceAgentProps) {
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [agentSettings, setAgentSettings] = useState({
    voice: 'Rachel', // Voz por defecto de ElevenLabs
    speed: 1.0,
    stability: 0.5,
    clarity: 0.75
  });
  
  const elevenLabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Aquí se inicializaría el agente de ElevenLabs
    if (isAgentActive) {
      initializeElevenLabsAgent();
    }
  }, [isAgentActive]);

  const initializeElevenLabsAgent = () => {
    // Configuración del agente de ElevenLabs
    console.log('Inicializando agente de ElevenLabs...');
    
    // Aquí iría la integración real con ElevenLabs
    // Por ahora simulamos la funcionalidad
    if (elevenLabsRef.current) {
      // Crear el iframe o elemento del agente
      const agentContainer = document.createElement('div');
      agentContainer.innerHTML = `
        <div style="
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: system-ui;
        ">
          <div style="font-size: 24px; margin-bottom: 16px;">🎤</div>
          <h3 style="margin: 0 0 8px 0;">Agente de Voz ElevenLabs</h3>
          <p style="margin: 0; opacity: 0.8; text-align: center; padding: 0 20px;">
            Agente de voz inteligente para asistencia educativa
          </p>
          <div style="margin-top: 20px; display: flex; gap: 12px;">
            <button style="
              padding: 8px 16px;
              background: rgba(255,255,255,0.2);
              border: none;
              border-radius: 6px;
              color: white;
              cursor: pointer;
            ">Iniciar Conversación</button>
            <button style="
              padding: 8px 16px;
              background: rgba(255,255,255,0.2);
              border: none;
              border-radius: 6px;
              color: white;
              cursor: pointer;
            ">Configurar Voz</button>
          </div>
        </div>
      `;
      
      elevenLabsRef.current.appendChild(agentContainer);
    }
  };

  const toggleAgent = () => {
    setIsAgentActive(!isAgentActive);
    if (elevenLabsRef.current) {
      elevenLabsRef.current.innerHTML = '';
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Aquí iría la lógica para iniciar/detener el reconocimiento de voz
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // Aquí iría la lógica para iniciar/detener la síntesis de voz
  };

  return (
    <div className="min-h-screen bg-vortex-dark p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Volume2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif italic text-white mb-2">
            Agente de Voz Inteligente
          </h1>
          <p className="text-slate-400 text-sm uppercase tracking-widest">
            Powered by ElevenLabs
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-vortex-surface/50 backdrop-blur-md border border-slate-800/50 rounded-xl p-6 mb-6"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Botón principal del agente */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAgent}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isAgentActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isAgentActive ? (
                <>
                  <Pause className="w-4 h-4 inline mr-2" />
                  Detener Agente
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 inline mr-2" />
                  Activar Agente
                </>
              )}
            </motion.button>

            {/* Control de micrófono */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleListening}
              disabled={!isAgentActive}
              className={`px-4 py-3 rounded-lg transition-all ${
                isListening
                  ? 'bg-red-500/20 border border-red-500 text-red-400'
                  : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white'
              } ${!isAgentActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </motion.button>

            {/* Control de volumen */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSpeaking}
              disabled={!isAgentActive}
              className={`px-4 py-3 rounded-lg transition-all ${
                isSpeaking
                  ? 'bg-blue-500/20 border border-blue-500 text-blue-400'
                  : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white'
              } ${!isAgentActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>

            {/* Configuración */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Volume Slider */}
          <div className="mt-4 flex items-center gap-3">
            <VolumeX className="w-4 h-4 text-slate-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <Volume2 className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-400 w-12">{Math.round(volume * 100)}%</span>
          </div>
        </motion.div>

        {/* Agent Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-vortex-surface/30 backdrop-blur-md border border-slate-800/50 rounded-xl overflow-hidden"
        >
          <div className="p-4 border-b border-slate-800/50">
            <h3 className="text-lg font-medium text-white">Interfaz del Agente</h3>
            <p className="text-sm text-slate-400">
              {isAgentActive ? 'Agente activo - Listo para interactuar' : 'Presiona "Activar Agente" para comenzar'}
            </p>
          </div>
          
          <div ref={elevenLabsRef} className="min-h-[400px] p-6">
            {!isAgentActive && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Mic className="w-12 h-12" />
                </div>
                <h4 className="text-xl font-medium mb-2">Agente de Voz Desactivado</h4>
                <p className="text-center max-w-md">
                  Activa el agente para comenzar a interactuar con la IA de voz educativa.
                  Podrás hacer preguntas, recibir explicaciones y obtener ayuda personalizada.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Settings Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-vortex-surface/30 backdrop-blur-md border border-slate-800/50 rounded-xl p-6"
        >
          <h3 className="text-lg font-medium text-white mb-4">Configuración de Voz</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voice Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Voz del Agente
              </label>
              <select
                value={agentSettings.voice}
                onChange={(e) => setAgentSettings({...agentSettings, voice: e.target.value})}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-vortex-accent"
              >
                <option value="Rachel">Rachel (Femenina, Profesional)</option>
                <option value="Josh">Josh (Masculina, Amigable)</option>
                <option value="Bella">Bella (Femenina, Joven)</option>
                <option value="Antoni">Antoni (Masculina, Narrativa)</option>
              </select>
            </div>

            {/* Speed Control */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Velocidad: {agentSettings.speed}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={agentSettings.speed}
                onChange={(e) => setAgentSettings({...agentSettings, speed: parseFloat(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Stability Control */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Estabilidad: {Math.round(agentSettings.stability * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={agentSettings.stability}
                onChange={(e) => setAgentSettings({...agentSettings, stability: parseFloat(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Clarity Control */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Claridad: {Math.round(agentSettings.clarity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={agentSettings.clarity}
                onChange={(e) => setAgentSettings({...agentSettings, clarity: parseFloat(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </motion.div>

        {/* Status Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full text-sm text-slate-400">
            <div className={`w-2 h-2 rounded-full ${isAgentActive ? 'bg-green-500' : 'bg-slate-600'}`} />
            {isAgentActive ? 'Agente Conectado' : 'Agente Desconectado'}
          </div>
        </motion.div>
      </div>
    </div>
  );
}