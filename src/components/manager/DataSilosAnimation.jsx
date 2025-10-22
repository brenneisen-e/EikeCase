import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Database,
  HardDrive,
  FileSpreadsheet,
  Globe,
  Users,
  BarChart3,
  PieChart,
  FileText,
  CircleDot,
} from 'lucide-react';

export default function DataSilosVisualization() {
  // Expanded vertical spacing
  const boxes = {
    // Output Layer (top)
    excelReports: { x: 40, y: 15, w: 60, h: 45 },
    biDashboards: { x: 120, y: 15, w: 60, h: 45 },
    manualStatements: { x: 200, y: 15, w: 60, h: 45 },

    // Data Layer
    dataWarehouse: { x: 50, y: 95, w: 70, h: 50 },
    sqlDatabases: { x: 170, y: 95, w: 70, h: 50 },

    // Source Systems
    sapICM: { x: 30, y: 180, w: 60, h: 50 },
    salesforceCRM: { x: 105, y: 180, w: 60, h: 50 },
    excelTools: { x: 180, y: 180, w: 60, h: 50 },
    hrSystem: { x: 255, y: 180, w: 60, h: 50 },

    // Core Systems (bottom)
    policyAdmin: { x: 60, y: 265, w: 70, h: 55 },
    coreBanking: { x: 170, y: 265, w: 70, h: 55 },
  };

  const getAnchor = (box, side) => {
    switch (side) {
      case 'top':
        return { x: box.x + box.w / 2, y: box.y };
      case 'bottom':
        return { x: box.x + box.w / 2, y: box.y + box.h };
      case 'left':
        return { x: box.x, y: box.y + box.h / 2 };
      case 'right':
        return { x: box.x + box.w, y: box.y + box.h / 2 };
      default:
        return { x: box.x, y: box.y };
    }
  };

  const createOrthogonalPath = (from, to) => {
    const midY = (from.y + to.y) / 2;
    return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
  };

  const connections = [
    {
      from: getAnchor(boxes.policyAdmin, 'top'),
      to: getAnchor(boxes.sapICM, 'bottom'),
      type: 'working',
      isVertical: true,
    },
    {
      from: getAnchor(boxes.coreBanking, 'top'),
      to: getAnchor(boxes.salesforceCRM, 'bottom'),
      type: 'working',
      isVertical: true,
    },
    {
      from: getAnchor(boxes.dataWarehouse, 'top'),
      to: getAnchor(boxes.biDashboards, 'bottom'),
      type: 'working',
      isVertical: true,
    },
    {
      from: getAnchor(boxes.sapICM, 'top'),
      to: getAnchor(boxes.dataWarehouse, 'bottom'),
      type: 'weak',
      isVertical: true,
    },
    {
      from: getAnchor(boxes.excelTools, 'top'),
      to: getAnchor(boxes.sqlDatabases, 'bottom'),
      type: 'weak',
      isVertical: true,
    },
    {
      from: getAnchor(boxes.dataWarehouse, 'top'),
      to: getAnchor(boxes.excelReports, 'bottom'),
      type: 'weak',
      isVertical: true,
    },
    {
      from: getAnchor(boxes.sqlDatabases, 'top'),
      to: getAnchor(boxes.manualStatements, 'bottom'),
      type: 'weak',
      isVertical: true,
    },
    {
      from: getAnchor(boxes.salesforceCRM, 'top'),
      to: getAnchor(boxes.dataWarehouse, 'bottom'),
      type: 'blocked',
      isVertical: true,
    },
    {
      from: getAnchor(boxes.hrSystem, 'top'),
      to: getAnchor(boxes.sqlDatabases, 'bottom'),
      type: 'blocked',
      isVertical: true,
    },
    {
      from: getAnchor(boxes.dataWarehouse, 'right'),
      to: getAnchor(boxes.sqlDatabases, 'left'),
      type: 'blocked',
      isVertical: false,
    },
  ];

  return (
    <div className="w-full h-full bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
      <div className="relative" style={{ width: '380px', height: '380px' }}>
        <motion.div
          className="absolute inset-2 border-2 border-dashed border-[#046A38] rounded-xl"
          animate={{ opacity: [0.3, 0.6, 0.3, 0.6, 0.3] }}
          transition={{ duration: 4 }}
        />

        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            <marker id="arrowGreen" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <polygon points="0 0, 5 2.5, 0 5" fill="#10b981" />
            </marker>
          </defs>

          {connections.map((conn, i) => {
            const midX = (conn.from.x + conn.to.x) / 2;
            const midY = (conn.from.y + conn.to.y) / 2;
            const pathD = conn.isVertical ? createOrthogonalPath(conn.from, conn.to) : undefined;

            return (
              <g key={i}>
                {conn.isVertical ? (
                  <motion.path
                    d={pathD}
                    stroke={conn.type === 'working' ? '#10b981' : conn.type === 'weak' ? '#f97316' : '#ef4444'}
                    strokeWidth="1.5"
                    strokeDasharray={conn.type !== 'working' ? '3 3' : '0'}
                    fill="none"
                    markerEnd={conn.type === 'working' ? 'url(#arrowGreen)' : undefined}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                ) : (
                  <motion.line
                    x1={conn.from.x}
                    y1={conn.from.y}
                    x2={conn.to.x}
                    y2={conn.to.y}
                    stroke={conn.type === 'working' ? '#10b981' : conn.type === 'weak' ? '#f97316' : '#ef4444'}
                    strokeWidth="1.5"
                    strokeDasharray={conn.type !== 'working' ? '3 3' : '0'}
                    markerEnd={conn.type === 'working' ? 'url(#arrowGreen)' : undefined}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                )}

                {conn.type === 'blocked' && (
                  <>
                    <motion.circle
                      cx={midX}
                      cy={midY}
                      r="6"
                      fill="white"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
                    />
                    <motion.g
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.4, type: 'spring' }}
                    >
                      <line x1={midX - 3} y1={midY - 3} x2={midX + 3} y2={midY + 3} stroke="#ef4444" strokeWidth="1.5" />
                      <line x1={midX + 3} y1={midY - 3} x2={midX - 3} y2={midY + 3} stroke="#ef4444" strokeWidth="1.5" />
                    </motion.g>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {/* Output Layer */}
          {[
            { box: boxes.excelReports, Icon: BarChart3, label: 'Excel', delay: 0.1 },
            { box: boxes.biDashboards, Icon: PieChart, label: 'BI', delay: 0.15 },
            { box: boxes.manualStatements, Icon: FileText, label: 'Manual', delay: 0.2 },
          ].map(({ box, Icon, label, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: box.x, top: box.y }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay }}
            >
              <div
                className="p-2 bg-amber-50 border border-amber-400 rounded-lg flex flex-col items-center justify-center gap-1"
                style={{ width: box.w, height: box.h }}
              >
                <Icon size={18} className="text-amber-600" />
                <span className="text-[9px] text-gray-600">{label}</span>
              </div>
            </motion.div>
          ))}

          {/* Data Layer */}
          {[
            { box: boxes.dataWarehouse, Icon: HardDrive, label: 'DWH', delay: 0.3 },
            { box: boxes.sqlDatabases, Icon: CircleDot, label: 'SQL', delay: 0.35 },
          ].map(({ box, Icon, label, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: box.x, top: box.y }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay }}
            >
              <div
                className="p-2 bg-sky-50 border border-sky-400 rounded-lg flex flex-col items-center justify-center gap-1"
                style={{ width: box.w, height: box.h }}
              >
                <Icon size={20} className="text-sky-600" />
                <span className="text-[9px] text-gray-600">{label}</span>
              </div>
            </motion.div>
          ))}

          {/* Source Systems */}
          {[
            { box: boxes.sapICM, Icon: Server, label: 'SAP', delay: 0.4 },
            { box: boxes.salesforceCRM, Icon: Globe, label: 'CRM', delay: 0.45 },
            { box: boxes.excelTools, Icon: FileSpreadsheet, label: 'Excel', delay: 0.5 },
            { box: boxes.hrSystem, Icon: Users, label: 'HR', delay: 0.55 },
          ].map(({ box, Icon, label, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: box.x, top: box.y }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay }}
            >
              <div
                className="p-2 bg-gray-100 border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1"
                style={{ width: box.w, height: box.h }}
              >
                <Icon size={18} className="text-gray-600" />
                <span className="text-[9px] text-gray-600">{label}</span>
              </div>
            </motion.div>
          ))}

          {/* Core Systems */}
          {[
            { box: boxes.policyAdmin, Icon: Database, label: 'Policy', delay: 0.6 },
            { box: boxes.coreBanking, Icon: Database, label: 'Banking', delay: 0.65 },
          ].map(({ box, Icon, label, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: box.x, top: box.y }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay }}
            >
              <div
                className="p-2 bg-gray-200 border border-gray-400 rounded-lg flex flex-col items-center justify-center gap-1"
                style={{ width: box.w, height: box.h }}
              >
                <Icon size={22} className="text-gray-700" />
                <span className="text-[9px] text-gray-600">{label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}