import React, { useState, useEffect } from 'react'
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import TurboNode from './TurboNode'

interface RoadmapTemplateProps {
  initialNodes: any[]
  initialEdges: any[]
}

const nodeTypes = {
  turbo: TurboNode,
  input: TurboNode,
  output: TurboNode,
  default: TurboNode,
}

export default function RoadmapTemplate({
  initialNodes,
  initialEdges
}: RoadmapTemplateProps) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setDimensions({ width, height })
      setIsMobile(width < 768)
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Mobile-friendly color palette
  const mobileColors = {
    background: 'from-blue-50 to-indigo-50',
    nodeInput: '#FF9E64', // Coral
    nodeOutput: '#7E6BC9', // Purple
    nodeDefault: '#4AB8B8', // Teal
    border: 'border-gray-300',
    minimapBg: 'bg-white/90',
    legendBg: 'bg-white/95',
    handleColor: '#94a3b8'
  }

  const desktopColors = {
    background: 'from-indigo-50 to-blue-50',
    nodeInput: '#FFBF00', // Amber
    nodeOutput: '#8B5CF6', // Violet
    nodeDefault: '#10B981', // Emerald
    border: 'border-gray-300',
    minimapBg: 'bg-white/80',
    legendBg: 'bg-white/90',
    handleColor: '#94a3b8'
  }

  const colors = isMobile ? mobileColors : desktopColors

  return (
    <div className={`w-full h-full bg-gradient-to-br ${colors.background} p-1 sm:p-2 md:p-3 lg:p-4`}>
      <div className={`h-full w-full rounded-xl border ${colors.border} shadow-lg overflow-hidden`}>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          minZoom={isMobile ? 0.2 : 0.3}
          maxZoom={isMobile ? 1.5 : 2}
          attributionPosition="bottom-left"
        >
          <Controls 
            showInteractive={false}
            position={isMobile ? "top-right" : "bottom-right"}
            className={`!bg-white !shadow-md !rounded-lg !border ${colors.border}`}
            style={{
              transform: isMobile ? 'scale(1.3)' : 'scale(1)',
              transformOrigin: 'top right'
            }}
          />
          
          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case 'input':
                  return colors.nodeInput
                case 'output':
                  return colors.nodeOutput
                default:
                  return colors.nodeDefault
              }
            }}
            nodeStrokeWidth={3}
            className={`${colors.minimapBg} backdrop-blur-sm !border ${colors.border} !shadow-sm`}
            position={isMobile ? "top-left" : "bottom-left"}
            style={{
              width: isMobile ? 100 : 150,
              height: isMobile ? 100 : 150
            }}
            pannable
            zoomable
          />
          
          <Background 
            variant={"dots" as any }
            gap={isMobile ? 20 : 14} 
            size={isMobile ? 1.2 : 0.9} 
            color="#cbd5e1"
          />
        </ReactFlow>
      </div>
      
      {/* Floating info panel - repositioned for mobile */}
      <div 
        className={`absolute ${isMobile ? 'bottom-4 left-4' : 'top-4 right-4'} ${colors.legendBg} backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4 border ${colors.border} max-w-[160px] sm:max-w-[180px]`}
      >
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.nodeInput }}></div>
          <span className="text-xs sm:text-sm text-gray-700">Starting Point</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.nodeDefault }}></div>
          <span className="text-xs sm:text-sm text-gray-700">Milestones</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.nodeOutput }}></div>
          <span className="text-xs sm:text-sm text-gray-700">Goal</span>
        </div>
      </div>
    </div>
  )
}