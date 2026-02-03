import React from 'react';
import { ChatSession } from '../types';

interface SidebarProps {
  isOpen: boolean;
  sessions: ChatSession[];
  currentSessionId: string;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (e: React.MouseEvent, id: string) => void;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  sessions, 
  currentSessionId, 
  onNewChat, 
  onSelectChat, 
  onDeleteChat,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onCloseMobile}
        ></div>
      )}

      {/* Sidebar Content */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-72 bg-[#F5F5F7] border-r border-slate-200 flex flex-col
          transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden'}
          md:relative pt-14 md:pt-0
        `}
        style={!isOpen && window.innerWidth >= 768 ? { width: 0, padding: 0 } : {}}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 text-lg">History</h2>
          <button 
            onClick={onNewChat}
            className="p-2 text-[#0071e3] hover:bg-[#0071e3]/10 rounded-full transition-colors"
            title="New Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-hide pb-4">
          {sessions.length === 0 ? (
            <div className="text-slate-400 text-sm text-center py-8 font-light">
              No previous scans
            </div>
          ) : (
            sessions.map((session) => (
              <div 
                key={session.id}
                onClick={() => onSelectChat(session.id)}
                className={`
                  group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                  ${currentSessionId === session.id 
                    ? 'bg-white shadow-sm text-slate-900' 
                    : 'hover:bg-slate-200/50 text-slate-500 hover:text-slate-700'
                  }
                `}
              >
                <div className="flex flex-col overflow-hidden">
                  <span className="font-medium truncate text-[13px]">
                    {session.title || "New Consultation"}
                  </span>
                  <span className="text-[10px] opacity-60">
                    {new Date(session.lastModified).toLocaleDateString()}
                  </span>
                </div>
                
                <button
                  onClick={(e) => onDeleteChat(e, session.id)}
                  className="p-1 rounded text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete Chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
};