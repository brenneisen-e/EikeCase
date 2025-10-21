
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  paper: "#FFFFFF",
  ink: "#111827",
  muted: "#9CA3AF",
  dash: "#0A84FF",
  sign: "#046A38",
  border: "#E5E7EB",
};

export default function Step5Contract({ shouldPlay, onComplete }) {
  const [phase, setPhase] = useState("idle");
  const [isPlaying, setIsPlaying] = useState(false);

  const lines = useMemo(() => [
    { width: "60%", isTitle: true },
    { width: "85%", isTitle: false },
    { width: "90%", isTitle: false },
    { width: "80%", isTitle: false },
    { width: "88%", isTitle: false },
    { width: "75%", isTitle: false },
  ], []);

  const lineTimes = useMemo(() => [300, 600, 900, 1200, 1500, 1800], []); // Adjusted timings

  useEffect(() => {
    if (shouldPlay && !isPlaying) {
      setPhase("idle");
      setIsPlaying(true);
      requestAnimationFrame(() => {
        setPhase("scan");
        setTimeout(() => setPhase("sign"), 2200); // Adjusted
        setTimeout(() => setPhase("done"), 3400); // Adjusted
        setTimeout(() => {
          setIsPlaying(false);
          if (onComplete) onComplete();
        }, 4000); // Total: 4000ms
      });
    }
  }, [shouldPlay, isPlaying, onComplete]);

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white shadow-sm px-8 py-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-[100px] font-semibold text-center tracking-tight"
          style={{ color: COLORS.sign, fontFamily: 'Aptos, "Segoe UI", system-ui, sans-serif' }}
        >
          Step 5: Contract Transition
        </h1>
        <p className="text-center mt-2 text-[28px] font-medium" style={{ color: COLORS.sign }}>
          Final document review, validation & signature
        </p>
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className="relative w-full max-w-3xl rounded-2xl border bg-white shadow-lg"
          style={{ borderColor: COLORS.border }}
        >
          {/* Document Area */}
          <div className="p-8">
            {/* Title */}
            <div className="mb-6">
              <LineReveal
                width={lines[0].width}
                height="8px"
                appearAt={lineTimes[0]}
                active={phase === "scan" || phase === "sign" || phase === "done"}
              />
            </div>

            {/* Body Lines */}
            <div className="space-y-4 relative">
              {lines.slice(1).map((line, i) => {
                const idx = i + 1;
                const appearAt = lineTimes[idx] ?? (800 + idx * 400); // Fallback in case lineTimes is shorter
                return (
                  <LineReveal
                    key={idx}
                    width={line.width}
                    height="3px"
                    appearAt={appearAt}
                    active={phase === "scan" || phase === "sign" || phase === "done"}
                  />
                );
              })}
            </div>

            {/* Signature Area */}
            <div className="mt-12 pt-6">
              <div className="h-20 relative">
                {/* Signature Line */}
                <div
                  className="absolute left-0 right-0 bottom-4 border-t"
                  style={{ borderColor: COLORS.border }}
                />
                <div className="absolute bottom-0 left-0 text-[24px] text-gray-500">
                  Authorized Signature
                </div>

                {/* Signature Path */}
                <Signature draw={phase === "sign" || phase === "done"} color={COLORS.sign} />
              </div>
            </div>
          </div>

          {/* Approved Stamp */}
          <AnimatePresence>
            {phase === "done" && (
              <motion.div
                className="absolute top-6 right-6 px-4 py-2 rounded-full border-2 text-[28px] font-bold select-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [0.96, 1.06, 1.0], opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ color: COLORS.sign, borderColor: COLORS.sign, background: "#ECFDF5" }}
              >
                APPROVED
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function LineReveal({ width, height, appearAt, active }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!active) {
      setOn(false);
      return;
    }
    const t = setTimeout(() => setOn(true), appearAt);
    return () => clearTimeout(t);
  }, [active, appearAt]);

  return (
    <motion.div
      className="rounded-full"
      style={{ width, height }}
      initial={{ backgroundColor: COLORS.muted, opacity: 0.5 }}
      animate={{ 
        backgroundColor: on ? COLORS.ink : COLORS.muted, 
        opacity: on ? 1 : 0.5 
      }}
      transition={{ duration: 0.35 }}
    />
  );
}

function Signature({ draw, color }) {
  return (
    <motion.svg
      viewBox="0 0 300 80"
      className="absolute bottom-5 right-0 w-[240px] h-[70px]"
      initial={false}
    >
      <motion.path
        d="M10,50 C40,20 60,80 90,40 C110,20 130,60 160,38 C175,28 200,55 220,35 C235,25 260,45 285,30"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw ? 1 : 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </motion.svg>
  );
}
