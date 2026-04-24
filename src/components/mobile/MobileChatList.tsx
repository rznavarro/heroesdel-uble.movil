import React from 'react';
import { motion } from 'motion/react';
import { Users, MessageCircle, Clock } from 'lucide-react';
import { UserProfile } from '../../types';
import { VORTEX_PROFILES } from '../../data/profiles';

interface ChatItem {
  id: string;
  type: 'group' | 'individual';
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  avatar?: string;
  isOnline?: boolean;
  userProfile?: UserProfile;
}

interface MobileChatListProps {
  currentUser: UserProfile;
  onSelectChat: (chat: ChatItem) => void;
  searchQuery?: string;
}

export default function MobileChatList({ currentUser, onSelectChat, searchQuery = '' }: MobileChatListProps) {
  
  // Generar lista de chats
  const generateChatList = (): ChatItem[] => {
    const chats: ChatItem[] = [
      {
        id: 'group',
        type: 'group',
        name: 'Grupo — Los Héroes de Ñuble',
        lastMessage: '🤖 IA Educativa: ¿En qué puedo ayudarte hoy?',
        lastMessageTime: '10:30',
        unreadCount: 3,
        isOnline: true
      }
    ];
    
    // Agregar chats individuales
    Object.values(VORTEX_PROFILES)
      .filter(profile => profile.code !== currentUser.code)
      .forEach(profile => {
        chats.push({
          id: profile.code,
          type: 'individual',
          name: profile.name,
          lastMessage: 'Hola, ¿cómo estás?',
          lastMessageTime: '09:15',
          unreadCount: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
          isOnline: Math.random() > 0.5,
          userProfile: profile
        });
      });
    
    return chats;
  };
  
  const chatList = generateChatList();
  
  // Filtrar chats por búsqueda
  const filteredChats = chatList.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (chat.lastMessage && chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  
  const getAvatarColor = (id: string) => {
    const colors = [
      'bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-amber-600',
      'bg-pink-600', 'bg-cyan-600', 'bg-red-600', 'bg-indigo-600',
    ];
    const index = id.length % colors.length;
    return colors[index];
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header de la lista */}
      <div className="p-4 border-b border-slate-800/50">
        <h2 className="text-lg font-semibold text-white">Conversaciones</h2>
        <p className="text-sm text-slate-400">
          {filteredChats.length} conversación{filteredChats.length !== 1 ? 'es' : ''}
        </p>
      </div>
      
      {/* Lista de chats */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8">
            <MessageCircle className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-center">
              {searchQuery ? 'No se encontraron conversaciones' : 'No hay conversaciones aún'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/30">
            {filteredChats.map((chat, index) => (
              <motion.button
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectChat(chat)}
                className="w-full p-4 flex items-center gap-3 hover:bg-slate-800/30 active:bg-slate-800/50 transition-colors"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  {chat.type === 'group' ? (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-vortex-accent to-red-900 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(chat.id)} flex items-center justify-center`}>
                      <span className="text-sm font-bold text-white">
                        {getInitials(chat.name)}
                      </span>
                    </div>
                  )}
                  
                  {/* Indicador online */}
                  {chat.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-vortex-dark" />
                  )}
                </div>
                
                {/* Contenido del chat */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white truncate">
                      {chat.name}
                    </h3>
                    {chat.lastMessageTime && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {chat.lastMessageTime}
                      </span>
                    )}
                  </div>
                  
                  {chat.lastMessage && (
                    <p className="text-sm text-slate-400 truncate">
                      {chat.lastMessage}
                    </p>
                  )}
                  
                  {/* Información adicional */}
                  {chat.userProfile && (
                    <p className="text-xs text-slate-600 truncate mt-1">
                      {chat.userProfile.targetInstitution}
                    </p>
                  )}
                </div>
                
                {/* Badge de mensajes no leídos */}
                {chat.unreadCount && chat.unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-vortex-accent rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <span className="text-xs font-bold text-white">
                      {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                    </span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}