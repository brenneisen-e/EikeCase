
import React from 'react';
import Slide from './Slide';
import { motion } from 'framer-motion';

export default function WhySlide() {
  return (
    <Slide id="why" className="bg-gray-50" pageNumber="3">
      <div className="w-full max-w-7xl mx-auto px-8">
        {/* Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-black mb-4">
            Why Business Impact Steering is essential in PMI & Transformation
          </h1>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Market Dynamics */}
          <motion.div 
            className="bg-white rounded-lg p-8 shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-black mb-2">MARKET DYNAMICS</h2>
            <p className="text-sm italic text-gray-600 mb-6">Structural pressure reshapes FSI</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-black">Margin erosion:</p>
                  <p className="text-gray-700 text-sm">volatile rates, inflation and competition erode profitability, forcing cost synergies</p>
                  <div className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-600 mt-1 inline-block">
                    "systematic" / external
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-black">Regulatory & digital disruption:</p>
                  <p className="text-gray-700 text-sm">Basel III / IV, Solvency II, IDD and digital transformation demand heavy investments</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-black">Geopolitical uncertainty:</p>
                  <p className="text-gray-700 text-sm">Ongoing wars, sanctions, and global supply chain risk create volatility in capital markets</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-black">Consolidation wave:</p>
                  <p className="text-gray-700 text-sm">UBS-CS, Sparkassen/VB mergers, &gt;550 European insurance and &gt;55 fintech/Insurtech deals</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Client Challenges */}
          <motion.div 
            className="bg-white rounded-lg p-8 shadow-sm"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-black mb-2">CLIENT CHALLENGES</h2>
            <p className="text-sm italic text-gray-600 mb-6">Steering complexity increases</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-[#FFA500] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-black">Fragmented structures:</p>
                  <p className="text-gray-700 text-sm">Multiple incentive, product or operating models coexist after merger or after transformation</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-[#FFA500] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-black">Uncertain impact:</p>
                  <p className="text-gray-700 text-sm">lack of fact-based insights into cost, revenue and workforce effects</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-[#FFA500] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-black">Compliance under pressure:</p>
                  <p className="text-gray-700 text-sm">steering models must balance transformation speed with regulatory requirements</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-[#FFA500] p-4 rounded">
                <p className="font-semibold text-black">Value at risk:</p>
                <p className="text-gray-700 text-sm">synergy and transformation targets remain theoretical without structural steering</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Statement */}
        <motion.div 
          className="bg-gradient-to-r from-[#86bc25] to-[#5a8019] text-white rounded-lg p-6 text-center shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold">
            Clients require fact-based steering to ensure consolidation and transformation efforts translate into tangible value.
          </h3>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <span className="text-sm text-gray-600">External Factors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FFA500] rounded-full"></div>
            <span className="text-sm text-gray-600">Internal Factors</span>
          </div>
        </div>

        <div className="text-right mt-4">
          <p className="text-xs text-gray-500">Deloitte 2025</p>
          <p className="text-xs text-gray-400">3</p>
        </div>
      </div>
    </Slide>
  );
}
