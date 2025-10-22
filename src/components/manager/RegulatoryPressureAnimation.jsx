import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function RegulatoryPressureVisualization() {
  return (
    <div className="w-full h-full bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
      <div className="relative flex items-center justify-center" style={{ width: '380px', height: '340px' }}>
        {/* Data streams (left side) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 w-[28%]">
          {[
            { label: 'Calc', delay: 0 },
            { label: 'Docs', delay: 0.2 },
            { label: 'Evidence', delay: 0.4 },
            { label: 'Audit', delay: 0.6 },
          ].map((stream, i) => (
            <div key={i} className="relative h-3">
              <motion.div
                className="absolute left-0 h-full rounded"
                style={{
                  background: 'linear-gradient(to right, #7dd3fc, #0ea5e9)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: ['0%', '100%'] }}
                transition={{
                  delay: stream.delay,
                  duration: 2,
                }}
              />
              <span className="absolute -left-1 -top-5 text-[10px] text-gray-600">{stream.label}</span>
            </div>
          ))}
        </div>

        {/* Compliance Gate (center) */}
        <motion.div
          className="relative z-10 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-300 shadow-md"
          style={{ width: '100px', height: '140px' }}
          animate={{
            boxShadow: [
              '0 4px 6px -1px rgba(4, 106, 56, 0.1)',
              '0 4px 6px -1px rgba(4, 106, 56, 0.3)',
              '0 4px 6px -1px rgba(4, 106, 56, 0.1)',
            ],
          }}
          transition={{ duration: 2.5 }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <ShieldCheck size={36} className="text-[#046A38]" />
            <div className="text-center space-y-1">
              <p className="text-[11px] font-bold text-gray-800">BaFin</p>
              <p className="text-[9px] text-gray-600">IDD/MiFID II</p>
              <p className="text-[9px] text-gray-600">Audit</p>
            </div>
            <motion.div
              className="absolute -top-2 -right-2"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.1, 1] }}
              transition={{ delay: 1.5, type: 'spring' }}
            >
              <CheckCircle2 size={18} className="text-[#046A38] bg-white rounded-full" />
            </motion.div>
          </div>
        </motion.div>

        {/* Approved flow (right side) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 w-[28%]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative h-3">
              {i === 0 ? (
                <motion.div
                  className="absolute left-0 h-full rounded"
                  initial={{ width: '0%', backgroundColor: '#7dd3fc' }}
                  animate={{
                    width: ['0%', '0%', '100%'],
                    backgroundColor: ['#7dd3fc', '#046A38', '#046A38'],
                  }}
                  transition={{
                    delay: 2,
                    duration: 1.5,
                    times: [0, 0.4, 1],
                  }}
                />
              ) : (
                <motion.div
                  className="absolute left-0 h-full bg-gray-300 rounded opacity-30"
                  style={{ width: '25%' }}
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 1.5 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Delay indicator */}
        <div className="absolute right-2 bottom-10 flex items-center gap-1">
          <Clock size={14} className="text-red-500" />
          <span className="text-[10px] text-red-600 font-medium">2-4w delay</span>
        </div>

        {/* Label */}
        <div className="absolute right-4 top-8">
          <span className="text-[10px] text-gray-500 italic">25% ready</span>
        </div>
      </div>
    </div>
  );
}