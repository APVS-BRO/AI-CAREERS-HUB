// app/(routes)/dashboard/CareerAI.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { PlusIcon, SendHorizontalIcon } from 'lucide-react';
import EmptyState from '@/app/(routes)/dashboard/_components/EmptyState';
import ReactMarkdown from 'react-markdown'
import { useParams,useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'
import logo from "@/public/logo.png";
import Image from 'next/image';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
};

export default function CareerAI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const {chatid} = useParams()
  const id = uuidv4()
  const router = useRouter()

  useEffect(() => {
    chatid && GetMessagelist()
  }, [chatid]);
  
  const onNewChat = async () => { 
    await axios.post('/api/prv-chat', {
      recordId: id,
      content: []
    });
    router.replace(`/ai-tools/ai-career-chat/${id}`);
  }

  const GetMessagelist = async() => {
    const result = await axios.get('/api/prv-chat?recordId='+chatid);
    setMessages(result?.data?.content);
  }

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    messages.length > 0 && updatemessageslist();
  }, [messages]);

  const updatemessageslist = async() => {
    await axios.put('/api/prv-chat', {
      content: messages,
      recordId: chatid
    });
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
      id: crypto.randomUUID(), 
      content: input, 
      role: 'user' 
    };
    
    const loadingId = crypto.randomUUID();
    const loadingMessage: Message = { 
      id: loadingId, 
      content: '...', 
      role: 'assistant' 
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setLoading(true);
    setInput('');

    try {
      const { data } = await axios.post<Message>('/api/ai-career-chat-agent', { 
        userInput: userMessage.content 
      });
      setMessages((prev) => prev.map((msg) => (msg.id === loadingId ? data : msg)));
    } catch (error) {
      console.error(error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? { 
                id: crypto.randomUUID(), 
                content: 'Something went wrong. Please try again.', 
                role: 'assistant' 
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 bg-white/95 border-b px-4 py-3 sm:py-4 flex items-center justify-between z-20 backdrop-blur-md shadow-sm">
        <div className="flex items-center">
          <Image 
            src={logo} 
            alt="logo" 
            width={24} 
            height={24} 
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <h2 className="ml-2 text-lg sm:text-xl font-semibold text-gray-800">
            AI Career Advisor
          </h2>
        </div>
        <Button 
          onClick={onNewChat} 
          disabled={loading} 
          size="sm" 
          className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:shadow-lg transition duration-300"
        >
          <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> 
          <span className="hidden sm:inline">New Chat</span>
        </Button>
      </header>

      {/* Messages Container */}
      <div 
        ref={listRef} 
        className="flex-1 overflow-y-auto px-4 sm:px-6 pt-20 pb-24 sm:pb-20 space-y-6"
      >
        {messages.length === 0 ? (
          <EmptyState selectedQuestion={setInput} />
        ) : (
          messages.map((msg,inx) => (
            <div 
              key={inx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%] 2xl:max-w-[65%]`}>
                <div className={`text-xs font-medium mb-1 px-3 ${msg.role === 'user' ? 'text-right text-gray-500' : 'text-left text-indigo-600'}`}>
                  {msg.role === 'user' ? 'You' : 'Career Advisor'}
                </div>
                <div className={`relative rounded-2xl px-4 py-3 sm:px-5 sm:py-3 whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  {msg.content === '...' ? (
                    <div className="flex space-x-2">
                      {[0,1,2].map(n => (
                        <div 
                          key={n} 
                          className="h-2.5 w-2.5 bg-blue-300 rounded-full animate-bounce" 
                        />
                      ))}
                    </div>
                  ) : (
                    <ReactMarkdown className="prose prose-sm max-w-none">
                      {msg.content}
                    </ReactMarkdown>
                  )}
                  <div className={`absolute w-4 h-4 rotate-45 ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 -right-2 top-3 sm:top-4' 
                      : 'bg-white border-l border-t border-gray-200 -left-2 top-3 sm:top-4'
                  }`} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Container */}
      <div className="fixed inset-x-0 bottom-0 bg-white/90 border-t z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto w-full px-4 py-3">
          <div className="flex items-end gap-3 w-full">
            <textarea
              rows={Math.min(4, Math.max(1, input.split('\n').length))}
              className="flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-base shadow-inner w-full"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <Button 
              onClick={handleSend} 
              disabled={loading || !input.trim()} 
              size="icon" 
              className="bg-blue-600 hover:bg-blue-700 text-white h-11 w-11 sm:h-12 sm:w-12 rounded-full shadow-md flex-shrink-0 mb-1 hover:scale-105 transition-transform"
            >
              <SendHorizontalIcon size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}