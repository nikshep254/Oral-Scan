import React, { useState, useRef, useEffect } from 'react';
import { ChatBubble } from './components/ChatBubble';
import { InputArea } from './components/InputArea';
import { DisclaimerModal } from './components/DisclaimerModal';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Onboarding } from './components/Onboarding';
import { generateDiagnosis } from './services/geminiService';
import { compressImage } from './utils/imageUtils';
import { Message, UserRole, ChatSession } from './types';

const STORAGE_KEY = 'oralscan_sessions';

const createInitialMessage = (): Message => ({
  id: 'init-' + Date.now(),
  role: UserRole.MODEL,
  text: "Hello. I am the OralScan AI assistant. \n\nPlease upload a clear photo of the area of concern in your mouth, or describe your symptoms. \n\n**Note:** I am an AI, not a doctor. My analysis is for screening purposes only.",
  timestamp: new Date(),
});

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAgreedToDisclaimer, setHasAgreedToDisclaimer] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed for clean look
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load sessions from storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedSessions: ChatSession[] = JSON.parse(stored).map((s: any) => ({
          ...s,
          messages: s.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }))
        }));
        
        parsedSessions.sort((a, b) => b.lastModified - a.lastModified);
        
        setSessions(parsedSessions);
        if (parsedSessions.length > 0) {
          setCurrentSessionId(parsedSessions[0].id);
          setMessages(parsedSessions[0].messages);
        } else {
          startNewChat();
        }
      } catch (e) {
        console.error("Failed to load history", e);
        startNewChat();
      }
    } else {
      startNewChat();
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      } catch (e) {
        console.error("Storage full or error", e);
      }
    }
  }, [sessions]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const startNewChat = () => {
    const newId = Date.now().toString();
    const initMsg = createInitialMessage();
    const newSession: ChatSession = {
      id: newId,
      title: 'New Consultation',
      messages: [initMsg],
      lastModified: Date.now()
    };
    
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setMessages([initMsg]);
    setIsSidebarOpen(false); 
  };

  const handleSelectChat = (id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session) {
      setCurrentSessionId(id);
      setMessages(session.messages);
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);
    
    if (id === currentSessionId) {
      if (newSessions.length > 0) {
        setCurrentSessionId(newSessions[0].id);
        setMessages(newSessions[0].messages);
      } else {
        startNewChat();
      }
    }
    if (newSessions.length === 0) {
       localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updateCurrentSession = (updatedMessages: Message[], titleUpdate?: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: updatedMessages,
          title: titleUpdate || session.title,
          lastModified: Date.now()
        };
      }
      return session;
    }).sort((a, b) => b.lastModified - a.lastModified));
  };

  const handleSendMessage = async (text: string, imageFile?: File) => {
    let imageBase64: string | undefined;

    if (imageFile) {
      try {
        imageBase64 = await compressImage(imageFile);
      } catch (e) {
        console.error("Image compression failed", e);
        return;
      }
    }

    const userMsgId = Date.now().toString();
    const newUserMsg: Message = {
      id: userMsgId,
      role: UserRole.USER,
      text: text,
      timestamp: new Date(),
      image: imageBase64
    };

    const newMessages = [...messages, newUserMsg];
    setMessages(newMessages);
    
    const currentSession = sessions.find(s => s.id === currentSessionId);
    let newTitle = undefined;
    if (currentSession && currentSession.title === 'New Consultation') {
      newTitle = text.slice(0, 30) + (text.length > 30 ? '...' : '') || 'Analysis Request';
    }

    updateCurrentSession(newMessages, newTitle);
    setIsLoading(true);

    try {
      const responseText = await generateDiagnosis(text, imageBase64);

      const aiMsgId = (Date.now() + 1).toString();
      const newAiMsg: Message = {
        id: aiMsgId,
        role: UserRole.MODEL,
        text: responseText,
        timestamp: new Date(),
      };
      
      const messagesWithAi = [...newMessages, newAiMsg];
      setMessages(messagesWithAi);
      updateCurrentSession(messagesWithAi);

    } catch (error) {
      console.error("Diagnosis error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        role: UserRole.MODEL,
        text: "I apologize, but I encountered an error analyzing your request. Please check your connection and try again.",
        timestamp: new Date(),
        isError: true
      };
      const messagesWithError = [...newMessages, errorMsg];
      setMessages(messagesWithError);
      updateCurrentSession(messagesWithError);
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Show Onboarding First
  if (showOnboarding) {
    return <Onboarding onStart={() => setShowOnboarding(false)} />;
  }

  // 2. Show Disclaimer Second
  if (!hasAgreedToDisclaimer) {
    return <DisclaimerModal onAgree={() => setHasAgreedToDisclaimer(true)} />;
  }

  // 3. Show Main App
  return (
    <div className="flex h-screen w-full bg-[#F5F5F7] overflow-hidden">
      
      <Sidebar 
        isOpen={isSidebarOpen}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={startNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 h-full min-w-0 relative">
        <Header 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen}
          onNewChat={startNewChat}
        />

        {/* Main Chat Area - Added padding-top for fixed header */}
        <main ref={scrollRef} className="flex-1 overflow-y-auto pt-20 pb-4 px-4 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-pulse pl-1">
                 <div className="bg-white rounded-[20px] rounded-tl-sm py-3 px-5 shadow-sm border border-slate-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#0071e3] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-[#0071e3] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-[#0071e3] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
        </main>

        <div className="w-full">
           <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
           <Footer />
        </div>
      </div>
    </div>
  );
}