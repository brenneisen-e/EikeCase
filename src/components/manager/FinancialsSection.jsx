
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { TrendingUp, Target, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import BarmeniaPrototypePreview from './BarmeniaPrototypePreview';
import ErgoPrototypePreview from './ErgoPrototypePreview';

export default function FinancialsSection() {
  const [animateChart, setAnimateChart] = useState(false);
  const [showProofBoxes, setShowProofBoxes] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateChart(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    {
      name: '2024/25',
      year: '2024/25',
      subtitle: '(Today)',
      value: 500,
      projects: 1,
      label: '#ProofOfValue',
      description: 'Full Scale Roll-Out',
      displayValue: '€0.5M',
      logos: ['barmenia']
    },
    {
      name: '2025/26',
      year: '2025/26',
      value: 1000,
      projects: 2,
      label: '#ValidateAtScale',
      description: 'Proof of Value',
      displayValue: '€1.0M',
      logos: ['ergo']
    },
    {
      name: '2026/27',
      year: '2026/27',
      value: 1500,
      projects: 3,
      label: '#ReplicateAcrossClients',
      description: 'Banking expansion',
      displayValue: '€1.5M',
      logos: ['commerzbank', 'ubs']
    },
    {
      name: '2027/28',
      year: '2027/28',
      value: 2500,
      projects: 5,
      label: '#ScaleHorizontally',
      description: 'Cross-industry',
      displayValue: '€2.5M',
      logos: ['weitere']
    },
    {
      name: '2028/29',
      year: '2028/29',
      value: 4500,
      projects: 7,
      label: '#AccelerateWithAI',
      description: 'AI integration',
      displayValue: '€4.5M',
      logos: ['weitere']
    }
  ];

  const getLogoUrl = (logo) => {
    switch (logo) {
      case 'barmenia':
        return 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/8d826aa3b_BarmeniaGothaer_Logo_zweizeilig_CMYK-White-on-DarkBlue.png';
      case 'ergo':
        return 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/91d3c532b_ergo-logo-700x513.jpg';
      case 'commerzbank':
        return 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/b9e5e3720_commezbank.png';
      case 'ubs':
        return 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/73d8350dd_ubs-logo-1-4233947813.png';
      default:
        return null;
    }
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;

    return (
      <g>
        <circle 
          cx={cx} 
          cy={cy} 
          r={16} 
          fill={showProofBoxes ? "#9CA3AF" : "#86BC25"} 
          stroke="#ffffff" 
          strokeWidth={5} 
        />
        
        <text x={cx} y={cy - 90} textAnchor="middle" fontSize="28" fill={showProofBoxes ? "#6B7280" : "#003b6e"} fontWeight="700">
          {payload.displayValue}
        </text>
        
        <text x={cx} y={cy - 55} textAnchor="middle" fontSize="22" fill={showProofBoxes ? "#9CA3AF" : "#86BC25"} fontWeight="700">
          {payload.label}
        </text>
        
        <text x={cx} y={cy - 30} textAnchor="middle" fontSize="18" fill="#666" fontWeight="500">
          {payload.description}
        </text>
      </g>
    );
  };

  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    const tickData = data[payload.index];

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={30} textAnchor="middle" fill="#333" fontSize={24} fontWeight="600">
          {tickData.year}
        </text>
        {tickData.subtitle && (
          <text x={0} y={30} dy={30} textAnchor="middle" fill="#666" fontSize={20}>
            {tickData.subtitle}
          </text>
        )}
      </g>
    );
  };

  return (
    <div id="financials" className="h-screen w-full bg-gradient-to-br from-white to-gray-100 flex flex-col px-20 py-8">
      <motion.h1
        className="text-4xl font-normal text-black text-left mb-2"
        style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        From first success to scalable growth
      </motion.h1>

      <motion.h2
        className="text-2xl text-gray-600 text-left mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Proven PoCs such as Barmenia Gothaer and ERGO demonstrate tangible financial impact and a clear path to scale.
      </motion.h2>

      {/* Collapsible Two Proof of Concept Boxes */}
      <AnimatePresence mode="wait">
        {showProofBoxes ? (
          <motion.div
            key="proof-boxes"
            className="grid grid-cols-2 gap-6 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Barmenia Gothaer Box */}
            <motion.div
              className="bg-[#E6F4EA] rounded-2xl shadow-md overflow-hidden relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="h-2 bg-[#046A38]"></div>
              <div className="p-6">
                <div className="mb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-bold text-[#046A38]">Full Scale Roll-Out</h3>
                    <motion.div
                      className="bg-[#046A38] text-white rounded-lg px-3 py-1.5 text-center flex items-center gap-2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                    >
                      <span className="text-xs opacity-90">NSR:</span>
                      <span className="text-lg font-bold">€300K</span>
                    </motion.div>
                  </div>
                  <p className="text-lg text-gray-600 mb-2">Contract migration tool from prototype to enterprise roll-out</p>
                </div>

                <div className="flex justify-end mb-2">
                  <motion.img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/8d826aa3b_BarmeniaGothaer_Logo_zweizeilig_CMYK-White-on-DarkBlue.png"
                    alt="Barmenia Gothaer"
                    className="h-12 opacity-85"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                  />
                </div>

                <ul className="space-y-2 mb-4 text-lg text-gray-700">
                  <li>• Built contract migration tool: prototype → full production roll-out</li>
                  <li>• Actively used to support contract conversion for 1,000+ agencies</li>
                </ul>
                
                {/* Two Showcase Boxes */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Live Prototype Preview - 50% zoom */}
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-sm font-semibold text-[#046A38] mb-2 text-center">Interactive Prototype</p>
                    <div className="bg-gray-100 rounded overflow-hidden border border-gray-300 aspect-video relative">
                      <div style={{ transform: 'scale(0.5)', transformOrigin: '0 0', width: '200%', height: '200%' }}>
                        <BarmeniaPrototypePreview />
                      </div>
                    </div>
                  </div>

                  {/* Final Product Screenshot */}
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-sm font-semibold text-[#046A38] mb-2 text-center">Final Product</p>
                    <div className="bg-gray-100 rounded overflow-hidden border border-gray-300 aspect-video">
                      <img
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/94106e3a1_Picture1.png"
                        alt="Final Dashboard"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ERGO Box - Now with Interactive Prototype */}
            <motion.div
              className="bg-[#E6F4EA] rounded-2xl shadow-md overflow-hidden relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="h-2 bg-[#046A38]"></div>
              <div className="p-6">
                <div className="mb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-bold text-[#046A38]">Proof of Value</h3>
                    <motion.div
                      className="bg-[#046A38] text-white rounded-lg px-3 py-1.5 text-center flex items-center gap-2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                    >
                      <span className="text-xs opacity-90">NSR (each):</span>
                      <span className="text-lg font-bold">€50K</span>
                    </motion.div>
                  </div>
                  <p className="text-lg text-gray-600 mb-2">AI-driven prototype for steering transparency</p>
                </div>

                <div className="flex justify-end gap-2 mb-2">
                  <motion.img
                    src="https://upload.wikimedia.org/wikipedia/de/1/11/Ergo_Group_logo.svg"
                    alt="ERGO"
                    className="h-10 opacity-85 bg-white px-2 rounded"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                  />
                  <motion.img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Hansainvest-Logo.png"
                    alt="Hansainvest"
                    className="h-10 opacity-85 bg-white px-2 rounded"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                  />
                  <motion.img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Union_Investment.png"
                    alt="Union Investment"
                    className="h-10 opacity-85 bg-white px-2 rounded"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
                  />
                </div>

                <ul className="space-y-2 mb-4 text-lg text-gray-700">
                  <li>• 4-week prototype based on fragmented data</li>
                  <li>• Delivered tangible simulation use case without system rebuild</li>
                  <li>• Validated business value and ready for scale-up phase</li>
                </ul>

                {/* Two Showcase Boxes for ERGO */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Interactive Prototype - 50% zoom */}
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-sm font-semibold text-[#046A38] mb-2 text-center">Interactive Prototype</p>
                    <div className="bg-gray-100 rounded overflow-hidden border border-gray-300 aspect-video relative">
                      <div style={{ transform: 'scale(0.5)', transformOrigin: '0 0', width: '200%', height: '200%' }}>
                        <ErgoPrototypePreview />
                      </div>
                    </div>
                  </div>

                  {/* Working Model Visual */}
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-sm font-semibold text-[#046A38] mb-2 text-center">Delivered Result</p>
                    <div className="bg-gray-100 rounded overflow-hidden border border-gray-300 aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">✅</div>
                        <p className="text-xs text-gray-700 font-medium">Working simulation model</p>
                        <p className="text-xs text-gray-600">Proof of Value established</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Collapse Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowProofBoxes(!showProofBoxes)}
          className="flex items-center gap-2 px-4 py-2 bg-[#046A38] text-white rounded-lg hover:bg-[#035530] transition-colors"
        >
          {showProofBoxes ? (
            <>
              <ChevronUp className="w-5 h-5" />
              <span>Collapse PoCs</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5" />
              <span>Expand PoCs</span>
            </>
          )}
        </button>
      </div>

      {/* Chart and Summary Section - Dynamic Height */}
      <div className="flex-grow flex gap-6" style={{ height: showProofBoxes ? 'auto' : 'calc(100vh - 280px)' }}>
        {/* Interactive Chart */}
        <motion.div
          className={`bg-white rounded-xl shadow-lg p-6 flex flex-col ${showProofBoxes ? 'flex-1' : 'flex-[3]'}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">5-Year Growth Trajectory (Illustrative)</h3>
          <div className="w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 140, right: 200, left: 120, bottom: 80 }}>
                <ReferenceArea 
                  x1={data[0].name} 
                  x2={data[0].name} 
                  fill={showProofBoxes ? "#e5e7eb" : "#f3f4f6"} 
                  fillOpacity={0.6} 
                  ifOverflow="extendDomain" 
                />
                
                <XAxis 
                  dataKey="name" 
                  tick={<CustomXAxisTick />} 
                  axisLine={{ stroke: showProofBoxes ? '#9CA3AF' : '#333', strokeWidth: 2 }} 
                  tickLine={false} 
                  interval={0} 
                  height={80} 
                />

                <Tooltip
                  formatter={(value, name) => [name === 'value' ? `€${(value / 1000).toFixed(1)}M` : value, name === 'value' ? 'Managed Fees' : 'Projects']}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return `${label} - ${payload[0].payload.label}`;
                    }
                    return label;
                  }}
                  labelStyle={{ color: '#333', fontSize: '18px', fontWeight: 'bold' }}
                  itemStyle={{ fontSize: '16px' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: showProofBoxes ? '2px solid #9CA3AF' : '2px solid #86BC25', 
                    borderRadius: '8px', 
                    padding: '12px' 
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={showProofBoxes ? "#9CA3AF" : "#86BC25"}
                  strokeWidth={10}
                  dot={<CustomDot />}
                  activeDot={{ r: 18, stroke: showProofBoxes ? '#9CA3AF' : '#86BC25', strokeWidth: 6 }}
                  animationBegin={animateChart ? 0 : 10000}
                  animationDuration={2500}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Summary Box - Only visible when collapsed */}
        <AnimatePresence>
          {!showProofBoxes && (
            <motion.div
              className="bg-gradient-to-br from-[#A7E3B2] to-[#046A38] text-white rounded-xl shadow-xl p-6 flex flex-col justify-between overflow-y-auto"
              style={{ minWidth: '380px', maxWidth: '380px' }}
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Summary</h3>
                </div>

                <div className="space-y-4">
                  {/* Proof of Value */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-lg font-bold mb-3">Proof of Value</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>NSR:</span>
                        <span className="font-semibold">€50K</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Project Days:</span>
                        <span className="font-semibold">30 PT</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GPM:</span>
                        <span className="font-semibold">51%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold">4-6 weeks</span>
                      </div>
                    </div>
                  </div>

                  {/* Full Scale Roll-Out */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-lg font-bold mb-3">Full Scale Roll-Out</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>NSR:</span>
                        <span className="font-semibold">&gt;€300K</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Project Days:</span>
                        <span className="font-semibold">&gt;200 PT</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Team Size:</span>
                        <span className="font-semibold">2+ people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold">from 3 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
