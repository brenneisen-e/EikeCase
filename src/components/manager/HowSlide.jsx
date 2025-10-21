import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Wrench, Code, BarChart3, FileSignature, X } from 'lucide-react';

const projectSteps = [
  {
    id: 1,
    title: 'Logic Capture',
    icon: Search,
    description: 'Analyze existing compensation structures and capture all logic variations'
  },
  {
    id: 2,
    title: 'Prototype Build',
    icon: Code,
    description: 'Create interactive prototypes for testing and validation',
    hasDemo: true
  },
  {
    id: 3,
    title: 'Productive Tool Development',
    icon: Wrench,
    description: 'Build production-ready systems (SRC, Power BI)',
    hasScreenshot: true
  },
  {
    id: 4,
    title: 'Simulation & Calibration',
    icon: BarChart3,
    description: 'Run scenarios to optimize income vs. cost balance',
    hasAnimation: true
  },
  {
    id: 5,
    title: 'Contract Transition',
    icon: FileSignature,
    description: 'Support smooth transition to new compensation model'
  }
];

export default function HowSlide() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [showScreenshot, setShowScreenshot] = useState(false);

  return (
    <div className="h-full w-full bg-gradient-to-br from-white to-gray-100 p-8">
      <motion.h1 
        className="text-4xl font-bold text-[#003b6e] text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        HOW – Project Approach & Methodology
      </motion.h1>

      <motion.h2 
        className="text-2xl text-gray-700 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        End-to-End Project Approach
      </motion.h2>

      {/* Horizontal Flow */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-12">
        {projectSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div 
              className="text-center cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedStep(step)}
            >
              <div className="w-20 h-20 bg-[#86BC25] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-[#003b6e] text-sm mb-2">{step.title}</h3>
              <p className="text-xs text-gray-600 max-w-32">{step.description}</p>
              
              {/* Special Interactive Elements */}
              {step.hasDemo && (
                <button
                  className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={(e) => { e.stopPropagation(); setShowDemo(true); }}
                >
                  View Demo
                </button>
              )}
              
              {step.hasScreenshot && (
                <button
                  className="mt-2 text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                  onClick={(e) => { e.stopPropagation(); setShowScreenshot(true); }}
                >
                  View System
                </button>
              )}
            </motion.div>
            
            {index < projectSteps.length - 1 && (
              <div className="text-3xl text-[#86BC25] font-bold">→</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom Information */}
      <motion.div 
        className="text-center bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-lg font-semibold text-gray-800">
          <strong>Typical project duration:</strong> 6–12 months, team of 3–4 consultants
        </p>
      </motion.div>

      {/* Demo Modal */}
      {showDemo && (
        <motion.div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-5/6 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Interactive Prototype Demo</h3>
              <button onClick={() => setShowDemo(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="w-full h-96 border">
              <iframe
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/7ac572bcd_Case.html"
                className="w-full h-full"
                title="Prototype Demo"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Screenshot Modal */}
      {showScreenshot && (
        <motion.div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-lg p-6 max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Production System Screenshot</h3>
              <button onClick={() => setShowScreenshot(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/94106e3a1_Picture1.png"
              alt="Production System"
              className="w-full rounded-lg"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}