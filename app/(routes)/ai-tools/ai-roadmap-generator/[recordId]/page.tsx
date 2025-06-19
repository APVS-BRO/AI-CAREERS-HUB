"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import RoadmapTemplate from '../_components/RoadmapTemeplate'
import RoadMapComp from '@/app/(routes)/dashboard/_components/RoadMapComp'

type Node = {
  id: string
  data: any
  position: { x: number; y: number }
}

type Edge = {
  id: string
  source: string
  target: string
  type?: string
}

type RoadmapData = {
  roadmapTitle: string
  description: string
  duration: string
  initialNodes: Node[]
  initialEdges: Edge[]
}

export default function RoadMapGenerator() {
  const { recordId } = useParams<{ recordId: string }>()
  const [data, setData] = useState<RoadmapData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
      const handleResize = () => setIsMobile(window.innerWidth < 768)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!recordId) return

    let mounted = true
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await axios.get(`/api/prv-chat?recordId=${recordId}`)
        if (mounted) {
          setData(res.data.content)
        }
      } catch (err: any) {
        console.error(err)
        if (mounted) {
          setError('Unable to load roadmap. Please try again.')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [recordId])

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {/* Info Card - Full width on mobile, 1/4 on lg+ */}
        <div className="lg:col-span-1 border rounded-xl p-3 sm:p-4 md:p-5 shadow-sm bg-white flex flex-col">
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="animate-spin h-7 sm:h-8 w-7 sm:w-8 text-blue-600 mb-2 sm:mb-3" />
                <p className="text-gray-600 text-sm sm:text-base">Loading roadmap...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-3 sm:p-4">
                <div className="bg-red-100 rounded-full p-2 sm:p-3 mb-2 sm:mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 sm:h-6 w-5 sm:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-red-600 font-medium text-sm sm:text-base">{error}</p>
              </div>
            ) : data ? (
              <>
                <div className="flex items-start mb-3 sm:mb-4">
                  <div className="bg-blue-100 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-900 line-clamp-2">
                    {data.roadmapTitle}
                  </h2>
                </div>
                
                <div className="pl-8 sm:pl-9 md:pl-10">
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-5 md:mb-6 line-clamp-3 sm:line-clamp-4">
                    {data.description}
                  </p>
                  
                  <div className="flex items-center bg-blue-50 rounded-lg p-2 sm:p-3 mb-4 sm:mb-5 md:mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 mr-1.5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-blue-700 text-sm sm:text-base">Duration: {data.duration}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-3 sm:p-4">
                <div className="bg-gray-100 rounded-full p-2 sm:p-3 mb-2 sm:mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 sm:h-6 w-5 sm:w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm sm:text-base">No roadmap selected</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Generate a roadmap to get started</p>
              </div>
            )}
          </div>

          <Button
            className="w-full mt-3 sm:mt-4 md:mt-5 py-3 sm:py-4 text-sm sm:text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
            onClick={() => setOpenDialog(true)}
          >
            Create New Roadmap
          </Button>
        </div>

        {/* Visualization Area - Full width on mobile, 3/4 on lg+ */}
        <div className={`lg:col-span-3 w-full ${
          isMobile ? 'h-[50vh]' : 'h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh]'
        } border rounded-xl bg-gray-50 shadow-sm overflow-hidden`}>
          {!loading && data ? (
            <RoadmapTemplate
              initialNodes={data.initialNodes}
              initialEdges={data.initialEdges}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-4">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 sm:h-12 w-10 sm:w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-800 mb-1 sm:mb-2 text-center">
                {loading ? 'Preparing your roadmap' : 'Visualize Your Career Path'}
              </h3>
              <p className="text-gray-500 text-center max-w-xs sm:max-w-md text-xs sm:text-sm">
                {loading 
                  ? 'Generating your personalized career journey...' 
                  : 'Your roadmap visualization will appear here once generated'}
              </p>
            </div>
          )}
        </div>
      </div>

      <RoadMapComp openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  )
}