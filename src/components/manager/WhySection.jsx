import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Shield, GitMerge, Layers, DollarSign, ShieldAlert, AlertTriangle, Clock, Brain, TrendingUp } from 'lucide-react';
import InteractiveDiagram from './InteractiveDiagram';

export default function WhySection() {
  return (
    <section id="why" className="h-screen w-full bg-white flex flex-col px-20 py-12 overflow-hidden">
      <motion.h1
        className="text-4xl font-normal text-black text-left mb-8"
        style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>

        Why: Compensation logic harmonization is a recurring challenge
      </motion.h1>

      <div className="flex gap-8 w-full flex-grow">
        {/* Left Column - Diagram + Info Box */}
        <div className="flex-[2] flex flex-col gap-6">
          {/* Interactive Diagram */}
          <motion.div
            className="bg-white rounded-lg shadow-lg flex-grow overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}>

            <InteractiveDiagram />
          </motion.div>

          {/* Info Box with Alert */}
          <motion.div
            className="bg-orange-50 border-l-4 border-[#FFA500] rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <AlertTriangle className="w-8 h-8 text-[#FFA500]" strokeWidth={2.5} />
              </div>
              <p className="text-[20px] leading-relaxed text-gray-800">
                The current data and steering architecture is fragmented across multiple systems and manual interfaces.
                Data flows are inconsistent, updates are cut-off-based, and key business information cannot be accessed
                or combined in real time.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Scenario Boxes */}
        <motion.div
          className="flex-1 flex flex-col gap-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}>

          <h2 className="text-2xl font-bold text-black mb-2">
            When fragmented architecture prevents real-time steering
          </h2>

          {/* Scenario 1: Steering transparency */}
          <motion.div
            className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#046A38] flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#046A38]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-[#046A38]" />
              </div>
              <h3 className="text-xl font-bold text-[#046A38]">
                Steering transparency (VST)
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Steering decisions are based on monthly cut-off data.
              Real-time transparency and trend monitoring are not possible.
            </p>
          </motion.div>

          {/* Scenario 2: Simulation & calibration */}
          <motion.div
            className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#0070c0] flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#0070c0]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#0070c0]" />
              </div>
              <h3 className="text-xl font-bold text-[#0070c0]">
                Simulation & calibration
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Changing steering or compensation parameters requires manual data preparation and re-runs.
              Analyses take days instead of minutes.
            </p>
          </motion.div>

          {/* Scenario 3: Predictive & AI analytics */}
          <motion.div
            className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#86BC25] flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#86BC25]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-[#86BC25]" />
              </div>
              <h3 className="text-xl font-bold text-[#86BC25]">
                Predictive & AI analytics
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Advanced analytics cannot be operationalised because data is fragmented and inconsistent across systems.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Legend at bottom */}
      <div className="flex justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black rounded-full"></div>
          <span className="text-base text-gray-600">External Forces</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#FFA500] rounded-full"></div>
          <span className="text-base text-gray-600">Internal Forces</span>
        </div>
      </div>
    </section>);

}