import React from 'react'

function WelcomeHeader() {
  return (
    <div className='flex flex-col items-center justify-center h-64 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg border-2 border-sky-400'>
        <div className='text-3xl font-bold mb-4'>
            Welcome to AI Career Hub

        </div>
        <div>
            <p className='text-lg'>
                Your one-stop platform for AI career resources and tools.
            </p>
        </div>
        <div className='mt-4'>
            <button className='px-6 py-2 bg-white text-blue-500 rounded-lg shadow hover:bg-gray-100 transition duration-300 border-2 border-bg-blue-500 hover:border-blue-600'>
                Get Started
            </button>
            </div>
    </div>
  )
}

export default WelcomeHeader