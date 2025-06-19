"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Image from 'next/image'
import { motion, AnimatePresence, easeOut } from 'framer-motion'
import chatbot from '@/public/chatbot.png'
import resumeanalysis from '@/public/resume_analysis.png'
import career_roadmap from '@/public/career_roadmap.png'
import coverletter from '@/public/cover_letter.png'
import ResumeUploadComp from '@/app/(routes)/dashboard/_components/ResumeUploadcomp'
import RoadMapComp from '@/app/(routes)/dashboard/_components/RoadMapComp'
import { FiChevronRight, FiZap, FiTool, FiBookOpen, } from 'react-icons/fi'
import { Quote } from 'lucide-react'

export const tools = [
  { 
    name: 'AI Career Advisor', 
    desc: 'Get expert career guidance with our intelligent AI assistant', 
    icon: chatbot, 
    button: 'Start Chat', 
    path: 'ai-tools/ai-career-chat',
    color: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  { 
    name: 'Resume Analysis', 
    desc: 'Analyze your resume with AI-driven insights to optimize for ATS and recruiters', 
    icon: resumeanalysis, 
    button: 'Analyze Resume', 
    path: 'ai-tools/ai-resume-analysis',
    color: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600'
  },
  { 
    name: 'Career Roadmap Generator', 
    desc: 'Generate a personalized career development plan tailored to your goals', 
    icon: career_roadmap, 
    button: 'Create Roadmap', 
    path: 'ai-tools/ai-roadmap-generator',
    color: 'from-purple-500 to-violet-600',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  { 
    name: 'Cover Letter Pro', 
    desc: 'Craft compelling cover letters that stand out to employers', 
    icon: coverletter, 
    button: 'Generate Letter', 
    path: 'ai-cover-letter',
    color: 'from-rose-500 to-pink-600',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600'
  },
]
type Tool = typeof tools[0]

export default function AiTools() {
  const router = useRouter()
  const [openResumeUpload, setOpenResumeUpload] = useState(false)
  const [openRoadmapUpload, setOpenRoadmapUpload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const quoteTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const aiQuotes = [
    "AI doesn't replace humans, it amplifies human potential.",
    "The most powerful tool is one that adapts to your unique career journey.",
    "Data-driven insights create opportunities where intuition falls short.",
    "Career success in the digital age requires algorithmic intelligence.",
    "Personalized guidance at scale is the future of professional development."
  ]

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  useEffect(() => {
    quoteTimeoutRef.current = setTimeout(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % aiQuotes.length)
    }, 5000)

    return () => {
      if (quoteTimeoutRef.current) {
        clearTimeout(quoteTimeoutRef.current)
      }
    }
  }, [currentQuoteIndex, aiQuotes.length])

  const handleToolLaunch = (tool: Tool) => {
    setIsLoading(true)
    setActiveTool(tool.name)
    
    if (tool.path === 'ai-tools/ai-resume-analysis') {
      setOpenResumeUpload(true)
      setIsLoading(false)
      return
    }
    
    if (tool.path === 'ai-tools/ai-roadmap-generator') {
      setOpenRoadmapUpload(true)
      setIsLoading(false)
      return
    }
    
    const id = uuidv4()
    axios.post('/api/prv-chat', { recordId: id, content: [], aiAgentType: tool.path })
      .then(() => {
        router.push(`/${tool.path}/${id}`)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }

  const handleRoadmapSubmit = async (userInput: string[]) => {
    setIsLoading(true)
    const recordId = uuidv4()
    try {
      await axios.post('/api/ai-roadmap-generator-agent', {
        recordId: recordId,
        userInput,
      })
      setOpenRoadmapUpload(false)
      router.push(`/ai-tools/ai-roadmap-generator/${recordId}`)
    } catch (err) {
      console.error('Roadmap submit failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResumeSubmit = async (formData: FormData) => {
    setIsLoading(true)
    const recordId = uuidv4()
      formData.append('recordId', recordId); // Add recordId to formData

    try {
      await axios.post('/api/prv-resume', formData)
      setOpenResumeUpload(false)
      router.push(`/ai-tools/ai-resume-analysis/${recordId}`)
    } catch (err) {
      console.error('Resume submit failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: easeOut
      }
    }),
    hover: { 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Loading overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white"
              >
                Launching {activeTool}...
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 mt-2"
              >
                Preparing your AI-powered experience
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FiZap className="text-indigo-600 text-xl sm:text-2xl" />
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-indigo-600">AI Career Suite</h1>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 max-w-4xl"
          >
            Transform Your Career with <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI-Powered Tools</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl"
          >
            Advanced AI tools designed to accelerate your career growth, optimize your job search, and unlock new opportunities.
          </motion.p>
        </div>

        {/* Stats section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-12 md:mb-16"
        >
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600">95%</div>
            <div className="text-gray-600 text-sm sm:text-base">Success Rate</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600">10K+</div>
            <div className="text-gray-600 text-sm sm:text-base">Users Empowered</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600">24/7</div>
            <div className="text-gray-600 text-sm sm:text-base">AI Assistance</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600">4.9★</div>
            <div className="text-gray-600 text-sm sm:text-base">User Rating</div>
          </div>
        </motion.div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${tool.color} p-6`}>
                <div className="flex justify-between items-start">
                  <div className={`${tool.iconBg} p-3 rounded-xl`}>
                    <Image 
                      src={tool.icon} 
                      alt={tool.name} 
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="bg-black/10 p-1.5 rounded-lg">
                    <FiTool className="text-white text-lg" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-6">{tool.desc}</p>
                
                <button
                  onClick={() => handleToolLaunch(tool)}
                  className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg`}
                >
                  {tool.button}
                  <FiChevronRight className="ml-2" />
                </button>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center">
                <FiBookOpen className={`${tool.iconColor} mr-2`} />
                <span className="text-sm text-gray-500">AI-powered insights</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value proposition with quotes */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Quote className="text-white text-3xl rotate-180 mr-2" />
                <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                  Insights on AI & Career Development
                </h3>
                <Quote className="text-white text-3xl ml-2" />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <blockquote className="text-xl md:text-2xl italic text-indigo-100 px-4 py-6">
                    "{aiQuotes[currentQuoteIndex]}"
                  </blockquote>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center mt-4 space-x-2">
                {aiQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuoteIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      currentQuoteIndex === index 
                        ? 'bg-white scale-125' 
                        : 'bg-indigo-300/50'
                    }`}
                    aria-label={`View quote ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <ResumeUploadComp
        openResumeUpload={openResumeUpload}
        setOpenResumeDialog={setOpenResumeUpload}
        onSubmit={handleResumeSubmit}
      />

      <RoadMapComp
        openDialog={openRoadmapUpload}
        setOpenDialog={setOpenRoadmapUpload}
        onSubmit={handleRoadmapSubmit}
      />
    </div>
  )
}