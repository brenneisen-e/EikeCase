import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, Award, CheckCircle2, ArrowRight, Compass, Code, MessageSquare, DollarSign } from 'lucide-react';

export default function SummarySection() {
  const coreCompetencies = [
    {
      icon: Compass,
      emoji: '🧭',
      title: 'Domain Expertise',
      headline: 'I know how to apply it.',
      description: 'I understand steering, simulation and compensation logic – and translate business problems into data-driven prototypes.',
      color: '#046A38'
    },
    {
      icon: Code,
      emoji: '💻',
      title: 'Technology Mastery',
      headline: 'I know how to build it.',
      description: 'I design and deliver AI-driven prototypes that make complex data architectures visible and interactive within weeks.',
      color: '#0070c0'
    },
    {
      icon: MessageSquare,
      emoji: '💬',
      title: 'Sales & Proof of Concept',
      headline: 'I know how to sell it.',
      description: 'I use prototypes in proposals and workshops to make ideas tangible – creating immediate client buy-in and a validated Proof of Value.',
      color: '#86BC25'
    },
    {
      icon: DollarSign,
      emoji: '💰',
      title: 'Business Impact & Scaling',
      headline: 'I know how to monetise it.',
      description: 'Each prototype opens a pipeline for follow-up projects – from PoV to multi-client rollouts and scalable transformation revenue.',
      color: '#FFA500'
    }
  ];

  return (
    <section id="summary" className="h-screen w-full bg-gradient-to-br from-white to-gray-100 flex flex-col px-20 py-12 overflow-hidden">
      {/* Title Section */}
      <motion.h1
        className="text-4xl font-normal text-black text-left mb-2"
        style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Breaking complexity starts with me
      </motion.h1>

      <motion.h2
        className="text-2xl text-gray-600 text-left mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        From PowerPoint to AI-driven prototypes that turn ideas into impact.
      </motion.h2>

      {/* 4 Competency Pillars */}
      <div className="grid grid-cols-4 gap-6 mb-8 flex-grow">
        {coreCompetencies.map((competency, index) => {
          const Icon = competency.icon;
          return (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start relative"
              style={{ borderTop: `6px solid ${competency.color}` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.15 }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${competency.color}20` }}
              >
                <span className="text-3xl">{competency.emoji}</span>
              </div>

              <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}>
                {competency.title}
              </h3>

              <h4 className="text-lg font-semibold mb-3" style={{ color: competency.color, fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}>
                {competency.headline}
              </h4>

              <p className="text-base text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}>
                {competency.description}
              </p>

              {/* Green Checkmark at bottom center */}
              <motion.div 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.15, type: 'spring', stiffness: 200 }}
              >
                <div className="w-10 h-10 bg-[#86BC25] rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Career Progression & Closing */}
      <motion.div 
        className="bg-white rounded-xl p-8 shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-black text-center mb-8">Career Progression</h3>
        <div className="flex justify-center items-center gap-6 mb-8">
          <div className="bg-gray-200 text-gray-700 rounded-lg px-6 py-4 text-center font-bold text-lg">
            Consultant
          </div>
          <ArrowRight className="text-gray-400 w-8 h-8" />
          <div className="bg-gray-300 text-gray-700 rounded-lg px-6 py-4 text-center font-bold text-lg">
            Senior Consultant
          </div>
          <ArrowRight className="text-gray-400 w-8 h-8" />
          <div className="bg-[#86BC25] text-white rounded-lg px-6 py-4 text-center font-bold text-lg relative">
            Acting Manager
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <ArrowRight className="text-[#86BC25] w-8 h-8" />
          <div className="bg-[#003b6e] text-white rounded-lg px-6 py-4 text-center font-bold text-lg relative">
            Manager
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg -z-10"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Closing Statement */}
        <div className="bg-gradient-to-r from-[#046A38] to-[#1B8F5C] rounded-xl p-8 text-center shadow-lg">
          <h4 className="text-2xl font-bold mb-4 text-white">Ready for the Next Step</h4>
          <p className="text-xl font-semibold text-white leading-relaxed">
            I connect business logic, data, and technology – and turn them into fast, scalable impact for Deloitte and our clients.<br/>
            <strong className="text-[#86BC25]">I am ready to take responsibility as Manager at Deloitte.</strong>
          </p>
        </div>
      </motion.div>
    </section>
  );
}