
import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingDown, Check, X, ArrowUpRight, ArrowDownRight, Settings, Code, BarChart, Calculator, FileSignature, Database } from 'lucide-react';

import Step4CalibrationMinimal from './Step4CalibrationMinimal';
import Step5Contract from './Step5Contract';
import Step6SystemIntegration from './Step6SystemIntegration';

// Animation easing and spring configurations
const easeEmph = [0.16, 1, 0.3, 1];
const springSoft = { type: "spring", stiffness: 220, damping: 26, mass: 0.9 };

// Merge animation variants
const mergeVariants = {
  preAlign: (left) => ({
    left,
    scale: 0.98,
    opacity: 0.9,
    filter: "blur(0.5px)",
    transition: { left: { duration: 0.8, ease: easeEmph }, scale: { duration: 0.6 } }
  }),
  overlap: (left) => ({
    left,
    scale: 0.98,
    opacity: 0.7,
    filter: "blur(1px)",
    transition: { duration: 0.4 }
  }),
  hideContent: { opacity: 0, transition: { duration: 0.25 } },
  showMerged: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { ...springSoft, delay: 0.15 }
  }
};

// Professional chart component with refined timing
const ProvisionChart = memo(({ type }) => {
  const hasAnimated = useRef(false);
  
  const bars = type === 'insurer2' ? [
    { height: '20%', color: 'bg-green-300', label: 'IC', delay: 0.2 },
    { height: '70%', color: 'bg-green-600', label: 'SC', delay: 0.35 },
    { height: '75%', color: 'bg-green-700', delay: 0.55 },
    { height: '80%', color: 'bg-green-800', delay: 0.75 },
    { height: '60%', color: 'bg-amber-500', label: 'Sub', delay: 0.95 }
  ] : [
    { height: '75%', color: 'bg-blue-300', label: 'IC', delay: 0.2 },
    { height: '60%', color: 'bg-blue-400', delay: 0.35 },
    { height: '40%', color: 'bg-blue-500', delay: 0.55 },
    { height: '25%', color: 'bg-blue-600', label: 'RC', delay: 0.75 },
    { height: '20%', color: 'bg-blue-700', delay: 0.95 }
  ];

  useEffect(() => {
    hasAnimated.current = true;
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col pt-8 px-4 pb-4">
      <div className="flex-1 relative">
        <div className="absolute left-2 top-0 bottom-4 w-0.5 bg-white/60" />
        <div className="absolute left-2 right-0 bottom-4 h-0.5 bg-white/60" />
        
        <div className="absolute bottom-4 left-6 right-2 top-2 flex items-end justify-between">
          {bars.map((bar, index) => (
            <motion.div
              key={`${type}-bar-${index}`}
              className={`w-6 rounded-t relative ${bar.color}`}
              initial={{ height: hasAnimated.current ? bar.height : 0 }}
              animate={{ height: bar.height }}
              transition={{ 
                delay: hasAnimated.current ? 0 : bar.delay, 
                duration: hasAnimated.current ? 0 : 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {bar.label && (
                <div className={`absolute -top-5 text-[9px] ${
                  bar.label === 'Sub' ? 'text-amber-900' : 'text-white'
                } text-center w-full font-medium`}>
                  {bar.label}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="absolute -bottom-1 left-6 right-2 flex justify-between text-[9px] text-white/80 font-medium">
          <span>Y1</span>
          <span>Y2</span>
          <span>Y3</span>
          <span>Y4</span>
          <span>Y5</span>
        </div>
      </div>
    </div>
  );
});

ProvisionChart.displayName = 'ProvisionChart';

// Ghost trail component for merge effect
const GhostTrail = ({ x, y, w, h, color }) => (
  <motion.div
    className="absolute rounded-xl"
    style={{ left: x, top: y, width: w, height: h, boxShadow: `0 0 0 2px ${color} inset` }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.3, 0], scale: [1, 1.02, 1.01] }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  />
);

const Step1Animation = ({ shouldPlay, onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const phases = React.useMemo(() => [
    { name: 'initial', duration: 500 },
    { name: 'labels', duration: 800 },
    { name: 'insurer1', duration: 2000 },
    { name: 'insurer2', duration: 2000 },
    { name: 'inequality', duration: 1200 },
    { name: 'merge', duration: 2200 },
    { name: 'questionmark_pmi', duration: 1500 },
    { name: 'current', duration: 2000 },
    { name: 'loss', duration: 1500 },
    { name: 'questionmark_internal', duration: 1500 },
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
        setAnimationPhase((prev) => prev + 1);
      }, phases[animationPhase].duration);

      return () => clearTimeout(timer);
    } else if (animationPhase >= phases.length && isPlaying) {
      setIsPlaying(false);
      if (onComplete) onComplete();
    }
  }, [animationPhase, isPlaying, phases, onComplete]);

  const containerCenter = 300;
  const boxWidth = 180;
  const internalOptimizationLeft = containerCenter - 140;
  const mergePosition = internalOptimizationLeft;
  const showMerged = animationPhase >= 6;

  if (!hasStarted) return null;

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Professional Header */}
      <div className="bg-white shadow-sm px-8 py-6">
        <h1 className="text-5xl font-semibold text-gray-900 text-center tracking-tight" style={{ fontFamily: 'Aptos, "Segoe UI", system-ui, sans-serif' }}>
          Step 1: Initial Situation
        </h1>
        <p className="text-gray-700 text-center mt-2 text-sm font-medium">
          PMI (Post-Merger Integration) & Internal Optimization
        </p>
      </div>

      {/* Animation Container */}
      <div className="flex-1 relative overflow-hidden">
        <div className="relative w-full max-w-6xl h-full mx-auto p-8">
          
          {/* Enhanced Meta Labels */}
          {animationPhase >= 1 && (
            <>
              <motion.div
                className="absolute text-xs font-semibold text-gray-800 uppercase tracking-wide"
                style={{ top: 20, left: 30 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                PMI (MERGER)
              </motion.div>
              <motion.div
                className="absolute text-xs font-semibold text-gray-800 uppercase tracking-wide"
                style={{ top: 340, left: 30 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                INTERNAL OPTIMIZATION
              </motion.div>
              <motion.div
                className="absolute text-[11px] bg-white/95 px-3 py-1.5 rounded-md border border-gray-300 shadow-sm"
                style={{ top: 20, right: 30 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                IC = Initial Commission | SC = Service Commission | RC = Renewal Commission
              </motion.div>
            </>
          )}
          
          {/* Insurer 1 with advanced merge choreography */}
          {animationPhase >= 2 && !showMerged && (
            <motion.div
              className="absolute rounded-xl shadow-xl"
              style={{ 
                width: boxWidth, 
                height: 140, 
                top: 120,
                background: 'linear-gradient(135deg, #86BC25 0%, #046A38 100%)'
              }}
              custom={animationPhase === 5 ? mergePosition - 8 : (animationPhase < 5 ? 60 : mergePosition)}
              initial={{ opacity: 0, x: -50, left: 60 }}
              animate={
                animationPhase < 5
                  ? { left: 60, opacity: 1, x: 0, filter: "blur(0px)" }
                  : animationPhase === 5
                    ? "preAlign"
                    : "overlap"
              }
              variants={mergeVariants}
              transition={{ left: { duration: 2, ease: easeEmph } }}
            >
              <div className="text-sm font-bold text-white text-center mt-2">Insurer 1</div>
              <motion.div
                animate={animationPhase >= 5 ? "hideContent" : { opacity: 1 }}
                variants={mergeVariants}
              >
                <ProvisionChart type="insurer1" />
              </motion.div>
              {animationPhase < 5 && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-700 whitespace-nowrap font-medium"
                  style={{ bottom: "-20px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  High IC upfront, low RC
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Insurer 2 with advanced merge choreography */}
          {animationPhase >= 3 && !showMerged && (
            <motion.div
              className="absolute rounded-xl shadow-xl"
              style={{ 
                width: boxWidth, 
                height: 140, 
                top: 120,
                background: 'linear-gradient(135deg, #046A38 0%, #00594C 100%)'
              }}
              custom={animationPhase === 5 ? mergePosition + 8 : (animationPhase < 5 ? 360 : mergePosition)}
              initial={{ opacity: 0, x: 50, left: 360 }}
              animate={
                animationPhase < 5
                  ? { left: 360, opacity: 1, x: 0, filter: "blur(0px)" }
                  : animationPhase === 5
                    ? "preAlign"
                    : "overlap"
              }
              variants={mergeVariants}
              transition={{ left: { duration: 2, ease: easeEmph } }}
            >
              <div className="text-sm font-bold text-white text-center mt-2">Insurer 2</div>
              <motion.div
                animate={animationPhase >= 5 ? "hideContent" : { opacity: 1 }}
                variants={mergeVariants}
              >
                <ProvisionChart type="insurer2" />
              </motion.div>
              {animationPhase < 5 && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-700 whitespace-nowrap font-medium"
                  style={{ bottom: "-20px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Low IC, high SC & Subsidies
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Ghost trails during merge */}
          {animationPhase === 5 && (
            <>
              <GhostTrail x={mergePosition - 14} y={118} w={boxWidth + 28} h={144} color="rgba(134, 188, 37, 0.35)" />
              <GhostTrail x={mergePosition - 10} y={118} w={boxWidth + 20} h={144} color="rgba(4, 106, 56, 0.35)" />
            </>
          )}

          {/* Enhanced Inequality Symbol */}
          {(animationPhase === 4 || animationPhase === 5) && (
            <motion.div
              className="absolute text-4xl font-bold text-gray-700"
              style={{ left: containerCenter - 15, top: 165 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={animationPhase === 4 ? { opacity: 1, scale: [0.5, 1.1, 1] } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
            >
              ≠
            </motion.div>
          )}

          {/* Merged Entity */}
          {showMerged && (
            <motion.div
              className="absolute rounded-xl shadow-2xl overflow-hidden"
              style={{ 
                left: mergePosition, 
                top: 120, 
                width: boxWidth, 
                height: 140, 
                background: "linear-gradient(135deg, #86BC25 0%, #046A38 50%, #00594C 100%)"
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate="showMerged"
              variants={mergeVariants}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
                animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                transition={{ duration: 0.5, ease: easeEmph, delay: 0.15 }}
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0))" }}
              />
              
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.25] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)" }}
              />
              
              <div className="relative z-10 text-sm font-bold text-white text-center mt-2">Insurer 1+2</div>

              {animationPhase >= 6 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [0.96, 1.06, 1] }}
                  transition={{ ...springSoft, delay: 0.45 }}
                >
                  <div className="text-6xl text-white font-bold" style={{ textShadow: "0 0 20px rgba(0,0,0,0.3)" }}>?</div>
                </motion.div>
              )}

              <motion.div
                className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-700 whitespace-nowrap font-medium"
                style={{ bottom: "-20px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Merged – Logic unclear & heterogeneous
              </motion.div>
            </motion.div>
          )}

          {/* Internal Optimization Section */}
          {animationPhase >= 7 && (
            <motion.div 
              className="absolute flex gap-4" 
              style={{ left: containerCenter - 140, top: 380 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Current State */}
              <motion.div
                className="rounded-xl shadow-xl relative"
                style={{ 
                  width: boxWidth, 
                  height: 130,
                  background: 'linear-gradient(135deg, #FFC72C 0%, #FF8200 100%)'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-sm font-bold text-white text-center mt-2">Current State</div>
                <ProvisionChart type="insurer1" />
                
                {animationPhase >= 9 && (
                  <motion.div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-6xl text-white font-bold" style={{
                      textShadow: '0 0 20px rgba(0,0,0,0.3)'
                    }}>?</div>
                  </motion.div>
                )}
              </motion.div>

              {/* Professional Loss Indicator */}
              {animationPhase >= 8 && (
                <motion.div
                  className="rounded-xl shadow-xl flex flex-col items-center justify-center"
                  style={{ 
                    width: 100, 
                    height: 130,
                    background: 'linear-gradient(135deg, #DA291C 0%, #A6192E 100%)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <TrendingDown className="w-10 h-10 text-white mb-2" strokeWidth={2.5} />
                  <div className="text-sm font-bold text-white">Loss</div>
                </motion.div>
              )}
              
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 text-xs text-gray-700 whitespace-nowrap font-medium"
                style={{ bottom: "-20px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Unprofitable structure needs optimization
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Step2Animation = ({ shouldPlay, onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [scanTick, setScanTick] = useState(0);
  const [selectedForRule, setSelectedForRule] = useState([]);

  const categories = React.useMemo(() => [
  { id: "initial", label: "Initial Commission", approved: true },
  { id: "renewal", label: "Renewal Commission", approved: false },
  { id: "ongoing", label: "Ongoing Commission", approved: true },
  { id: "subsidies", label: "Subsidies", approved: false },
  { id: "coearners", label: "Co-Earner Structures", approved: true },
  { id: "special", label: "Special Compensations", approved: false }],
  []);

  const phases = React.useMemo(() => [
  { name: 'initial', duration: 300 },
  { name: 'boxes-appear', duration: 400 },
  { name: 'scan-continuous', duration: 2800 },
  { name: 'resolve', duration: 500 },
  { name: 'complete', duration: 0 }],
  []);

  useEffect(() => {
    if (shouldPlay && !isPlaying) {
      setHasStarted(true);
      setAnimationPhase(0);
      setIsPlaying(true);
      setScanTick(0);
      setSelectedForRule([]);
    }
  }, [shouldPlay, isPlaying]);

  useEffect(() => {
    if (isPlaying && animationPhase < phases.length) {
      const timer = setTimeout(() => {
        setAnimationPhase((prev) => prev + 1);
      }, phases[animationPhase].duration);

      return () => clearTimeout(timer);
    } else if (animationPhase >= phases.length && isPlaying) {
      setIsPlaying(false);
      if (onComplete) onComplete();
    }
  }, [animationPhase, isPlaying, phases, onComplete]);

  useEffect(() => {
    const inScan = animationPhase >= 2 && animationPhase < 4;
    if (!inScan) {
      setScanTick(0);
      return;
    }

    const id = setInterval(() => setScanTick((t) => t + 1), 600);
    return () => clearInterval(id);
  }, [animationPhase]);

  useEffect(() => {
    if (animationPhase < 4) return;
    const visible = categories.map((c) => `${c.label}:${c.approved ? "yes" : "no"}`);
    setSelectedForRule(visible);
  }, [animationPhase, categories]);

  const showBoxes = animationPhase >= 1;
  const inScanMode = animationPhase >= 2 && animationPhase < 4;
  const showFinalIcons = animationPhase >= 4;

  const getIconState = (idx) => {
    const patterns = [
    [true, false, true, false, true, false],
    [false, false, true, true, false, true],
    [true, true, false, false, true, false],
    [false, true, true, false, false, true],
    [true, false, false, true, true, false],
    [false, true, false, true, false, true]];

    const patternIndex = scanTick % patterns.length;
    return patterns[patternIndex][idx];
  };

  if (!hasStarted) return null;

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white shadow-sm px-8 py-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>

        <h1 className="text-[100px] font-semibold text-center tracking-tight"
        style={{ fontFamily: 'Aptos, "Segoe UI", system-ui, sans-serif', color: '#046A38' }}>
          Step 2: Requirements Definition
        </h1>
        <p className="text-center mt-2 text-[28px] font-medium" style={{ color: '#046A38' }}>
          Evaluate and combine commission elements
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-5xl w-full">
          {/* Grid Container */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {categories.map((category, index) =>
            <motion.div
              key={index}
              className="relative bg-white rounded-xl shadow-lg border-2 border-gray-200 px-6 py-8 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: showBoxes ? 1 : 0,
                y: showBoxes ? 0 : 20
              }}
              transition={{
                opacity: { duration: 0.4, delay: index * 0.1 },
                y: { duration: 0.4, delay: index * 0.1 }
              }}>

                {/* Label */}
                <div className="text-[36px] font-semibold relative z-10" style={{ color: '#046A38' }}>
                  {category.label}
                </div>

                {/* Icon */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  {showBoxes &&
                <>
                      {inScanMode ?
                  getIconState(index) ?
                  <motion.div
                    key={`scan-check-${index}-${scanTick}`}
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: [0.2, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 0.35, type: 'spring', stiffness: 320, damping: 20 }}>

                            <Check
                      className="w-24 h-24"
                      strokeWidth={3}
                      style={{ color: '#046A38' }} />

                          </motion.div> :

                  <motion.div
                    key={`scan-cross-${index}-${scanTick}`}
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{
                      scale: [0.2, 1.1, 1],
                      opacity: 1,
                      x: [0, -5, 5, -3, 3, 0]
                    }}
                    transition={{
                      duration: 0.4,
                      type: 'spring',
                      stiffness: 320,
                      damping: 20
                    }}>

                            <X
                      className="w-24 h-24"
                      strokeWidth={3}
                      style={{ color: '#DA291C' }} />

                          </motion.div> :

                  showFinalIcons ?
                  category.approved ?
                  <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: [0.2, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}>

                            <Check
                      className="w-24 h-24"
                      strokeWidth={3}
                      style={{ color: '#046A38' }} />

                          </motion.div> :

                  <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{
                      scale: [0.2, 1.1, 1],
                      opacity: 1,
                      x: [0, -6, 6, -6, 6, 0]
                    }}
                    transition={{
                      scale: {
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20
                      },
                      x: {
                        duration: 0.25,
                        delay: 0.3,
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                      },
                      opacity: { duration: 0.3 }
                    }}>

                            <X
                      className="w-24 h-24"
                      strokeWidth={3}
                      style={{ color: '#DA291C' }} />

                          </motion.div> :

                  null}
                    </>
                }
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Scan info message */}
      {inScanMode &&
      <div className="mx-auto max-w-5xl text-center text-[28px] mb-4 px-8 font-medium" style={{ color: '#046A38' }}>
          Evaluating all possible combinations...
        </div>
      }

      {/* Logic Builder Tray */}
      <div className="px-8 pb-6">
        <motion.div
          className="mx-auto max-w-5xl rounded-2xl bg-white shadow-md border border-gray-100 px-5 py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: selectedForRule.length ? 1 : 0, y: selectedForRule.length ? 0 : 10 }}
          transition={{ duration: 0.3 }}>

          <div className="text-[28px] mb-2 font-medium" style={{ color: '#046A38' }}>
            Defined combination:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {selectedForRule.map((t, i) => {
              const [name, flag] = t.split(":");
              const isYes = flag === "yes";
              return (
                <motion.span
                  key={t}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[28px]
                     ${isYes ? "bg-green-50 text-green-700 border border-green-200" :
                  "bg-red-50 text-red-700 border border-red-200"}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}>

                  {name}
                  <span className={`text-[24px] ${isYes ? "text-green-600" : "text-red-600"}`}>
                    {isYes ? "✔" : "✖"}
                  </span>
                </motion.span>);

            })}
            {selectedForRule.length > 0 &&
            <>
                <span className="mx-1 text-gray-400 font-semibold text-[28px]">=</span>
                <motion.span
                className="rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 text-[28px]"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}>

                  Target commission rule
                </motion.span>
              </>
            }
          </div>
        </motion.div>
      </div>
    </div>);

};

const fmtPct = (v) => `${(v * 100).toFixed(1)}%`;

function makeHistogram(mean, sd, bins = 20, range = [-3, 3]) {
  const [min, max] = range;
  const step = (max - min) / bins;
  const xs = Array.from({ length: bins }, (_, i) => min + i * step + step / 2);
  const pdf = (x) => Math.exp(-0.5 * ((x - mean) / sd) ** 2);
  const ys = xs.map(pdf);
  const maxY = Math.max(...ys);
  return ys.map((y) => y / maxY);
}

const kpis = [
{ id: "payout", title: "Total Payout per Policy", unit: "€", baseMean: 0.1, newShift: 0.15 },
{ id: "rcShare", title: "Renewal Commission Share", unit: "%", baseMean: 0.0, newShift: 0.3 },
{ id: "icCapRatio", title: "IC Cap Hit Ratio", unit: "%", baseMean: -0.2, newShift: -0.05 },
{ id: "subsidies", title: "Subsidy Usage", unit: "%", baseMean: -0.1, newShift: -0.2 },
{ id: "mixVar", title: "Product Mix Variance", unit: "%", baseMean: 0.1, newShift: 0.0 },
{ id: "clawback", title: "Clawback Exposure", unit: "%", baseMean: -0.15, newShift: -0.25 }];


const agents = [
{ id: "a1", name: "Alex Müller", seg: "Retail" },
{ id: "a2", name: "Bianca Kraus", seg: "Affluent" },
{ id: "a3", name: "Cem Aydin", seg: "Broker" },
{ id: "a4", name: "Dana Vogt", seg: "Retail" },
{ id: "a5", name: "Elias Brand", seg: "Affluent" }];


function randomDelta(seed) {
  const rnd = (m) => (Math.sin(seed * m * 13.37) + 1) / 2;
  const sign = (p) => rnd(p) > 0.5 ? 1 : -1;
  return {
    payout: Math.round((rnd(1) * 0.08 + 0.02) * sign(2) * 100) / 100,
    rc: Math.round((rnd(3) * 0.06 + 0.01) * sign(4) * 100) / 100,
    subsidy: Math.round((rnd(5) * 0.07 + 0.01) * sign(6) * 100) / 100,
    thresholds: Math.round((rnd(7) * 0.05 + 0.01) * sign(8) * 100) / 100,
    clawback: Math.round((rnd(9) * 0.05 + 0.01) * sign(10) * 100) / 100
  };
}

function buildBadgesFromDeltas(d) {
  const arr = [];
  if (Math.abs(d.rc) > 0.03) arr.push("RC harmonized");
  if (d.payout > 0.05) arr.push("IC optimization");
  if (d.subsidy < 0) arr.push("Subsidy removed");
  if (Math.abs(d.thresholds) > 0.03) arr.push("Threshold recalibrated");
  if (d.clawback < 0) arr.push("Lower clawback risk");
  return arr.length ? arr : ["Minor changes"];
}

function MetricCard({ label, value, format }) {
  const up = value >= 0;
  return (
    <motion.div
      className="rounded-lg border border-gray-200 p-3 bg-white shadow-sm"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}>

      <div className="text-[20px] font-medium text-gray-600">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <motion.div
          key={label + value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[36px] font-bold"
          style={{ color: up ? '#046A38' : '#DA291C' }}>

          {format(Math.abs(value))}
        </motion.div>
        {up ?
        <ArrowUpRight className="w-8 h-8" style={{ color: '#046A38' }} /> :

        <ArrowDownRight className="w-8 h-8" style={{ color: '#DA291C' }} />
        }
      </div>
      <div className="mt-2 h-1.5 rounded bg-gray-200 overflow-hidden">
        <motion.div
          key={label + "bar" + value}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.round(Math.abs(value) * 100))}%` }}
          className="h-full"
          style={{ backgroundColor: up ? '#046A38' : '#DA291C' }}
          transition={{ duration: 0.4 }} />

      </div>
    </motion.div>);

}

function NotesBadge({ items }) {
  return (
    <motion.div
      className="col-span-2 rounded-lg border p-2 bg-green-50/60 flex flex-col gap-1"
      style={{ borderColor: '#046A38' }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}>

      <div className="text-[20px] font-semibold" style={{ color: '#046A38' }}>
        Changes:
      </div>
      <div className="flex flex-wrap gap-1">
        {items.map((t, i) =>
        <span
          key={t + i}
          className="text-[18px] px-1.5 py-0.5 rounded-full bg-white border"
          style={{ color: '#046A38', borderColor: '#046A38' }}>

            {t}
          </span>
        )}
      </div>
    </motion.div>);

}

function KpiHistogramCard({ title, unit, baseMean, newShift, index }) {
  const bins = 20;
  const base = makeHistogram(baseMean, 0.9, bins);
  const neu = makeHistogram(baseMean + newShift, 0.9, bins);
  const delta = newShift;

  return (
    <motion.div
      className="rounded-xl bg-white border border-gray-200 p-3 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}>

      <div className="flex items-start justify-between mb-2">
        <div className="text-[24px] font-semibold" style={{ color: '#046A38' }}>
          {title}
        </div>
        <span
          className="text-[20px] px-1.5 py-0.5 rounded-full border flex-shrink-0"
          style={{
            backgroundColor: delta >= 0 ? '#F0F9F4' : '#FEE2E2',
            color: delta >= 0 ? '#046A38' : '#DA291C',
            borderColor: delta >= 0 ? '#046A38' : '#DA291C'
          }}>

          Δ{delta >= 0 ? "+" : ""}{(delta * 100).toFixed(1)}{unit === "%" ? "pp" : ""}
        </span>
      </div>

      <div className="h-20 relative">
        <div className="absolute inset-0 flex items-end gap-[1px]">
          {base.map((v, i) =>
          <motion.div
            key={"b" + i}
            className="flex-1 bg-gray-300 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${v * 100}%` }}
            transition={{ duration: 0.3, delay: i * 0.005 }} />

          )}
        </div>
        <div className="absolute inset-0 flex items-end gap-[1px]">
          {neu.map((v, i) =>
          <motion.div
            key={"n" + i}
            className="flex-1 rounded-t"
            style={{ backgroundColor: 'rgba(4, 106, 56, 0.7)' }}
            initial={{ height: 0 }}
            animate={{ height: `${v * 100}%` }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.005 }} />

          )}
        </div>
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] bg-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          style={{ left: `${(0.5 + baseMean / 6) * 100}%` }} />

        <motion.div
          className="absolute top-0 bottom-0 w-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.25 }}
          style={{ left: `${(0.5 + (baseMean + newShift) / 6) * 100}%`, backgroundColor: '#046A38' }} />

      </div>

      <div className="mt-1 text-[18px] text-gray-500">
        Gray: baseline | Green: new
      </div>
    </motion.div>);

}

const Step3Animation = ({ shouldPlay, onComplete }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const autoplayRef = useRef(null);

  const phases = React.useMemo(() => [
  { name: 'initial', duration: 200 },
  { name: 'agent-scroll', duration: 3300 },
  { name: 'complete', duration: 500 }],
  []);

  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (shouldPlay && !isPlaying) {
      setHasStarted(true);
      setAnimationPhase(0);
      setActiveIdx(0);
      setIsPlaying(true);
    }
  }, [shouldPlay, isPlaying]);

  useEffect(() => {
    if (isPlaying && animationPhase < phases.length) {
      const timer = setTimeout(() => {
        setAnimationPhase((prev) => prev + 1);
      }, phases[animationPhase].duration);

      return () => clearTimeout(timer);
    } else if (animationPhase >= phases.length && isPlaying) {
      setIsPlaying(false);
      if (onComplete) onComplete();
    }
  }, [animationPhase, isPlaying, phases, onComplete]);

  const stopAuto = React.useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || animationPhase < 1) {
      stopAuto();
      return;
    }
    stopAuto();
    autoplayRef.current = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % agents.length);
    }, 700);
    return stopAuto;
  }, [isPlaying, animationPhase, stopAuto]);

  const activeAgent = agents[activeIdx];
  const deltas = React.useMemo(() => randomDelta(activeIdx + 1), [activeIdx]);

  if (!hasStarted) return null;

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <motion.div
        className="bg-white shadow-sm px-8 py-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>

        <h1 className="text-[100px] font-semibold text-center tracking-tight"
        style={{ fontFamily: 'Aptos, "Segoe UI", system-ui, sans-serif', color: '#046A38' }}>
          Step 3: Simulation of Impacts
        </h1>
        <p className="text-center mt-2 text-[28px] font-medium" style={{ color: '#046A38' }}>
          Agent perspective & Company perspective
        </p>
      </motion.div>

      <div className="flex-1 grid grid-cols-2 gap-6 p-6 overflow-hidden">
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="text-[36px] font-semibold px-2" style={{ color: '#046A38' }}>
            Agent Impact
          </div>

          <div className="flex gap-4 flex-1 overflow-hidden">
            <div className="w-48 rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden flex-shrink-0">
              <div className="px-3 py-2 text-[24px] font-medium border-b" style={{ color: '#046A38' }}>
                Agents
              </div>
              <div className="overflow-auto h-[calc(100%-40px)]">
                {agents.map((a, idx) =>
                <button
                  key={a.id}
                  onClick={() => {setActiveIdx(idx);stopAuto();}}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left transition ${
                  idx === activeIdx ? "bg-green-50" : "hover:bg-gray-50"}`
                  }>

                    <div>
                      <div className="text-[24px] font-semibold" style={{ color: '#046A38' }}>
                        {a.name}
                      </div>
                      <div className="text-[20px] text-gray-500">{a.seg}</div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 rounded-xl bg-white shadow-sm border border-gray-200 p-4 overflow-auto">
              <motion.div
                key={activeAgent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[36px] font-semibold" style={{ color: '#046A38' }}>
                      {activeAgent.name}
                    </div>
                    <span className="inline-flex text-[20px] px-2 py-0.5 rounded-full bg-green-50 border mt-1"
                    style={{ color: '#046A38', borderColor: '#046A38' }}>
                      {activeAgent.seg}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <MetricCard label="Payout Δ" value={deltas.payout} format={(v) => fmtPct(v)} />
                  <MetricCard label="RC Share Δ" value={deltas.rc} format={(v) => fmtPct(v)} />
                  <MetricCard label="Subsidy" value={deltas.subsidy} format={(v) => fmtPct(v)} />
                  <MetricCard label="Threshold" value={deltas.thresholds} format={(v) => fmtPct(v)} />
                  <MetricCard label="Clawback" value={deltas.clawback} format={(v) => fmtPct(v)} />
                  <NotesBadge items={buildBadgesFromDeltas(deltas)} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="text-[36px] font-semibold px-2" style={{ color: '#046A38' }}>
            Company Impact
          </div>

          <div className="grid grid-cols-2 gap-4 overflow-auto">
            {kpis.map((k, i) =>
            <KpiHistogramCard key={k.id} index={i} {...k} />
            )}
          </div>
        </div>
      </div>
    </div>);

};

const ProcessSummary = ({ onRestart }) => {
  const steps = [
  { number: 1, title: "Initial Situation", icon: Settings, role: "supporting" },
  { number: 2, title: "Requirements", icon: Check, role: "contributing" },
  { number: 3, title: "Impact Simulation", icon: BarChart, role: "primary" },
  { number: 4, title: "Calibration", icon: Calculator, role: "primary" },
  { number: 5, title: "Contract", icon: FileSignature, role: "primary", badge: "+ SST" },
  { number: 6, title: "System Implementation", icon: Database, role: "supporting" }];


  const getStepStyle = (role) => {
    switch (role) {
      case "primary":
        return {
          bg: "#046A38",
          border: "#046A38",
          iconColor: "#FFFFFF",
          textColor: "#FFFFFF",
          labelBg: "rgba(255,255,255,0.2)"
        };
      case "contributing":
        return {
          bg: "#A7D7C5",
          border: "#046A38",
          iconColor: "#046A38",
          textColor: "#046A38",
          labelBg: "rgba(4,106,56,0.1)"
        };
      case "supporting":
        return {
          bg: "#FFFFFF",
          border: "#E5E7EB",
          iconColor: "#9CA3AF",
          textColor: "#6B7280",
          labelBg: "#F3F4F6"
        };
      default:
        return {};
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white shadow-sm px-8 py-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>

        <h1 className="text-[100px] font-semibold text-gray-900 text-center tracking-tight" style={{ fontFamily: 'Aptos, "Segoe UI", system-ui, sans-serif' }}>
          End-to-End Process
        </h1>
        <p className="text-gray-700 text-center mt-2 text-[28px] font-medium">
          Complete compensation logic harmonization workflow
        </p>
      </motion.div>

      {/* Process Chain */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex items-center justify-center gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const style = getStepStyle(step.role);
            return (
              <React.Fragment key={step.number}>
                <motion.div
                  className="flex flex-col items-center justify-start"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}>

                  {/* Box with fixed dimensions */}
                  <div
                    className="w-40 h-40 rounded-xl shadow-lg border-2 flex flex-col items-center justify-center relative flex-shrink-0"
                    style={{
                      borderColor: style.border,
                      backgroundColor: style.bg
                    }}>

                    {/* Icon */}
                    <Icon
                      className="w-20 h-20 mb-3"
                      style={{ color: style.iconColor }}
                      strokeWidth={2} />


                    {/* Step Label */}
                    <div
                      className="px-3 py-1 rounded-full text-[16px] font-bold"
                      style={{
                        color: style.textColor,
                        backgroundColor: style.labelBg
                      }}>

                      Step {step.number}
                    </div>

                    {/* Badge for SST */}
                    {step.badge &&
                    <motion.div
                      className="absolute -top-2 -right-2 bg-[#86BC25] text-white px-2 py-1 rounded-full text-[14px] font-bold shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, type: "spring" }}>

                        {step.badge}
                      </motion.div>
                    }
                  </div>
                  
                  {/* Title below with fixed height */}
                  <div
                    className="text-[20px] font-semibold text-center mt-3 h-14 flex items-center justify-center"
                    style={{
                      color: step.role === "primary" ? "#046A38" : "#6B7280",
                      width: "140px"
                    }}>

                    {step.title}
                  </div>
                </motion.div>

                {/* Arrow - perfectly centered with boxes */}
                {index < steps.length - 1 &&
                <motion.div
                  className="text-[48px] font-bold flex-shrink-0"
                  style={{
                    color: "#046A38",
                    marginBottom: "56px" // Offset for title height below
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}>

                    →
                  </motion.div>
                }
              </React.Fragment>);

          })}
        </div>
      </div>

      {/* Legend */}
      <motion.div
        className="bg-white px-8 py-6 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}>

        <div className="flex justify-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#046A38]" />
            <span className="text-[20px] text-gray-700 font-medium">Core Responsibility</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#A7D7C5] border-2 border-[#046A38]" />
            <span className="text-[20px] text-gray-700 font-medium">Contributing</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-white border-2 border-gray-300" />
            <span className="text-[20px] text-gray-700 font-medium">Supporting</span>
          </div>
        </div>
      </motion.div>
    </div>);

};

export default function WhatSection() {
  const [canAnimate, setCanAnimate] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [triggerStep1, setTriggerStep1] = useState(false);
  const [triggerStep2, setTriggerStep2] = useState(false);
  const [triggerStep3, setTriggerStep3] = useState(false);
  const [triggerStep4, setTriggerStep4] = useState(false);
  const [triggerStep5, setTriggerStep5] = useState(false);
  const [triggerStep6, setTriggerStep6] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setCanAnimate(true);
    } else {
      setCanAnimate(false);
      setCurrentStep(0);
      setTriggerStep1(false);
      setTriggerStep2(false);
      setTriggerStep3(false);
      setTriggerStep4(false);
      setTriggerStep5(false);
      setTriggerStep6(false);
    }
  }, [isInView]);

  const handleCompensationClick = () => {
    if (currentStep === 0 || currentStep === 7) {
      setCurrentStep(1);
      setTriggerStep1(true);
      setTriggerStep2(false);
      setTriggerStep3(false);
      setTriggerStep4(false);
    } else {
      setCurrentStep(1);
      setTriggerStep1((prev) => !prev);
      setTriggerStep2(false);
      setTriggerStep3(false);
      setTriggerStep4(false);
    }
    setTriggerStep5(false);
    setTriggerStep6(false);
  };

  const handleStep1Complete = () => {
    setCurrentStep(2);
    setTriggerStep2((prev) => !prev);
  };

  const handleStep2Complete = () => {
    setCurrentStep(3);
    setTriggerStep3((prev) => !prev);
  };

  const handleStep3Complete = () => {
    setCurrentStep(4);
    setTriggerStep4((prev) => !prev);
  };

  const handleStep4Complete = () => {
    setCurrentStep(5);
    setTriggerStep5((prev) => !prev);
  };

  const handleStep5Complete = () => {
    setCurrentStep(6);
    setTriggerStep6((prev) => !prev);
  };

  const handleStep6Complete = () => {
    setCurrentStep(7);
  };

  return (
    <section id="what" ref={ref} className="h-screen w-full bg-white flex flex-col px-20 py-6 overflow-hidden">
      <motion.h1
        className="text-4xl font-normal text-black text-left mb-4"
        style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>

        What: From analysis to adoption, an end-to-end approach
      </motion.h1>

      <motion.div
        className="w-full mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}>

        <div className="my-10 flex justify-between items-start gap-4">
          <div className="flex-1 text-center">
            <div className="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-bold mb-4 text-xl">
              Strategy
            </div>
            <p className="text-gray-600 text-xl text-left leading-relaxed">Define M&A objectives, target synergies and strategic priorities

            </p>
          </div>
          <div className="text-4xl text-gray-400 mt-6">→</div>

          <div className="flex-1 text-center">
            <div className="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-bold mb-4 text-xl">
              TOM
            </div>
            <p className="text-gray-600 text-xl text-left leading-relaxed">Design target operating model and organizational structure

            </p>
          </div>
          <div className="text-4xl text-gray-400 mt-6">→</div>

          <div className="flex-1 text-center">
            <div
              className="bg-[#86BC25] text-white px-6 py-4 rounded-lg font-bold cursor-pointer hover:bg-[#7AA422] hover:scale-105 transition-all duration-300 mb-4 text-xl"
              onClick={handleCompensationClick}>

              Compensation Logic Harmonization
            </div>
            <p className="text-gray-600 text-xl text-left no-underline leading-relaxed">Analyze, simulate and calibrate unified commission structures

            </p>
          </div>
          <div className="text-4xl text-gray-400 mt-6">→</div>

          <div className="flex-1 text-center">
            <div className="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-bold mb-4 text-xl">
              Implementation
            </div>
            <p className="text-gray-600 text-xl text-left leading-relaxed">Deploy systems, train staff and manage change rollout

            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 w-full overflow-hidden" style={{ maxHeight: 'calc(100vh - 280px)' }}>
        <div className="w-full h-full">
          {canAnimate && currentStep === 1 && <Step1Animation shouldPlay={triggerStep1} onComplete={handleStep1Complete} />}
          {canAnimate && currentStep === 2 && <Step2Animation shouldPlay={triggerStep2} onComplete={handleStep2Complete} />}
          {canAnimate && currentStep === 3 && <Step3Animation shouldPlay={triggerStep3} onComplete={handleStep3Complete} />}
          {canAnimate && currentStep === 4 && <Step4CalibrationMinimal shouldPlay={triggerStep4} onComplete={handleStep4Complete} />}
          {canAnimate && currentStep === 5 && <Step5Contract shouldPlay={triggerStep5} onComplete={handleStep5Complete} />}
          {canAnimate && currentStep === 6 && <Step6SystemIntegration shouldPlay={triggerStep6} onComplete={handleStep6Complete} />}
          {canAnimate && currentStep === 7 && <ProcessSummary onRestart={handleCompensationClick} />}
        </div>
      </div>
    </section>);

}
