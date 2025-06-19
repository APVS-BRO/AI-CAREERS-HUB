'use client';

import React from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
            <div className="space-y-2 text-center w-full">
              <Skeleton className="w-3/4 h-7 mx-auto" />
              <Skeleton className="w-4/5 h-5 mx-auto" />
            </div>
            <div className="w-full space-y-3">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <div className="bg-indigo-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Authentication Required</h2>
          <p className="text-gray-600 mb-6 sm:mb-8">Please sign in to access your profile</p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition duration-300">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 text-center">
            <div className="inline-block relative">
              {user.imageUrl && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full ring-4 ring-white/50 overflow-hidden mx-auto">
                  <Image
                    src={user.imageUrl}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="absolute bottom-0 right-0 sm:right-1 md:right-2 bg-white rounded-full p-1 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <h1 className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-indigo-200 mt-1 sm:mt-2 text-sm sm:text-base">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>

          {/* Profile Details */}
          <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6">
              <div className="flex items-start">
                <div className="bg-indigo-50 rounded-lg p-2 sm:p-3 mr-3 sm:mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Member Since</h3>
                  <p className="mt-1 text-base sm:text-lg font-medium text-gray-900">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    }) : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-50 rounded-lg p-2 sm:p-3 mr-3 sm:mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Account Status</h3>
                  <p className="mt-1 text-base sm:text-lg font-medium text-gray-900">Active</p>
                </div>
              </div>

              {typeof user.publicMetadata.role === 'string' && (
                <div className="flex items-start">
                  <div className="bg-indigo-50 rounded-lg p-2 sm:p-3 mr-3 sm:mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Role</h3>
                    <p className="mt-1 text-base sm:text-lg font-medium text-gray-900 capitalize">
                      {user.publicMetadata.role as string}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <div className="bg-indigo-50 rounded-lg p-2 sm:p-3 mr-3 sm:mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Contact</h3>
                  <p className="mt-1 text-base sm:text-lg font-medium text-gray-900 break-all">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
              <SignOutButton>
                <button className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 w-full max-w-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}