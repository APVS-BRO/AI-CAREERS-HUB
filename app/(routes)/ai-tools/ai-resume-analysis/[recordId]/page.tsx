"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Download, 
  UploadCloud, 
  ChevronDown,
  ChevronUp,
  Sparkles,
  ClipboardCheck,
  Star,
  Target,
  RefreshCw
} from 'lucide-react';

const AiResumeAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);

  // Mock data for demo
  const aiReport = {
    overall_score: 78,
    overall_feedback: "Your resume has a solid foundation but needs improvements in formatting and keyword optimization.",
    summary_comment: "The content shows relevant experience but lacks quantifiable achievements. Consider adding metrics to strengthen your impact.",
    sections: {
      experience: {
        score: 82,
        feedback: "Good job listing relevant positions, but add more metrics to quantify your achievements."
      },
      education: {
        score: 95,
        feedback: "Education section is clear and well-formatted with relevant details."
      },
      skills: {
        score: 65,
        feedback: "Skills section needs better organization and more industry-specific keywords."
      },
      summary: {
        score: 70,
        feedback: "Professional summary is generic. Tailor it to specific roles you're targeting."
      }
    },
    tips_for_improvement: [
      "Add quantifiable achievements to experience section",
      "Include more industry-specific keywords",
      "Optimize for ATS scanners",
      "Shorten professional summary to 3-4 lines",
      "Add a projects section to showcase relevant work"
    ],
    whats_good: [
      "Clear contact information",
      "Relevant work experience",
      "Good education credentials",
      "Appropriate length (1 page)"
    ],
    needs_improvement: [
      "Lack of measurable achievements",
      "Missing industry keywords",
      "Generic summary section",
      "No projects section"
    ]
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (key: string) => {
    setOpenSection(prev => prev === key ? null : key);
  };

  const getScoreColor = (score: number) => {
    if (score > 80) return 'bg-green-100 text-green-800';
    if (score > 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getScoreLabel = (score: number) => {
    if (score > 80) return 'Excellent';
    if (score > 70) return 'Good';
    if (score > 60) return 'Fair';
    return 'Needs Work';
  };

  const handlePdfLoad = () => {
    setPdfLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <h1 className="text-xl font-bold">Resume Analysis</h1>
          </div>
          <button 
            onClick={() => setUploadOpen(true)}
            className="bg-white/20 p-2 rounded-lg"
          >
            <UploadCloud size={20} />
          </button>
        </div>
        
        <div className="mt-3 flex overflow-x-auto pb-1 hide-scrollbar">
          <button
            className={`px-3 py-2 rounded-lg mr-2 text-sm font-medium ${activeTab === 'overview' ? 'bg-white text-indigo-600' : 'bg-white/10'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-3 py-2 rounded-lg mr-2 text-sm font-medium ${activeTab === 'details' ? 'bg-white text-indigo-600' : 'bg-white/10'}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'recommendations' ? 'bg-white text-indigo-600' : 'bg-white/10'}`}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Resume Actions */}
        {pdfUrl && (
          <div className="mb-4 flex justify-between items-center bg-white rounded-xl p-3 shadow-sm">
            <a 
              href={pdfUrl} 
              className="text-indigo-600 font-medium flex items-center"
            >
              <Download size={18} className="mr-2" />
              Download Resume
            </a>
            <button 
              className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm"
              onClick={() => setUploadOpen(true)}
            >
              Replace
            </button>
          </div>
        )}

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Overall Score */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Overall Score</h2>
                      <p className="text-gray-600 text-sm">Resume Quality Assessment</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(aiReport.overall_score)}`}>
                      {getScoreLabel(aiReport.overall_score)}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-3xl font-bold text-indigo-600">{aiReport.overall_score}%</div>
                      </div>
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#4f46e5"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 283 - (283 * aiReport.overall_score) / 100 }}
                          transition={{ duration: 1 }}
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-gray-700 text-center">{aiReport.overall_feedback}</p>
                </div>

                {/* Quick Insights */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Insights</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Top Strength</h3>
                        <p className="text-gray-600 text-sm">Education section is clear and well-formatted</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Key Improvement</h3>
                        <p className="text-gray-600 text-sm">Add quantifiable achievements to experience section</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    Executive Summary
                  </h2>
                  <p className="text-gray-700">{aiReport.summary_comment}</p>
                </div>
              </>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  Section Analysis
                </h2>
                
                {Object.entries(aiReport.sections).map(([key, sec]: any) => {
                  const isOpen = openSection === key;
                  return (
                    <div 
                      key={key} 
                      className="bg-white rounded-xl overflow-hidden shadow-sm"
                    >
                      <button 
                        onClick={() => toggleSection(key)} 
                        className="w-full flex justify-between items-center p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(sec.score)}`}>
                            {sec.score}%
                          </div>
                          <span className="font-medium text-gray-900 capitalize">
                            {key.replace('_', ' ')}
                          </span>
                        </div>
                        {isOpen ? 
                          <ChevronUp className="text-gray-500" /> : 
                          <ChevronDown className="text-gray-500" />
                        }
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4"
                          >
                            <p className="text-gray-700">{sec.feedback}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div className="space-y-5">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                    Actionable Recommendations
                  </h2>
                  
                  <ul className="space-y-3">
                    {aiReport.tips_for_improvement.map((tip: string, idx: number) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start gap-3 p-3 rounded-lg border border-gray-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Resume Strengths
                    </h3>
                    <ul className="space-y-2">
                      {aiReport.whats_good.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="bg-white rounded-full p-1">
                            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {aiReport.needs_improvement.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="bg-white rounded-full p-1">
                            <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Resume Preview */}
        <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5" />
              Resume Preview
            </h2>
          </div>
          
          <div className="p-4">
            {pdfUrl ? (
              <div className="relative border rounded-lg overflow-hidden h-96">
                {pdfLoading && (
                  <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10">
                    <div className="text-center">
                      <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-2" />
                      <p className="text-gray-600">Loading document...</p>
                    </div>
                  </div>
                )}
                <iframe 
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                  width="100%" 
                  height="100%" 
                  className="rounded-lg"
                  title="Resume Preview"
                  onLoad={handlePdfLoad}
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center text-center p-6">
                <div className="bg-indigo-100 p-3 rounded-full mb-4">
                  <UploadCloud className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Resume Uploaded
                </h3>
                <p className="text-gray-600 mb-4">
                  Upload a resume to get AI-powered analysis
                </p>
                <button 
                  onClick={() => setUploadOpen(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                >
                  <UploadCloud className="w-4 h-4 mr-2" /> 
                  Upload Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-5 border-b">
                <h3 className="text-xl font-bold text-gray-900">Upload Resume</h3>
              </div>
              
              <div className="p-5">
                <div className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center text-center mb-4">
                  <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-600">Drag & drop your file here</p>
                  <p className="text-gray-500 text-sm mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                </div>
                
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium">
                  Browse Files
                </button>
              </div>
              
              <div className="p-5 border-t flex justify-end gap-3">
                <button 
                  className="px-4 py-2 text-gray-600 font-medium"
                  onClick={() => setUploadOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium"
                  onClick={() => {
                    setPdfUrl("https://example.com/resume.pdf");
                    setUploadOpen(false);
                  }}
                >
                  Analyze
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="fixed bottom-4 right-4 z-20">
        <button className="bg-indigo-600 text-white p-4 rounded-full shadow-lg">
          <Sparkles size={24} />
        </button>
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AiResumeAnalysis;