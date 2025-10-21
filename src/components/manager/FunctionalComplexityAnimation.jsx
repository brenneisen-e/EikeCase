import React from 'react';
import { motion } from 'framer-motion';
import { Target, Calculator, FileText, Banknote, AlertTriangle } from 'lucide-react';

export default function FunctionalComplexityVisualization() {
  const boxes = {
    targetSetting: { x: 20, y: 40, w: 65, h: 100 },
    calculation: { x: 105, y: 40, w: 65, h: 100 },
    reconciliation: { x: 190, y: 40, w: 65, h: 100 },
    payout: { x: 275, y: 40, w: 65, h: 100 },
  };

  const getBottomCenter = (box) => ({ x: box.x + box.w / 2, y: box.y + box.h });

  const paths = [
    { id: 'path1', from: boxes.targetSetting, to: boxes.calculation, label: 'Excel', delay: 0.5 },
    { id: 'path2', from: boxes.calculation, to: boxes.reconciliation, label: 'SQL', delay: 1 },
    { id: 'path3', from: boxes.reconciliation, to: boxes.payout, label: 'Manual', delay: 1.5 },
  ];

  const warningPoints = [
    { x: boxes.targetSetting.x + boxes.targetSetting.w / 2, y: boxes.targetSetting.y + boxes.targetSetting.h + 40 },
    { x: boxes.calculation.x + boxes.calculation.w / 2, y: boxes.calculation.y + boxes.calculation.h + 40 },
    { x: boxes.reconciliation.x + boxes.reconciliation.w / 2, y: boxes.reconciliation.y + boxes.reconciliation.h + 40 },
  ];

  return (
    <div className="w-full h-full bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
      <div className="relative" style={{ width: '380px', height: '340px' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {paths.map((path, i) => {
            const from = getBottomCenter(path.from);
            const to = getBottomCenter(path.to);
            const midX = (from.x + to.x) / 2;
            const dropY = from.y + 50;

            return (
              <g key={i}>
                <motion.path
                  d={`M ${from.x} ${from.y} L ${from.x} ${dropY} L ${to.x} ${dropY} L ${to.x} ${to.y}`}
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: path.delay }}
                />
                <motion.text
                  x={midX}
                  y={dropY - 5}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#f97316"
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: path.delay + 0.3 }}
                >
                  {path.label}
                </motion.text>
              </g>
            );
          })}
        </svg>

        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {[
            { box: boxes.targetSetting, Icon: Target, label: 'Target\nSetting', color: '#3b82f6', delay: 0 },
            { box: boxes.calculation, Icon: Calculator, label: 'Calculation\nEngine', color: '#8b5cf6', delay: 0.2 },
            { box: boxes.reconciliation, Icon: FileText, label: 'Reconciliation', color: '#ec4899', delay: 0.4 },
            { box: boxes.payout, Icon: Banknote, label: 'Payout\nProcess', color: '#10b981', delay: 0.6 },
          ].map(({ box, Icon, label, color, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: box.x, top: box.y }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay }}
            >
              <div
                className="rounded-lg border-2 shadow-md flex flex-col items-center justify-center gap-2 p-2"
                style={{ width: box.w, height: box.h, backgroundColor: `${color}10`, borderColor: color }}
              >
                <Icon size={28} style={{ color }} />
                <span className="text-[9px] font-semibold text-center whitespace-pre-line" style={{ color }}>
                  {label}
                </span>
              </div>
            </motion.div>
          ))}

          {warningPoints.map((point, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: point.x - 12, top: point.y - 12 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.3, type: 'spring' }}
            >
              <div className="w-6 h-6 bg-amber-100 border-2 border-amber-500 rounded-full flex items-center justify-center">
                <AlertTriangle size={14} className="text-amber-600" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-50 border border-red-300 rounded-lg px-3 py-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <p className="text-[9px] text-red-700 font-semibold text-center">
            Manual handoffs slow down compensation cycles
          </p>
        </motion.div>
      </div>
    </div>
  );
}