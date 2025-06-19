// app/(routes)/dashboard/_components/EmptyState.tsx
"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence, stagger, useAnimate } from "framer-motion";
import { FiChevronRight, FiMessageSquare } from "react-icons/fi";

interface EmptyStateProps {
  selectedQuestion: (question: string) => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ selectedQuestion }) => {
  const suggestions = [
    "What are the most in-demand tech skills right now?",
    "How can I prepare for a software engineering interview?",
    "What's a typical career path for a data scientist?",
    "How do I write a compelling resume for a marketing role?",
    "Can you suggest resources for learning UI/UX design?",
    "What are some tips for salary negotiation?",
    "How important is networking for career growth?",
    "How can I transition into a new industry?",
  ];

  const [scope, animate] = useAnimate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateCards = async () => {
      if (containerRef.current) {
        await animate(
          ".suggestion-card",
          { opacity: 1, y: 0 },
          { delay: stagger(0.05), duration: 0.4 }
        );
      }
    };

    animateCards();
  }, [animate]);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-4xl mx-auto"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-gradient-to-br from-white to-[#f8faff] rounded-2xl border border-[#e0e7ff] shadow-xl overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#eef4ff] rounded-full opacity-70 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f0f7ff] rounded-full opacity-50 blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center text-center mb-6 sm:mb-8"
          >
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg mb-4"
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FiMessageSquare className="h-6 w-6 text-white" />
            </motion.div>
            
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
                Career Guidance Assistant
              </h3>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
              <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                Start a conversation to get personalized career guidance
              </p>
            </div>
          </motion.div>

          <div 
            ref={scope}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          >
            {suggestions.map((question, index) => (
              <motion.div
                key={index}
                className="suggestion-card opacity-0 translate-y-8"
                whileHover={{ 
                  y: -3,
                  boxShadow: "0 10px 15px -5px rgba(59, 130, 246, 0.1), 0 4px 6px -4px rgba(59, 130, 246, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-full flex items-start p-4 bg-white border border-[#e0e7ff] rounded-xl shadow-sm transition-all duration-200 ease-in-out group overflow-hidden hover:border-indigo-300"
                  onClick={() => selectedQuestion(question)}
                >
                  <div className="flex items-start w-full">
                    <div className="flex-1 pr-2">
                      <span className="text-left text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                        {question}
                      </span>
                    </div>
                    <div className="flex-shrink-0 mt-0.5 p-1 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors duration-200">
                      <FiChevronRight className="text-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 sm:mt-8 text-center"
          >
            <p className="text-xs text-gray-500 inline-flex items-center bg-white/80 px-3 py-1.5 rounded-full border border-[#e0e7ff] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
              Type your own career question to begin
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyState;