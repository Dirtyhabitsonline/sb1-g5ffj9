import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { socket } from '../../lib/socket';

interface Message {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
}

interface GameChatProps {
  roomId: string;
}

export default function GameChat({ roomId }: GameChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('chat:message', (newMessage: Message) => {
      if (newMessage.roomId === roomId) {
        setMessages(prev => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off('chat:message');
    };
  }, [roomId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    socket.emit('chat:send', {
      roomId,
      content: message.trim()
    });
    
    setMessage('');
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-4">
      <h3 className="font-semibold mb-4">Chat</h3>
      
      <div className="h-[300px] mb-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-gray-700/50 rounded-lg p-3">
              <p className="text-sm font-medium text-purple-400">{msg.username}</p>
              <p className="text-sm text-gray-300">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-700/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}