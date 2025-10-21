import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, TrendingUp } from 'lucide-react';

const careerPath = [
  { title: 'Consultant', active: false, completed: true },
  { title: 'Senior Consultant', active: false, completed: true },
  { title: 'Acting Manager', active: true, completed: false },
  { title: 'Manager', active: false, completed: false, target: true }
];

export default function SummarySlide() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-[#003b6e] to-[#0070c0] p-8 text-white">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        SUMMARY – Personal Positioning
      </motion.h1>

      <div className="max-w-6xl mx-auto">
        {/* Content Blocks */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-[#86BC25]" />
              <h3 className="text-xl font-bold">Case</h3>
            </div>
            <p>
              <strong>Compensation Logic Harmonization</strong><br/>
              → structured, repeatable, high-demand offering
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-[#86BC25]" />
              <h3 className="text-xl font-bold">Methodology</h3>
            </div>
            <p>
              <strong>Capture → Calibration → Prototype → Implementation → Transition</strong>
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-[#86BC25]" />
              <h3 className="text-xl font-bold">My Role</h3>
            </div>
            <p>
              Already acting as manager:<br/>
              team coordination, internal initiatives, project leadership
            </p>
          </motion.div>
        </div>

        {/* Career Path Visualization */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Career Progression</h3>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/30"></div>
            <motion.div 
              className="absolute top-1/2 left-0 h-1 bg-[#86BC25]"
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 2, delay: 1 }}
            />
            
            <div className="flex justify-between relative z-10">
              {careerPath.map((step, index) => (
                <motion.div 
                  key={step.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.2 }}
                >
                  <div className={`w-6 h-6 rounded-full mx-auto mb-3 ${
                    step.completed ? 'bg-[#86BC25]' :
                    step.active ? 'bg-yellow-400 animate-pulse' :
                    step.target ? 'bg-white border-2 border-[#86BC25]' :
                    'bg-white/50'
                  }`}></div>
                  <h4 className={`font-bold ${
                    step.target ? 'text-[#86BC25] text-lg' : ''
                  }`}>{step.title}</h4>
                  {step.target && (
                    <div className="mt-2 text-[#86BC25] text-sm font-bold">TARGET</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div 
          className="text-center bg-gradient-to-r from-[#86BC25] to-[#5a8019] rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready for the Next Step</h3>
          <p className="text-xl">
            "With <strong>Compensation Logic Harmonization</strong> as a concrete case and my proven methodology,<br/>
            I am ready to take responsibility as <strong>Manager at Deloitte</strong>."
          </p>
        </motion.div>
      </div>
    </div>
  );
}