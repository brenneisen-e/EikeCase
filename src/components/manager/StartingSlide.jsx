import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, Target } from 'lucide-react';

export default function StartingSlide({ onNext }) {
  const [animationPhase, setAnimationPhase] = useState('square');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase('circle');
    }, 1000);

    const timer2 = setTimeout(() => {
      setAnimationPhase('icons');
    }, 2000);

    const timer3 = setTimeout(() => {
      setAnimationPhase('text');
    }, 4000);

    const timer4 = setTimeout(() => {
      onNext();
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onNext]);

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#003b6e] to-[#0070c0] flex items-center justify-center relative overflow-hidden">
      {animationPhase === 'square' && (
        <motion.div
          className="w-32 h-32 bg-[#86BC25]"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}

      {animationPhase === 'circle' && (
        <motion.div
          className="w-32 h-32 bg-[#86BC25]"
          initial={{ borderRadius: 0 }}
          animate={{ borderRadius: "50%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}

      {animationPhase === 'icons' && (
        <motion.div
          className="flex gap-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, staggerChildren: 0.2 }}
        >
          {[TrendingUp, DollarSign, BarChart3, Target].map((Icon, index) => (
            <motion.div
              key={index}
              className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.3 }}
            >
              <Icon className="w-8 h-8 text-[#86BC25]" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {animationPhase === 'text' && (
        <motion.div
          className="text-center text-white max-w-4xl mx-auto px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-[#86BC25]">
            Compensation Logic<br/>Harmonization
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            From capture and calibration to prototyping,<br/>
            system implementation and transition support
          </p>
          <div className="border-t border-white/30 pt-6">
            <p className="text-lg font-semibold">Manager Case | Eike Brenneisen</p>
            <p className="text-[#86BC25] font-bold text-xl">BCM Transformation</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}