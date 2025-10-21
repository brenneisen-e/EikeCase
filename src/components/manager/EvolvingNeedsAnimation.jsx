import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Smartphone, ShoppingCart, TrendingUp, Zap, Clock, AlertCircle } from 'lucide-react';

export default function EvolvingBusinessNeedsVisualization() {
  const businessNeeds = [
    { Icon: Rocket, label: 'New Products', color: '#3b82f6', delay: 0 },
    { Icon: Smartphone, label: 'Digital Channels', color: '#8b5cf6', delay: 0.2 },
    { Icon: ShoppingCart, label: 'E-Commerce', color: '#ec4899', delay: 0.4 },
    { Icon: TrendingUp, label: 'Market Trends', color: '#f59e0b', delay: 0.6 },
  ];

  return (
    <div className="w-full h-full bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
      <div className="relative flex items-center justify-center gap-4" style={{ width: '100%', height: '100%', maxWidth: '380px', maxHeight: '340px' }}>
        {/* Left side: Fast-moving business demands */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <h4 className="text-[10px] font-bold text-gray-700 text-center mb-2">Business Demands</h4>
          {businessNeeds.map(({ Icon, label, color, delay }, i) => (
            <motion.div
              key={i}
              className="w-full"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay, type: 'spring' }}
            >
              <div
                className="flex items-center gap-2 p-2 rounded-lg border-2"
                style={{ backgroundColor: `${color}10`, borderColor: color }}
              >
                <Icon size={20} style={{ color }} />
                <span className="text-[9px] font-semibold" style={{ color }}>
                  {label}
                </span>
                <Zap size={14} className="ml-auto text-amber-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center: Speed Gap */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <motion.div
            className="w-16 h-16 bg-red-100 border-2 border-red-400 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              borderColor: ['#f87171', '#ef4444', '#f87171'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle size={32} className="text-red-600" />
          </motion.div>
          <p className="text-[9px] font-bold text-red-600 text-center px-2">
            Speed<br/>Gap
          </p>
          <motion.div
            className="flex items-center gap-1 bg-amber-50 border border-amber-300 rounded px-2 py-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Clock size={12} className="text-amber-600" />
            <span className="text-[8px] text-amber-700 font-medium">Months</span>
          </motion.div>
        </div>

        {/* Right side: Legacy systems */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <h4 className="text-[10px] font-bold text-gray-700 text-center mb-2">Legacy Systems</h4>
          <motion.div
            className="w-full bg-gray-100 border-2 border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center gap-3"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-[9px] text-gray-600 text-center font-medium">
              Quarterly<br/>Updates
            </p>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}