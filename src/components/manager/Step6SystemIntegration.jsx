import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Code, Settings } from 'lucide-react';

const Step6SystemIntegration = ({ shouldPlay, onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const phases = React.useMemo(() => [
    { name: 'initial', duration: 300 },
    { name: 'icons_appear', duration: 1500 },
    { name: 'connections', duration: 1000 },
    { name: 'complete', duration: 0 }
  ], []);

  useEffect(() => {
    if (shouldPlay && !isPlaying) {
      setHasStarted(true);
      setAnimationPhase(0);
      setIsPlaying(true);
    }
  }, [shouldPlay, isPlaying]);

  useEffect(() => {
    if (isPlaying && animationPhase < phases.length) {
      const timer = setTimeout(() => {
        setAnimationPhase(prev => prev + 1);
      }, phases[animationPhase].duration);

      return () => clearTimeout(timer);
    } else if (animationPhase >= phases.length && isPlaying) {
      setIsPlaying(false);
      if (onComplete) onComplete();
    }
  }, [animationPhase, isPlaying, phases, onComplete]);

  const systems = [
    { id: 1, icon: Database, label: 'Core Systems', color: '#046A38', x: 200, y: 250 },
    { id: 2, icon: Code, label: 'APIs', color: '#86BC25', x: 450, y: 150 },
    { id: 3, icon: Settings, label: 'Tools', color: '#5a8019', x: 700, y: 250 }
  ];

  if (!hasStarted) return null;

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white shadow-sm px-8 py-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[100px] font-semibold text-center tracking-tight"
            style={{ fontFamily: 'Aptos, "Segoe UI", system-ui, sans-serif', color: '#046A38' }}>
          Step 6: System Integration
        </h1>
        <p className="text-center mt-2 text-[28px] font-medium" style={{ color: '#046A38' }}>
          Technical implementation and system integration
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative w-full max-w-5xl h-[500px]">
          {/* System Icons */}
          {animationPhase >= 1 && systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={system.id}
                className="absolute"
                style={{ left: system.x, top: system.y }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.3, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center shadow-xl"
                  style={{ backgroundColor: system.color }}
                >
                  <Icon className="w-16 h-16 text-white" strokeWidth={2} />
                </div>
                <div className="text-center mt-4 text-[24px] font-semibold" style={{ color: system.color }}>
                  {system.label}
                </div>
              </motion.div>
            );
          })}

          {/* Connections */}
          {animationPhase >= 2 && (
            <>
              <motion.svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.line
                  x1={systems[0].x + 64}
                  y1={systems[0].y + 64}
                  x2={systems[1].x + 64}
                  y2={systems[1].y + 64}
                  stroke="#046A38"
                  strokeWidth="4"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.line
                  x1={systems[1].x + 64}
                  y1={systems[1].y + 64}
                  x2={systems[2].x + 64}
                  y2={systems[2].y + 64}
                  stroke="#86BC25"
                  strokeWidth="4"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.svg>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step6SystemIntegration;