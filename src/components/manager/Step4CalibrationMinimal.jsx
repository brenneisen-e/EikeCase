
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = {
  blue: "#0A84FF",
  green: "#046A38",
  red: "#DA291C",
  gray: "#9CA3AF",
};

const spring = { type: "spring", stiffness: 280, damping: 24 };

export default function Step4CalibrationMinimal({ shouldPlay, onComplete }) {
  const [heights, setHeights] = useState({ old: 70, new: 85, delta: 15 });
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const phases = useMemo(() => [
    { name: 'initial', duration: 200 },
    { name: 'show', duration: 300 },
    ...Array.from({ length: 12 }, (_, i) => ({ name: `iterate-${i}`, duration: 250 })), // 12 x 250 = 3000ms
    { name: 'complete', duration: 500 }
  ], []); // Total: 4000ms

  const randomize = useCallback(() => {
    const oldVal = 60 + Math.random() * 30;
    const newVal = oldVal + (Math.random() - 0.5) * 40;
    const deltaVal = newVal - oldVal;
    setHeights({ old: oldVal, new: newVal, delta: deltaVal });
  }, []);

  const calibrate = useCallback(() => {
    setHeights(prev => ({ old: prev.old, new: prev.old, delta: 0 }));
  }, []);

  useEffect(() => {
    if (shouldPlay && !isPlaying) {
      setAnimationPhase(0);
      setHeights({ old: 70, new: 85, delta: 15 });
      setIsPlaying(true);
    }
  }, [shouldPlay, isPlaying]);

  useEffect(() => {
    if (isPlaying && animationPhase < phases.length) {
      const timer = setTimeout(() => {
        const nextPhase = animationPhase + 1;
        
        if (nextPhase >= 2 && nextPhase <= 13) { // adjusted for 12 iterations (phase 2 to phase 13)
          randomize();
        }
        if (nextPhase === 14) { // adjusted (after the 12th iteration, phase 14)
          calibrate();
        }
        
        setAnimationPhase(nextPhase);
      }, phases[animationPhase].duration);
      
      return () => clearTimeout(timer);
    } else if (animationPhase >= phases.length && isPlaying) {
      setTimeout(() => {
        setAnimationPhase(0);
        setIsPlaying(false);
        setHeights({ old: 70, new: 85, delta: 15 });
        if (onComplete) onComplete();
      }, 0);
    }
  }, [animationPhase, isPlaying, phases, randomize, calibrate, onComplete]);

  const deltaColor = heights.delta > 0 ? COLORS.green : 
                     heights.delta < 0 ? COLORS.red : COLORS.gray;

  const showBars = animationPhase >= 1;

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Professional Header */}
      <motion.div
        className="bg-white shadow-sm px-8 py-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[100px] font-semibold text-gray-900 text-center tracking-tight" style={{ fontFamily: 'Aptos, "Segoe UI", system-ui, sans-serif' }}>
          Step 4: Calibration
        </h1>
        <p className="text-gray-700 text-center mt-2 text-[28px] font-medium">
          Iterative calibration to align new earnings to baseline
        </p>
      </motion.div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full h-[400px] rounded-lg bg-white/50 border border-gray-300 p-6 flex flex-col">
          
          {/* Bars Container */}
          <div className="flex-1 relative flex flex-col">
            {/* Chart Area */}
            <div className="flex-1 relative">
              {/* X-Axis in der Mitte */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 border-t-2 border-gray-300" />
              
              {/* Three Bars */}
              <div className="absolute inset-0 flex items-center justify-around gap-12">
                {/* OLD */}
                <div className="w-24 h-full flex flex-col justify-center">
                  <div className="w-full h-1/2 flex flex-col justify-end">
                    <motion.div
                      className="w-full rounded-t-lg"
                      style={{ backgroundColor: COLORS.gray }}
                      initial={{ height: 0 }}
                      animate={{ height: showBars ? `${heights.old}%` : 0 }}
                      transition={spring}
                    />
                  </div>
                  <div className="w-full h-1/2" />
                </div>

                {/* NEW */}
                <div className="w-24 h-full flex flex-col justify-center">
                  <div className="w-full h-1/2 flex flex-col justify-end">
                    <motion.div
                      className="w-full rounded-t-lg"
                      style={{ backgroundColor: COLORS.blue }}
                      initial={{ height: 0 }}
                      animate={{ height: showBars ? `${heights.new}%` : 0 }}
                      transition={spring}
                    />
                  </div>
                  <div className="w-full h-1/2" />
                </div>

                {/* DELTA */}
                <div className="w-24 h-full flex flex-col justify-center">
                  {heights.delta >= 0 ? (
                    <>
                      <div className="w-full h-1/2 flex flex-col justify-end">
                        <motion.div
                          className="w-full rounded-t-lg"
                          style={{ backgroundColor: deltaColor }}
                          initial={{ height: 0 }}
                          animate={{ height: showBars ? `${Math.abs(heights.delta)}%` : 0 }}
                          transition={spring}
                        />
                      </div>
                      <div className="w-full h-1/2" />
                    </>
                  ) : (
                    <>
                      <div className="w-full h-1/2" />
                      <div className="w-full h-1/2 flex flex-col justify-start">
                        <motion.div
                          className="w-full rounded-b-lg"
                          style={{ backgroundColor: deltaColor }}
                          initial={{ height: 0 }}
                          animate={{ height: showBars ? `${Math.abs(heights.delta)}%` : 0 }}
                          transition={spring}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Labels */}
            <div className="flex items-start justify-around gap-12 pt-4 pb-2">
              <div className="w-24 text-center text-[28px] font-medium text-gray-700">Old</div>
              <div className="w-24 text-center text-[28px] font-medium text-gray-700">New</div>
              <div className="w-24 text-center text-[28px] font-medium text-gray-700">Delta</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center pt-4">
        <div className="flex gap-2">
          {phases.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= animationPhase ? 'w-8' : 'bg-gray-400'
              }`}
              style={{ backgroundColor: index <= animationPhase ? COLORS.green : undefined }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
