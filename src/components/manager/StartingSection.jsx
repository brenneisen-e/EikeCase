
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AITransformAnimation from './AITransformAnimation';

export default function StartingSection() {
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [showText, setShowText] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');

  const fullText = `Breaking Complexity

AI driven prototypes that unlock data & steering

Manager Case | Eike Brenneisen

BCM Transformation`;

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase('text'), 800);
    return () => clearTimeout(timer1);
  }, []);

  const handleFirstCycleComplete = () => {
    setShowText(true);
  };

  // Typewriter effect
  useEffect(() => {
    if (showText) {
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex <= fullText.length) {
          setTypewriterText(fullText.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30); // Schneller Schreibmaschinen-Effekt (30ms pro Zeichen)
      
      return () => clearInterval(typingInterval);
    }
  }, [showText]);

  return (
    <section id="start" className="h-screen w-full bg-white flex items-center justify-center relative overflow-hidden">
      {/* Deloitte Logo - Much Larger and Left */}
      <div className="absolute top-12 left-12 z-10">
        <h1 className="text-6xl font-bold text-black">Deloitte<span className="text-[#86BC25]">.</span></h1>
      </div>

      {/* PowerPoint Logo - Top Right */}
      {/* Ensure you have a 'powerpoint-logo.svg' or similar image in your public/images directory */}
 

      {/* Main Content Area */}
      <div className="flex items-center justify-center w-full h-full">
        {animationPhase === 'text' && (
          <motion.div
            className="flex items-center justify-between w-full h-full px-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Side - Text Content with Typewriter */}
            <div className="flex-1">
              {showText ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-pre-line"
                >
                  {typewriterText.split('\n').map((line, index) => {
                    if (index === 0) {
                      return (
                        <h1 key={index} className="text-8xl font-bold text-[#036A38] mb-8 leading-tight">
                          {line}
                          {index === 0 && typewriterText.split('\n')[0].length === line.length && typewriterText.length <= fullText.split('\n')[0].length && (
                            <span className="inline-block w-2 h-24 bg-[#036A38] ml-2 animate-pulse"></span>
                          )}
                        </h1>
                      );
                    } else if (index === 2) {
                      return (
                        <p key={index} className="text-3xl text-gray-700 mb-12 max-w-2xl">
                          {line}
                          {typewriterText.endsWith(line) && !typewriterText.includes(fullText.split('\n')[3]) && (
                            <span className="inline-block w-1 h-8 bg-gray-700 ml-1 animate-pulse"></span>
                          )}
                        </p>
                      );
                    } else if (index === 4) {
                      return (
                        <p key={index} className="text-2xl font-semibold text-gray-800 mt-20">
                          {line}
                          {typewriterText.endsWith(line) && !typewriterText.includes(fullText.split('\n')[5]) && (
                            <span className="inline-block w-1 h-6 bg-gray-800 ml-1 animate-pulse"></span>
                          )}
                        </p>
                      );
                    } else if (index === 6) {
                      return (
                        <p key={index} className="text-xl text-gray-600">
                          {line}
                          {typewriterText === fullText && (
                            <span className="inline-block w-1 h-5 bg-gray-600 ml-1 animate-pulse"></span>
                          )}
                        </p>
                      );
                    }
                    return null;
                  })}
                </motion.div>
              ) : (
                <div className="opacity-0">
                  <h1 className="text-8xl font-bold text-[#036A38] mb-8 leading-tight">
                    Breaking Complexity
                  </h1>
                  <p className="text-3xl text-gray-700 mb-12 max-w-2xl">
                    AI driven prototypes that unlock data & steering
                  </p>
                  <div className="mt-20">
                    <p className="text-2xl font-semibold text-gray-800">Manager Case | Eike Brenneisen</p>
                    <p className="text-xl text-gray-600">BCM Transformation</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - AI Transformation Animation */}
            <motion.div 
              className="flex-1 flex justify-center items-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <AITransformAnimation onFirstCycleComplete={handleFirstCycleComplete} />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 left-12 text-lg text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase === 'text' ? 1 : 0 }}
        transition={{ delay: 0.8 }}
      >
        Deloitte 2025 (v2.0.0)
      </motion.div>

      {/* Page indicator */}
      <motion.div 
        className="absolute bottom-8 right-12 text-lg text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase === 'text' ? 1 : 0 }}
        transition={{ delay: 0.8 }}
      >
        1
      </motion.div>
    </section>
  );
}
