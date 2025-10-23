import React from 'react';
import { motion } from 'framer-motion';

export default function RobotPainter({ position, isPainting, armAngle = 0, large = false }) {
  const size = large ? '600px' : '400px';

  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)' // Center the robot on the position
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Robot SVG */}
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* Antenna */}
        <motion.line
          x1="50" y1="10" x2="50" y2="20"
          stroke="#666"
          strokeWidth="2"
          animate={{ y1: [10, 8, 10] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.circle
          cx="50" cy="8" r="3"
          fill="#86BC25"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Head */}
        <rect x="35" y="20" width="30" height="25" rx="5" fill="#E0E0E0" stroke="#666" strokeWidth="1.5"/>

        {/* Eyes */}
        <motion.circle
          cx="42" cy="30" r="3"
          fill="#003b6e"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.circle
          cx="58" cy="30" r="3"
          fill="#003b6e"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
        />

        {/* Mouth */}
        <path d="M 43 38 Q 50 41 57 38" stroke="#666" strokeWidth="1.5" fill="none"/>

        {/* White T-Shirt Body */}
        <rect x="32" y="45" width="36" height="35" rx="3" fill="white" stroke="#CCC" strokeWidth="1.5"/>

        {/* Green Deloitte Dot on T-Shirt */}
        <circle cx="50" cy="62" r="6" fill="#86BC25"/>

        {/* Left Arm */}
        <motion.rect
          x="20" y="50" width="12" height="4" rx="2"
          fill="#E0E0E0" stroke="#666" strokeWidth="1"
          style={{ originX: '100%', originY: '50%' }}
        />

        {/* Right Arm with extending animation */}
        <motion.g>
          <motion.rect
            x="68" y="50" width="12" height="4" rx="2"
            fill="#E0E0E0" stroke="#666" strokeWidth="1"
            style={{ originX: '0%', originY: '50%' }}
          />

          {/* Extended arm segment when painting */}
          {isPainting && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Extended arm part */}
              <motion.line
                x1="80" y1="52" x2="120" y2="52"
                stroke="#E0E0E0"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: [80, 120, 80],
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />

              {/* Paintbrush at the end of extended arm */}
              <motion.g
                animate={{
                  x: [0, 40, 0],
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {/* Brush handle */}
                <rect x="120" y="48" width="15" height="2" fill="#8B4513"/>
                {/* Brush bristles */}
                <polygon points="135,47 135,51 140,50 140,48" fill="#86BC25"/>
              </motion.g>
            </motion.g>
          )}
        </motion.g>

        {/* Legs */}
        <rect x="38" y="80" width="8" height="20" rx="2" fill="#666"/>
        <rect x="54" y="80" width="8" height="20" rx="2" fill="#666"/>

        {/* Feet */}
        <ellipse cx="42" cy="102" rx="6" ry="3" fill="#333"/>
        <ellipse cx="58" cy="102" rx="6" ry="3" fill="#333"/>
      </svg>
    </motion.div>
  );
}
