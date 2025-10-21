import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WhatSlide() {
  const [animationPhase, setAnimationPhase] = useState('initial');

  const startAnimation = () => {
    setAnimationPhase('merging');
    setTimeout(() => setAnimationPhase('rotating'), 2000);
    setTimeout(() => setAnimationPhase('transforming'), 3500);
    setTimeout(() => setAnimationPhase('complete'), 5000);
  };

  useEffect(() => {
    const timer = setTimeout(startAnimation, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full bg-white p-8">
      <motion.h1 
        className="text-4xl font-bold text-[#003b6e] text-center mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        WHAT – Solution / Offering
      </motion.h1>
      
      <motion.h2 
        className="text-2xl text-gray-700 text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Compensation Logic Harmonization – Position in Value Chain
      </motion.h2>

      {/* Value Chain Diagram */}
      <motion.div 
        className="flex justify-center items-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {['Strategy', 'TOM', 'Compensation Logic Harmonization', 'Implementation'].map((step, index) => (
          <React.Fragment key={step}>
            <div className={`px-6 py-3 rounded-lg text-center font-semibold ${
              step === 'Compensation Logic Harmonization' 
                ? 'bg-[#86BC25] text-white text-lg' 
                : 'bg-gray-200 text-gray-700'
            }`}>
              {step}
            </div>
            {index < 3 && <div className="text-2xl text-gray-400">→</div>}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Interactive Animation */}
      <div className="flex flex-col items-center space-y-8">
        <div className="relative h-64 w-full max-w-2xl flex items-center justify-center">
          {animationPhase === 'initial' && (
            <>
              <motion.div 
                className="absolute left-32 w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                Insurer A
              </motion.div>
              <motion.div 
                className="absolute right-32 w-24 h-24 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                Insurer B
              </motion.div>
            </>
          )}

          {animationPhase === 'merging' && (
            <motion.div 
              className="w-32 h-24 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              Merged Entity
            </motion.div>
          )}

          {(animationPhase === 'rotating' || animationPhase === 'transforming') && (
            <motion.div 
              className="w-32 h-32 bg-purple-500 flex items-center justify-center text-white font-bold"
              initial={{ 
                borderRadius: animationPhase === 'rotating' ? '0.5rem' : '0.5rem',
                rotate: 0
              }}
              animate={{ 
                borderRadius: animationPhase === 'transforming' ? '50%' : '0.5rem',
                rotate: animationPhase === 'rotating' ? 360 : 0
              }}
              transition={{ duration: 1 }}
            >
              Rotating
            </motion.div>
          )}

          {animationPhase === 'complete' && (
            <motion.div 
              className="w-24 h-24 bg-[#86BC25] rounded-lg flex items-center justify-center text-white font-bold"
              initial={{ borderRadius: '50%', scale: 0 }}
              animate={{ borderRadius: '0.5rem', scale: 1 }}
            >
              New Model
            </motion.div>
          )}
        </div>

        {/* Animation Captions */}
        <div className="text-center">
          {animationPhase === 'initial' && (
            <p className="text-lg text-gray-600">Two separate insurance companies...</p>
          )}
          {animationPhase === 'merging' && (
            <motion.p 
              className="text-lg font-semibold text-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Post-Merger Integration
            </motion.p>
          )}
          {animationPhase === 'transforming' && (
            <motion.p 
              className="text-lg font-semibold text-[#86BC25]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Internal Compensation Transformation
            </motion.p>
          )}
          {animationPhase === 'complete' && (
            <motion.p 
              className="text-lg font-bold text-[#86BC25]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Harmonized Compensation Logic
            </motion.p>
          )}
        </div>

        <p className="text-gray-600 text-center max-w-2xl">
          This shows both use cases: <strong>PMI (Post-Merger Integration)</strong> and <strong>Internal Transformation</strong>
        </p>

        <motion.button
          className="bg-[#86BC25] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5a8019] transition-colors"
          onClick={startAnimation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Replay Animation
        </motion.button>
      </div>
    </div>
  );
}