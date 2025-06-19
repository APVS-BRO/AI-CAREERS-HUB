import { Handle, Position } from '@xyflow/react'
import React from 'react'

function TurboNode({ data }: any) {
  if (!data || !data.title) {
    return (
      <div className="w-48 sm:w-56 md:w-64 rounded-lg border border-red-400 bg-red-100 p-3 sm:p-4 text-xs sm:text-sm text-red-700 shadow-md">
        ⚠️ Invalid Node Data
      </div>
    )
  }

  // Determine node style based on type
  const getNodeStyle = () => {
    switch (data.type) {
      case 'input':
        return {
          border: 'border-2 border-yellow-400',
          bg: 'bg-yellow-50',
          title: 'text-yellow-800',
          desc: 'text-yellow-700'
        }
      case 'output':
        return {
          border: 'border-2 border-purple-400',
          bg: 'bg-purple-50',
          title: 'text-purple-800',
          desc: 'text-purple-700'
        }
      default:
        return {
          border: 'border-2 border-green-400',
          bg: 'bg-green-50',
          title: 'text-green-800',
          desc: 'text-green-700'
        }
    }
  }

  const styles = getNodeStyle()

  return (
    <div className={`group w-48 sm:w-56 md:w-64 lg:w-72 rounded-xl ${styles.border} ${styles.bg} shadow-md p-3 sm:p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-gray-400 !h-2 !w-2"
      />
      
      <div className="mb-1 sm:mb-2">
        <div className="flex items-start">
          {data.icon && (
            <div className="mr-2 mt-0.5 text-lg">{data.icon}</div>
          )}
          <h3 className={`text-base sm:text-lg font-bold ${styles.title} leading-tight`}>
            {data.title}
          </h3>
        </div>
      </div>
      
      <p className={`text-xs sm:text-sm ${styles.desc} mb-2 sm:mb-3 line-clamp-2 md:line-clamp-3 lg:line-clamp-4`}>
        {data.description}
      </p>
      
      {data.link && (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 group-hover:underline"
        >
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      )}
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-gray-400 !h-2 !w-2"
      />
      
      {/* Status indicator for completion */}
      {data.completed && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  )
}

export default TurboNode