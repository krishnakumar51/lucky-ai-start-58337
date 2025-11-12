import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { Message } from '@/types/chat';
import MessageBubble from './MessageBubble';
import FloatingInput from './FloatingInput';
import TypingIndicator from './TypingIndicator';
import { toast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  onSourcesUpdate?: (sources: any[]) => void;
  onChatStart?: () => void;
}

// N8N Backend Integration
const sendMessageToBackend = async (
  message: string,
  userId: string,
  userEmail: string,
  userName: string,
  threadId: string
): Promise<{ response: string; threadId: string }> => {
  try {
    const response = await fetch('http://localhost:5678/webhook/luckyai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        userId,
        userEmail,
        userName,
        threadId,
        sessionId: threadId
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error('Backend returned unsuccessful response');
    }

    return {
      response: data.response,
      threadId: data.threadId
    };
  } catch (error) {
    console.error('Backend Error:', error);
    throw error;
  }
};

const ChatInterface = ({ onSourcesUpdate, onChatStart }: ChatInterfaceProps) => {
  const { isAuthenticated, triggerAuth, user } = useAuth();
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [threadId, setThreadId] = useState<string>(() => `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const startNewChat = () => {
    setMessages([]);
    setThreadId(`thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    setRetryMessage(null);
    toast({
      title: "New Chat Started",
      description: "Started a fresh conversation"
    });
  };

  const handleSendPrompt = async (message: string, image?: File) => {
    if (!isAuthenticated || !user) {
      triggerAuth();
      return;
    }

    if (messages.length === 0) {
      onChatStart?.();
      sessionStorage.setItem('user-first-request', 'true');
    }

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: message,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);
    setRetryMessage(null);

    try {
      const { response: aiResponse, threadId: newThreadId } = await sendMessageToBackend(
        message,
        user.id,
        user.email,
        user.fullName,
        threadId
      );

      setThreadId(newThreadId);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: aiResponse,
          role: 'assistant',
          timestamp: new Date().toISOString(),
        }
      ]);

      setIsTyping(false);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsTyping(false);
      setRetryMessage(message);
      
      toast({
        title: "Failed to send message",
        description: "Unable to connect to the AI service. Please try again.",
        variant: "destructive",
        action: (
          <button 
            onClick={() => handleRetry()}
            className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        )
      });

      // Remove the user message that failed
      setMessages((prev) => prev.filter(msg => msg.id !== newMessage.id));
    }
  };

  const handleRetry = () => {
    if (retryMessage) {
      handleSendPrompt(retryMessage);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-start px-4 pt-32">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-scraper-text-primary mb-6 bg-gradient-to-r from-scraper-text-primary to-scraper-accent-primary bg-clip-text text-transparent">
              LuckyAI
            </h1>
          </div>

          <div className="w-full max-w-3xl mx-auto mt-8">
            <FloatingInput onSendMessage={handleSendPrompt} disabled={isTyping} centered={true} />
          </div>
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={startNewChat}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              + New Chat
            </button>
          </div>

          <ScrollArea className="flex-1 px-4 sm:px-6" ref={scrollAreaRef}>
            <div className="max-w-4xl mx-auto pt-8 pb-32">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div key={message.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <MessageBubble message={message} />
                  </div>
                ))}
                
                {isTyping && (
                  <div className="animate-fade-in">
                    <TypingIndicator />
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>
          </ScrollArea>

          <FloatingInput onSendMessage={handleSendPrompt} disabled={isTyping} />
        </>
      )}
    </div>
  );
};

export default ChatInterface;
