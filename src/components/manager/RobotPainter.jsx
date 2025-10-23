import React from 'react';
import { motion } from 'framer-motion';

export default function RobotPainter({ position, isPainting }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        width: '80px',
        height: '80px'
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

        {/* Arms */}
        <motion.rect
          x="20" y="50" width="12" height="4" rx="2"
          fill="#E0E0E0" stroke="#666" strokeWidth="1"
          animate={{ rotate: isPainting ? [-10, 10, -10] : 0 }}
          transition={{ duration: 0.3, repeat: isPainting ? Infinity : 0 }}
          style={{ originX: '100%', originY: '50%' }}
        />
        <motion.rect
          x="68" y="50" width="12" height="4" rx="2"
          fill="#E0E0E0" stroke="#666" strokeWidth="1"
          animate={{ rotate: isPainting ? [10, -10, 10] : 0 }}
          transition={{ duration: 0.3, repeat: isPainting ? Infinity : 0 }}
          style={{ originX: '0%', originY: '50%' }}
        />

        {/* Paintbrush in right hand */}
        {isPainting && (
          <motion.g
            animate={{ rotate: [0, 20, 0] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            style={{ originX: '82px', originY: '52px' }}
          >
            {/* Brush handle */}
            <rect x="82" y="48" width="15" height="2" fill="#8B4513"/>
            {/* Brush bristles */}
            <polygon points="97,47 97,51 102,50 102,48" fill="#86BC25"/>
          </motion.g>
        )}

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
