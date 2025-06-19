"use client";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import logo from "@/public/logo.png";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl ">
                <Image 
                  src={logo} 
                  alt="AI Career Hub" 
                  className="w-4 h-5 sm:w-10 sm:h-10 "
                  priority
                />
              </div>
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Career Hub
              </h2>
            </div>
            
            <div className="flex items-center">
              {!user ? (
                <SignInButton mode="modal" signUpForceRedirectUrl={'/dashboard'}>
                  <button className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-1.5 px-3 sm:py-2 sm:px-4 rounded-md sm:rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    Get Started
                  </button>
                </SignInButton>
              ) : (
                <div className="flex items-center gap-3 sm:gap-4">
                  <UserButton appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 sm:w-10 sm:h-10 border-2 border-blue-200",
                    }
                  }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block text-gray-900">Build Your Future</span>
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                With AI-Powered Tools
              </span>
            </h1>
            
            <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-600">
              Revolutionize your career journey with intelligent tools that help you create, optimize, and land your dream job.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a 
                href={user ? "/dashboard" : "#"}
                className={`inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 ${
                  user 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl"
                    : "bg-gray-800 text-white opacity-90 cursor-not-allowed"
                }`}
              >
                Go to Dashboard
                <svg className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
              
              <a 
                href="#features" 
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 shadow-sm transition-all duration-300"
              >
                Explore Features
                <svg className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-[300px] sm:h-[400px] md:h-[500px] [mask-image:linear-gradient(to_bottom,white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50"></div>
            <div className="absolute top-0 left-1/4 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            <div className="absolute top-0 right-1/4 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Powerful Features for Your Career Success
            </h2>
            <p className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-gray-600">
              Everything you need to build a standout career profile and land interviews
            </p>
          </div>
          
          <div className="grid gap-5 sm:gap-6 md:gap-7 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-blue-50 rounded-lg sm:rounded-xl mb-3 sm:mb-4">
                <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">AI Resume Builder</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                Create professional resumes optimized for ATS with our intelligent builder.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 font-medium text-sm sm:text-base group">
                Learn more
                <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-indigo-50 rounded-lg sm:rounded-xl mb-3 sm:mb-4">
                <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Interview Simulator</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                Practice with AI-powered mock interviews and get instant feedback.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 font-medium text-sm sm:text-base group">
                Learn more
                <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-purple-50 rounded-lg sm:rounded-xl mb-3 sm:mb-4">
                <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Career Path Finder</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                Discover personalized career paths based on your skills and interests.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 font-medium text-sm sm:text-base group">
                Learn more
                <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            
            {/* Feature Card 4 */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-pink-50 rounded-lg sm:rounded-xl mb-3 sm:mb-4">
                <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Job Matching</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                Intelligent job recommendations tailored to your profile and preferences.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 font-medium text-sm sm:text-base group">
                Learn more
                <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10">
            Join thousands of professionals who have accelerated their career growth with our AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            {!user ? (
              <SignInButton mode="modal" signUpForceRedirectUrl={'/dashboard'}>
                <button className="flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 sm:py-3.5 px-5 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Start Free Trial
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </SignInButton>
            ) : (
              <a 
                href="/dashboard"
                className="flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 sm:py-3.5 px-5 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Go to Dashboard
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            )}
            <a 
              href="#features" 
              className="flex items-center justify-center gap-1 sm:gap-2 bg-white text-gray-900 border border-gray-300 font-semibold py-2.5 sm:py-3.5 px-5 sm:px-8 rounded-lg sm:rounded-xl shadow-sm hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base"
            >
              View Features
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            © {new Date().getFullYear()} AI Career Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}