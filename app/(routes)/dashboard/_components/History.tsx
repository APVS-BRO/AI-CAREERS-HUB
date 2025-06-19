"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { tools } from './AiTools';
import Image from 'next/image';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import logo from '@/public/logo.png';
import { Skeleton } from "@/components/ui/skeleton";
import { FiClock, FiChevronRight, FiFolder, FiAlertCircle } from 'react-icons/fi';

interface HistoryRecord {
  aiAgentType: string;
  createdAt: string;
  recordId: string;
  [key: string]: any;
}

function History() {
  const [userHistory, setUserHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const result = await axios.get('/api/prv-chat');
        setUserHistory(result.data);
      } catch (err: any) {
        console.error('Failed to fetch history:', err);
        setError('Failed to load history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const normalizePath = (p: string) => p.replace(/^\/|\/$/g, '').toLowerCase();

  const getAgentName = (path: string) => {
    const agent = tools.find(item =>
      normalizePath(item.path) === normalizePath(path)
    );
    return agent || tools[0];
  };

  const toggleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="flex justify-center mb-4">
            <FiAlertCircle className="text-red-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">Error Loading History</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4 p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recent Activity</h2>
          <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 sm:p-5 border border-gray-200 rounded-xl shadow-sm bg-white flex items-start gap-4 transition-all hover:shadow-md">
            <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-5 w-3/4 sm:w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (userHistory.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-5">
            <FiFolder className="text-blue-500 text-4xl" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-3">No History Found</h3>
          <p className="text-blue-700 mb-6 max-w-md mx-auto">
            You haven't used any AI tools yet. Get started by exploring our AI-powered career tools.
          </p>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition"
          >
            Explore AI Tools
            <FiChevronRight className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recent Activity</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiClock className="text-gray-400" />
          <span>Sorted by most recent</span>
        </div>
      </div>

      <div className="space-y-4">
        {userHistory.map((history, index) => {
          const agent = getAgentName(history?.aiAgentType);
          const linkHref = `${history?.aiAgentType}/${history?.recordId}`;
          const isExpanded = expandedItem === index;
          
          return (
            <div 
              key={index} 
              className={`border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden transition-all duration-300 ${
                isExpanded ? 'shadow-md' : 'hover:shadow-md'
              }`}
            >
              <Link href={linkHref} className="block">
                <div className="p-4 sm:p-5 flex items-start gap-4 cursor-pointer">
                  <div className="flex-shrink-0">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <Image
                        src={agent?.icon || logo}
                        alt={agent?.name || 'Agent Icon'}
                        width={40}
                        height={40}
                        className="rounded-sm object-contain w-8 h-8 sm:w-10 sm:h-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                      {agent?.name || 'Unknown Agent'}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <span>{format(new Date(history.createdAt), 'MMM d, yyyy')}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">
                        {format(new Date(history.createdAt), 'h:mm a')}
                      </span>
                      <span className="inline sm:hidden">
                        {format(new Date(history.createdAt), 'h:mm a')}
                      </span>
                    </p>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(index);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    <FiChevronRight className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </Link>
              
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-100">
                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Session Details</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Started: {format(new Date(history.createdAt), 'MMM d, yyyy h:mm a')}</p>
                        <p>Duration: {formatDistanceToNow(new Date(history.createdAt), { addSuffix: true })}</p>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Link 
                        href={linkHref}
                        className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition w-full sm:w-auto"
                      >
                        Open Session
                        <FiChevronRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;