import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  Lightbulb, 
  BookOpen, 
  FileText, 
  Calculator, 
  Globe,
  Plus,
  Smile,
  Paperclip,
  Mic,
  ChevronLeft
} from 'lucide-react';
import { UserProfile } from '../../types';

interface Message {
  id: string;
  from_code: string;
  from_name: string;
  to_code: string | null;
  text: string | null;
  created_at: string;
  isAI?: boolean;
}

interface MobileChatViewProps {
  currentUser: UserProfile;
  chatId: string;
  chatName: string;
  isGroup?: boolean;
  onBack: () => void;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onSendAIMessage: (prompt: string, type: string) => void;
  aiLoading?: boolean;
}

const AI_BUTTONS = [
  { id: 'doubt', label: 'Resolver Duda', icon: Lightbulb, color: 'blue' },
  { id: 'concept', label: 'Explicar', icon: BookOpen, color: 'green' },
  { id: 'summary', label: 'Resumir', icon: FileText, color: 'purple' },
  { id: 'math', label: 'Matemáticas', icon: Calculator, color: 'amber' },
  { id: 'language', label: 'Idiomas', icon: Globe, color: 'cyan' }
];

export default function MobileChatView({
  currentUser,
  chatId,
  chatName,
  isGroup = false,
  onBack,
  messages,
  onSendMessage,
  onSendAIMessage,
  aiLoading = false
}: MobileChatViewProps) {
  const [text, setText] = useState('');
  const [showAIButtons, setShowAIButtons] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto scroll a nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus en input cuando se monta
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
    setShowAIButtons(false);
  };
  
  const handleAIButtonPress = (type: string, label: string) => {
    const prompt = window.prompt(`${label}: ¿Qué necesitas?`);
    if (prompt) {
      onSendAIMessage(prompt, label);
      setShowAIButtons(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  
  const getAvatarColor = (code: string) => {
    const colors = [
      'bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-amber-600',
      'bg-pink-600', 'bg-cyan-600', 'bg-red-600', 'bg-indigo-600',
    ];
    const idx = parseInt(code.replace('VX-', ''), 10) % colors.length;
    return colors[idx];
  };
  
  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full bg-vortex-dark">
      {/* Header del chat */}
      <div className="flex items-center gap-3 p-4 bg-vortex-surface/50 border-b border-slate-800/50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-white truncate">{chatName}</h2>
          <p className="text-xs text-slate-500">
            {isGroup ? 'Grupo activo' : 'En línea'}
          </p>
        </div>
      </div>
      
      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-4">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
              <Send className="w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="font-medium">¡Inicia la conversación!</p>
              <p className="text-sm mt-1">Envía tu primer mensaje o usa la IA educativa</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.from_code === currentUser.code;
            const isAI = msg.from_code === 'VX-AI';
            
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isMe && (
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    isAI 
                      ? 'bg-gradient-to-br from-vortex-accent to-purple-600' 
                      : getAvatarColor(msg.from_code)
                  }`}>
                    {isAI ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-xs font-bold text-white">
                        {getInitials(msg.from_name)}
                      </span>
                    )}
                  </div>
                )}
                
                <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                  {!isMe && isGroup && (
                    <span className={`text-xs mb-1 px-2 ${
                      isAI ? 'text-vortex-accent' : 'text-slate-500'
                    }`}>
                      {msg.from_name}
                    </span>
                  )}
                  
                  <div className={`rounded-2xl px-4 py-3 ${
                    isMe
                      ? 'bg-vortex-accent text-white rounded-br-md'
                      : isAI
                      ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-vortex-accent/30 text-slate-100 rounded-bl-md'
                      : 'bg-slate-800 text-slate-200 rounded-bl-md'
                  }`}>
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                      isAI ? 'font-mono' : ''
                    }`}>
                      {msg.text}
                    </p>
                  </div>
                  
                  <span className="text-xs text-slate-600 mt-1 px-2">
                    {formatTime(msg.created_at)}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Botones de IA */}
      <AnimatePresence>
        {showAIButtons && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-800/50 bg-vortex-surface/30"
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-vortex-accent" />
                <span className="text-sm font-semibold text-vortex-accent">
                  Asistente IA Educativo
                </span>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {AI_BUTTONS.map((button) => {
                  const Icon = button.icon;
                  return (
                    <motion.button
                      key={button.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAIButtonPress(button.id, button.label)}
                      disabled={aiLoading}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors disabled:opacity-50 ${
                        button.color === 'blue' ? 'bg-blue-600/20 border-blue-600/30 text-blue-300' :
                        button.color === 'green' ? 'bg-green-600/20 border-green-600/30 text-green-300' :
                        button.color === 'purple' ? 'bg-purple-600/20 border-purple-600/30 text-purple-300' :
                        button.color === 'amber' ? 'bg-amber-600/20 border-amber-600/30 text-amber-300' :
                        'bg-cyan-600/20 border-cyan-600/30 text-cyan-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {button.label}
                    </motion.button>
                  );
                })}
              </div>
              
              {aiLoading && (
                <div className="flex items-center gap-2 mt-3 text-sm text-vortex-accent">
                  <div className="w-4 h-4 border-2 border-vortex-accent border-t-transparent rounded-full animate-spin" />
                  IA procesando tu consulta...
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Input de mensaje */}
      <div className="p-4 bg-vortex-surface/50 border-t border-slate-800/50">
        <div className="flex items-end gap-3">
          {/* Botón de IA */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAIButtons(!showAIButtons)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              showAIButtons 
                ? 'bg-vortex-accent text-white' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Bot className="w-5 h-5" />
          </motion.button>
          
          {/* Input container */}
          <div className="flex-1 flex items-end gap-2 bg-slate-900 rounded-2xl border border-slate-700 p-2">
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none px-2 py-2 text-base"
            />
            
            {/* Botones adicionales */}
            <div className="flex gap-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"
              >
                <Paperclip className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"
              >
                <Mic className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          
          {/* Botón enviar */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!text.trim()}
            className="w-10 h-10 rounded-full bg-vortex-accent disabled:opacity-50 disabled:bg-slate-800 flex items-center justify-center text-white transition-colors"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}