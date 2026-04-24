import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { callOpenAI, generateMockAIResponse } from '../lib/openai';
import { VORTEX_PROFILES } from '../data/profiles';
import { UserProfile } from '../types';
import { Send, Users, ChevronLeft, Bot, BookOpen, Lightbulb, FileText, Calculator, Globe, Settings } from 'lucide-react';
import AISetupGuide from './AISetupGuide';

interface Message {
  id: string;
  from_code: string;
  from_name: string;
  to_code: string | null;
  text: string | null;
  created_at: string;
}

interface ModuleChatProps {
  currentUser: UserProfile;
}

const ALL_USERS = Object.values(VORTEX_PROFILES).filter(p => p.code !== 'VX-13');

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getAvatarColor(code: string) {
  const colors = [
    'bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-amber-600',
    'bg-pink-600', 'bg-cyan-600', 'bg-red-600', 'bg-indigo-600',
  ];
  const idx = parseInt(code.replace('VX-', ''), 10) % colors.length;
  return colors[idx];
}

function formatTime(ts: string) {
  const d = new Date(ts);
  return d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
}

export default function ModuleChatSimple({ currentUser }: ModuleChatProps) {
  const [selectedContact, setSelectedContact] = useState<UserProfile | 'group' | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [showAIButtons, setShowAIButtons] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAISetup, setShowAISetup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cargar mensajes cuando cambia el contacto
  useEffect(() => {
    if (!selectedContact) return;
    loadMessages();
    
    // Actualizar cada 3 segundos
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedContact]);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function loadMessages() {
    try {
      let query = supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (selectedContact === 'group') {
        // Mensajes grupales (to_code es null)
        query = query.is('to_code', null);
      } else if (selectedContact) {
        // Mensajes privados entre currentUser y selectedContact
        const contactCode = (selectedContact as UserProfile).code;
        query = query.or(
          `and(from_code.eq.${currentUser.code},to_code.eq.${contactCode}),and(from_code.eq.${contactCode},to_code.eq.${currentUser.code})`
        );
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages(data || []);
    } catch (err) {
      console.error('Error:', err);
    }
  }

  async function sendMessage() {
    if (!text.trim() || sending || !selectedContact) return;

    setSending(true);
    try {
      const toCode = selectedContact === 'group' ? null : (selectedContact as UserProfile).code;
      
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          from_code: currentUser.code,
          from_name: currentUser.name,
          to_code: toCode,
          text: text.trim()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        alert('Error al enviar mensaje: ' + error.message);
        return;
      }

      // Agregar mensaje a la lista local inmediatamente
      setMessages(prev => [...prev, data]);
      setText('');
      
      console.log('Mensaje enviado exitosamente:', data);
    } catch (err) {
      console.error('Error:', err);
      alert('Error al enviar mensaje');
    } finally {
      setSending(false);
    }
  }

  async function sendAIMessage(prompt: string, type: string) {
    if (!selectedContact) return;
    
    setAiLoading(true);
    try {
      // Enviar mensaje del usuario primero
      const userMessage = `🤖 ${type}: ${prompt}`;
      await sendMessageDirect(userMessage);
      
      // Llamar a OpenAI o usar respuesta simulada
      const aiResult = await callOpenAI({ prompt, type });
      
      let aiResponse = '';
      if (aiResult.success) {
        aiResponse = `🤖 **IA Educativa** - ${type}:\n\n${aiResult.response}`;
      } else {
        // Si falla OpenAI, usar respuesta simulada
        console.log('Using mock response:', aiResult.error);
        aiResponse = generateMockAIResponse(prompt, type);
      }
      
      // Enviar respuesta de IA
      await sendMessageDirect(aiResponse, 'VX-AI');
      
    } catch (err) {
      console.error('Error AI:', err);
      // Fallback a respuesta simulada
      const fallbackResponse = generateMockAIResponse(prompt, type);
      await sendMessageDirect(fallbackResponse, 'VX-AI');
    } finally {
      setAiLoading(false);
    }
  }

  async function sendMessageDirect(messageText: string, fromCode?: string) {
    try {
      const toCode = selectedContact === 'group' ? null : (selectedContact as UserProfile).code;
      
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          from_code: fromCode || currentUser.code,
          from_name: fromCode === 'VX-AI' ? '🤖 IA Educativa' : currentUser.name,
          to_code: toCode,
          text: messageText
        }])
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        return;
      }

      setMessages(prev => [...prev, data]);
    } catch (err) {
      console.error('Error:', err);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const contactName = selectedContact === 'group'
    ? 'Grupo — Los Héroes de Ñuble'
    : (selectedContact as UserProfile)?.name ?? '';

  const hasOpenAIKey = !!import.meta.env.VITE_OPENAI_API_KEY;

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden rounded-xl border border-slate-800 bg-vortex-surface/20">
      
      {/* Modal de configuración de IA */}
      {showAISetup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAISetup(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              ×
            </button>
            <AISetupGuide />
          </div>
        </div>
      )}
      
      {/* Lista de contactos */}
      <div className={`w-full md:w-72 flex-shrink-0 border-r border-slate-800 flex flex-col ${selectedContact ? 'hidden md:flex' : 'flex'}`}>
        <div className="px-5 py-4 border-b border-slate-800 bg-vortex-surface/50">
          <h2 className="text-lg font-serif italic text-white">Chat</h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-0.5">
            {currentUser.name} — {currentUser.code}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Chat grupal */}
          <button
            onClick={() => setSelectedContact('group')}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 ${
              selectedContact === 'group' ? 'bg-vortex-accent/10 border-l-2 border-l-vortex-accent' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vortex-accent to-red-900 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Grupo General</p>
              <p className="text-[10px] text-slate-500 truncate">Todos los integrantes</p>
            </div>
          </button>

          {/* Contactos individuales */}
          {ALL_USERS.filter(u => u.code !== currentUser.code).map(user => (
            <button
              key={user.code}
              onClick={() => setSelectedContact(user)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 transition-colors border-b border-slate-800/30 ${
                (selectedContact as UserProfile)?.code === user.code
                  ? 'bg-vortex-accent/10 border-l-2 border-l-vortex-accent'
                  : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${getAvatarColor(user.code)} flex items-center justify-center flex-shrink-0`}>
                <span className="text-xs font-bold text-white">{getInitials(user.name)}</span>
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.code} // {user.targetInstitution}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Área de chat */}
      <div className={`flex-1 flex flex-col min-w-0 ${!selectedContact ? 'hidden md:flex' : 'flex'}`}>
        {!selectedContact ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-700 gap-4">
            <Users className="w-16 h-16 opacity-20" />
            <p className="text-sm font-mono italic">Selecciona un contacto para chatear</p>
          </div>
        ) : (
          <>
            {/* Header del chat */}
            <div className="px-4 py-3 border-b border-slate-800 bg-vortex-surface/50 flex items-center gap-3">
              <button
                className="md:hidden text-slate-400 hover:text-white"
                onClick={() => setSelectedContact(null)}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {selectedContact === 'group' ? (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-vortex-accent to-red-900 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className={`w-9 h-9 rounded-full ${getAvatarColor((selectedContact as UserProfile).code)} flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white">{getInitials((selectedContact as UserProfile).name)}</span>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-white">{contactName}</p>
                <p className="text-[10px] text-slate-500 font-mono">
                  {selectedContact === 'group' ? `${ALL_USERS.length} integrantes` : (selectedContact as UserProfile).targetInstitution}
                </p>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-700 gap-3">
                  <Send className="w-10 h-10 opacity-20" />
                  <p className="text-sm font-mono italic">No hay mensajes aún. ¡Sé el primero!</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.from_code === currentUser.code;
                  const isAI = msg.from_code === 'VX-AI';
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {!isMe && (
                        <div className={`w-7 h-7 rounded-full ${
                          isAI 
                            ? 'bg-gradient-to-br from-vortex-accent to-purple-600' 
                            : getAvatarColor(msg.from_code)
                        } flex items-center justify-center flex-shrink-0`}>
                          {isAI ? (
                            <Bot className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-[10px] font-bold text-white">{getInitials(msg.from_name)}</span>
                          )}
                        </div>
                      )}
                      <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                        {!isMe && selectedContact === 'group' && (
                          <span className={`text-[10px] font-mono mb-1 px-1 ${
                            isAI ? 'text-vortex-accent' : 'text-slate-500'
                          }`}>{msg.from_name}</span>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2.5 shadow ${
                            isMe
                              ? 'bg-vortex-accent text-white rounded-br-sm'
                              : isAI
                              ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-vortex-accent/30 text-slate-100 rounded-bl-sm'
                              : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                          }`}
                        >
                          <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                            isAI ? 'font-mono' : ''
                          }`}>{msg.text}</p>
                        </div>
                        <span className={`text-[10px] text-slate-600 mt-1 font-mono ${isMe ? 'text-right' : 'text-left'}`}>
                          {formatTime(msg.created_at)}
                        </span>
                      </div>
                    </motion.div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de mensaje */}
            <div className="px-4 py-3 border-t border-slate-800 bg-vortex-surface/70">
              
              {/* Botones de IA */}
              {showAIButtons && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 p-3 bg-slate-900/80 rounded-xl border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-vortex-accent" />
                      <span className="text-xs font-semibold text-vortex-accent">Asistente IA Educativo</span>
                      {!hasOpenAIKey && (
                        <span className="text-[10px] bg-amber-600/20 text-amber-300 px-2 py-0.5 rounded">DEMO</span>
                      )}
                    </div>
                    {!hasOpenAIKey && (
                      <button
                        onClick={() => setShowAISetup(true)}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 rounded text-[10px] text-blue-300 transition-colors"
                      >
                        <Settings className="w-3 h-3" />
                        Configurar
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        const prompt = window.prompt('¿Qué duda tienes?');
                        if (prompt) sendAIMessage(prompt, 'Resolver Duda');
                      }}
                      disabled={aiLoading}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 rounded-lg text-xs text-blue-300 transition-colors disabled:opacity-50"
                    >
                      <Lightbulb className="w-3 h-3" />
                      Resolver Duda
                    </button>
                    
                    <button
                      onClick={() => {
                        const prompt = window.prompt('¿Qué concepto quieres que explique?');
                        if (prompt) sendAIMessage(prompt, 'Explicar Concepto');
                      }}
                      disabled={aiLoading}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 rounded-lg text-xs text-green-300 transition-colors disabled:opacity-50"
                    >
                      <BookOpen className="w-3 h-3" />
                      Explicar Concepto
                    </button>
                    
                    <button
                      onClick={() => {
                        const prompt = window.prompt('¿De qué tema quieres un resumen?');
                        if (prompt) sendAIMessage(prompt, 'Generar Resumen');
                      }}
                      disabled={aiLoading}
                      className="flex items-center gap-2 px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/30 rounded-lg text-xs text-purple-300 transition-colors disabled:opacity-50"
                    >
                      <FileText className="w-3 h-3" />
                      Generar Resumen
                    </button>
                    
                    <button
                      onClick={() => {
                        const prompt = window.prompt('¿Qué problema matemático necesitas resolver?');
                        if (prompt) sendAIMessage(prompt, 'Ayuda con Matemáticas');
                      }}
                      disabled={aiLoading}
                      className="flex items-center gap-2 px-3 py-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-600/30 rounded-lg text-xs text-amber-300 transition-colors disabled:opacity-50"
                    >
                      <Calculator className="w-3 h-3" />
                      Matemáticas
                    </button>
                    
                    <button
                      onClick={() => {
                        const prompt = window.prompt('¿Qué necesitas traducir o aprender de idiomas?');
                        if (prompt) sendAIMessage(prompt, 'Traducir/Idiomas');
                      }}
                      disabled={aiLoading}
                      className="flex items-center gap-2 px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-600/30 rounded-lg text-xs text-cyan-300 transition-colors disabled:opacity-50"
                    >
                      <Globe className="w-3 h-3" />
                      Idiomas
                    </button>
                    
                    <button
                      onClick={() => setShowAIButtons(false)}
                      className="flex items-center justify-center px-3 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs text-slate-400 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                  
                  {aiLoading && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-vortex-accent">
                      <div className="w-3 h-3 border-2 border-vortex-accent border-t-transparent rounded-full animate-spin" />
                      IA procesando tu consulta...
                    </div>
                  )}
                </motion.div>
              )}
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAIButtons(!showAIButtons)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${
                    showAIButtons 
                      ? 'bg-vortex-accent text-white' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Bot className="w-4 h-4" />
                </button>
                
                <input
                  type="text"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Mensaje a ${contactName}...`}
                  className="flex-1 bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-vortex-accent/50 transition-colors placeholder:text-slate-600"
                />

                <motion.button
                  onClick={sendMessage}
                  disabled={sending || !text.trim()}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-vortex-accent hover:bg-red-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  {sending ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </motion.button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}