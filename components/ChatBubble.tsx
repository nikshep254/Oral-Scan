import React from 'react';
import { Message, UserRole } from '../types';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === UserRole.USER;

  // Simple Markdown formatting helper
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className={`min-h-[1rem] ${i > 0 ? 'mt-2' : ''}`}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  const timeString = message.timestamp instanceof Date 
    ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}>
      <div 
        className={`
          flex flex-col max-w-[85%] md:max-w-[70%] 
          ${isUser ? 'items-end' : 'items-start'}
        `}
      >
        <div 
          className={`
            relative px-5 py-3.5 text-[15px] leading-relaxed shadow-sm
            ${isUser 
              ? 'bg-[#0071e3] text-white rounded-[20px] rounded-br-sm' 
              : 'bg-white text-[#1d1d1f] rounded-[20px] rounded-bl-sm'
            }
            ${message.isError ? 'bg-red-50 text-red-600' : ''}
          `}
        >
          {message.image && (
            <div className="mb-3 rounded-xl overflow-hidden shadow-sm">
              <img 
                src={message.image} 
                alt="User upload" 
                className="max-h-60 w-full object-cover"
              />
            </div>
          )}
          
          <div>
            {formatText(message.text)}
          </div>
        </div>
        
        <span className={`text-[10px] mt-1.5 px-2 font-medium tracking-wide ${isUser ? 'text-slate-400' : 'text-slate-400'}`}>
          {isUser ? 'You' : 'OralScan AI'} • {timeString}
        </span>
      </div>
    </div>
  );
};