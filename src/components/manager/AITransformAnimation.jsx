
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Zap, X, Send, Loader2 } from 'lucide-react'; // Removed FileText as it's no longer used

export default function AITransformAnimation({ onFirstCycleComplete }) {
  const [stage, setStage] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [hoveredBar, setHoveredBar] = useState(-1);
  const [promptText, setPromptText] = useState('');
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
  
  const fullPrompt = "Create interactive dashboard for Q4 performance";
  
  useEffect(() => {
    const timings = [
      2000,  // Stage 0: Initial slides
      800,   // Slide transitions
      800,
      800,
      1500,  // Stage 4: X appears
      4000,  // Stage 5: Prompt typing + send
      1500,  // Stage 6: Loading spinner
      2000,  // Stage 7: Transform to cockpit
    ];
    
    let currentTimeout;
    
    if (stage < 8) {
      currentTimeout = setTimeout(() => {
        if (stage === 0 || stage === 1 || stage === 2) {
          setSlideIndex(prev => prev + 1);
        }
        setStage(prev => prev + 1);
      }, timings[stage]);
    } else {
      // First cycle complete
      if (!hasCompletedOnce) {
        setHasCompletedOnce(true);
        if (onFirstCycleComplete) {
          onFirstCycleComplete();
        }
      }
      
      // Loop animation
      currentTimeout = setTimeout(() => {
        setStage(0);
        setSlideIndex(0);
        setPromptText('');
      }, 4000);
    }
    
    return () => clearTimeout(currentTimeout);
  }, [stage, hasCompletedOnce, onFirstCycleComplete]);

  // Typing effect for prompt
  useEffect(() => {
    if (stage === 5) {
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex <= fullPrompt.length) {
          setPromptText(fullPrompt.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
      
      return () => clearInterval(typingInterval);
    }
  }, [stage]);

  // Animated hover effect for bars
  useEffect(() => {
    if (stage >= 7) {
      let barIndex = 0;
      const interval = setInterval(() => {
        setHoveredBar(barIndex);
        barIndex = (barIndex + 1) % 6;
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Main circular animation container - x2 größer */}
      <div className="relative w-[1000px] h-[1000px]">
        {/* Circular border */}
        <div className="absolute inset-0 rounded-full border-8 border-gray-300"></div>
        <div 
          className="absolute inset-0 rounded-full border-8 border-transparent transition-all duration-1000"
          style={{
            borderTopColor: stage >= 4 ? '#86BC25' : 'transparent',
            borderRightColor: stage >= 4 ? '#86BC25' : 'transparent',
            transform: stage >= 4 ? 'rotate(360deg)' : 'rotate(0deg)',
          }}
        ></div>
        
        {/* PowerPoint Slides Stage */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-700"
          style={{
            opacity: stage < 4 ? 1 : 0,
            transform: stage < 4 ? 'scale(1)' : 'scale(0.8)',
          }}
        >
          <div className="relative w-[640px] h-[480px]">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="absolute inset-0 bg-white rounded-2xl shadow-2xl border-4 border-gray-300 transition-all duration-500"
                style={{
                  transform: `translateY(${index * -20}px) translateX(${index * -20}px) rotate(${index * -2}deg)`,
                  opacity: slideIndex >= index ? 1 : 0,
                  zIndex: 4 - index,
                }}
              >
                {/* Updated content for the PowerPoint slide */}
                <div className="p-10 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-8">
                    <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/cdae93e1d_Microsoft_PowerPoint-Logowine.png"
                      alt="PowerPoint"
                      className="w-auto h-12"
                    />
                    <div className="h-3 flex-1 bg-gray-300 rounded"></div>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* X Mark Stage */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-500"
          style={{
            opacity: stage === 4 ? 1 : 0,
            transform: stage === 4 ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-180deg)',
          }}
        >
          <div className="relative">
            <X 
              className="w-80 h-80 text-red-500 animate-pulse" 
              strokeWidth={4}
            />
            <div className="absolute inset-0 bg-red-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>

        {/* AI Prompt Input Stage */}
        <div 
          className="absolute inset-0 flex items-center justify-center p-20 transition-all duration-700"
          style={{
            opacity: stage === 5 ? 1 : 0,
            transform: stage === 5 ? 'scale(1)' : 'scale(0.8)',
          }}
        >
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-gray-200 p-16">
              <div className="flex items-center gap-6 mb-10">
                <Zap className="w-12 h-12" style={{ color: '#86BC25' }} />
                <span className="font-semibold text-gray-900 text-3xl">AI Prototype Generator</span>
              </div>
              
              <div className="bg-gray-50 rounded-2xl border-4 border-gray-200 p-10 min-h-[200px] flex items-center">
                <p className="text-gray-900 text-2xl">
                  {promptText}
                  <span className="inline-block w-1 h-8 bg-gray-900 ml-2 animate-pulse"></span>
                </p>
              </div>
              
              <div className="mt-10 flex justify-end">
                <button 
                  className="rounded-2xl px-10 py-6 flex items-center gap-4 text-white transition-all duration-300"
                  style={{ 
                    backgroundColor: '#86BC25',
                    opacity: promptText.length === fullPrompt.length ? 1 : 0.5,
                    transform: promptText.length === fullPrompt.length ? 'scale(1)' : 'scale(0.95)',
                  }}
                >
                  <Send className="w-8 h-8" />
                  <span className="text-2xl font-medium">Generate</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Spinner Stage */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-500"
          style={{
            opacity: stage === 6 ? 1 : 0,
            transform: stage === 6 ? 'scale(1)' : 'scale(0.8)',
          }}
        >
          <div className="text-center">
            <Loader2 
              className="w-48 h-48 animate-spin mx-auto" 
              style={{ color: '#86BC25' }}
              strokeWidth={2}
            />
            <p className="mt-10 text-2xl text-gray-600 font-medium">
              AI is generating your dashboard...
            </p>
            <div className="mt-8 flex gap-3 justify-center">
              <div className="w-5 h-5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-5 h-5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-5 h-5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>

        {/* AI Cockpit Stage */}
        <div 
          className="absolute inset-0 flex items-center justify-center p-12 transition-all duration-1000"
          style={{
            opacity: stage >= 7 ? 1 : 0,
            transform: stage >= 7 ? 'scale(1)' : 'scale(0.5)',
          }}
        >
          <div className="w-full h-full bg-white rounded-[3rem] p-16 shadow-2xl border-4 border-gray-200">
            {/* Header with AI indicator */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xl text-gray-600 font-mono">AI LIVE</span>
              </div>
              <Zap className="w-12 h-12 text-yellow-500 animate-pulse" />
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                <div className="text-xl text-gray-500 mb-2">Revenue</div>
                <div className="text-5xl font-bold text-gray-900">€2.4M</div>
                <div className="flex items-center gap-2 mt-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <span className="text-xl text-green-600">+12%</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                <div className="text-xl text-gray-500 mb-2">Efficiency</div>
                <div className="text-5xl font-bold text-gray-900">94%</div>
                <div className="flex items-center gap-2 mt-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <span className="text-xl text-green-600">+8%</span>
                </div>
              </div>
            </div>

            {/* Chart visualization with animated hover */}
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 relative">
              <BarChart3 className="w-10 h-10 text-gray-500 mb-6" />
              <div className="flex items-end justify-between h-48 gap-3">
                {[40, 65, 45, 80, 70, 90].map((height, i) => (
                  <div 
                    key={i}
                    className="flex-1 rounded-t-lg transition-all duration-300 relative group"
                    style={{
                      height: `${height}%`,
                      backgroundColor: hoveredBar === i ? '#86BC25' : '#3B82F6',
                      transform: hoveredBar === i ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: hoveredBar === i ? '0 8px 24px rgba(134, 188, 37, 0.4)' : 'none',
                    }}
                  >
                    {/* Tooltip on hover */}
                    {hoveredBar === i && (
                      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-lg py-3 px-5 rounded-lg whitespace-nowrap">
                        {height}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Animated cursor */}
              {stage >= 7 && hoveredBar >= 0 && (
                <div 
                  className="absolute transition-all duration-300"
                  style={{
                    left: `${(hoveredBar * 16.66) + 8}%`,
                    bottom: '60px',
                    transform: 'translate(-50%, 0)',
                  }}
                >
                  <div className="w-10 h-10 border-4 border-gray-800 bg-white rounded-full shadow-xl"></div>
                </div>
              )}
            </div>

            {/* Deloitte green accent */}
            <div className="mt-10 flex justify-center">
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#86BC25' }}></div>
            </div>
          </div>
        </div>

        {/* Deloitte green dot (always visible) */}
        <div 
          className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full shadow-xl transition-all duration-500"
          style={{ 
            backgroundColor: '#86BC25',
            transform: stage >= 4 ? 'scale(1.2)' : 'scale(1)',
          }}
        ></div>
      </div>
    </div>
  );
}
