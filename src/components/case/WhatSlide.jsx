import React from 'react';
import Slide from './Slide';
import { motion } from 'framer-motion';

const steps = [
    { num: 1, title: 'Capture', text: 'Record and structure existing commission logics', impact: '→ Reduce 100+ rules to structured model' },
    { num: 2, title: 'Calibration', text: 'Align on balanced target logic', impact: '→ 60% reduction in advisor disadvantages' },
    { num: 3, title: 'Prototyping', text: 'Build prototype & run scenarios', impact: '→ 6 weeks to working prototype' },
    { num: 4, title: 'Implementation', text: 'Transfer logic into target systems', impact: '→ 50% faster through automation' },
    { num: 5, title: 'Transition', text: 'Support rollout with tools & dashboards', impact: '→ 95% advisor acceptance' },
];

export default function WhatSlide() {
  return (
    <Slide id="what" className="bg-gray-100" pageNumber="5">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 text-center">
            <p className="text-[#86BC25] font-semibold text-sm mb-2">SLIDE 4</p>
            <h2 className="text-3xl lg:text-4xl font-light text-black">
                <strong className="font-semibold text-[#86BC25]">Solution</strong> / Offering
            </h2>
        </div>

        <div className="p-8 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-center text-black mb-8">Compensation Logic Harmonization – Deloitte E2E Framework</h3>
            <div className="grid grid-cols-5 gap-4">
                {steps.map((step, index) => (
                    <motion.div 
                        key={step.num}
                        className="text-center p-4 bg-gray-50 rounded-lg transition-transform duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="w-8 h-8 bg-[#86BC25] text-white rounded-full leading-8 font-semibold mx-auto mb-3 text-sm">{step.num}</div>
                        <h4 className="text-black font-semibold text-sm mb-2">{step.title}</h4>
                        <p className="text-gray-600 text-xs mb-2 leading-tight">{step.text}</p>
                        <p className="text-xs font-semibold text-gray-800 leading-tight">{step.impact}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </Slide>
  );
}