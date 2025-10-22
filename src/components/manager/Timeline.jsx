import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const milestones = [
  {
    name: 'Bank Career',
    year: '2010-2022',
    description: 'Started career in banking sector, working on financial systems and digital transformation.',
    logo: '🏦'
  },
  {
    name: 'Deloitte Entry',
    year: '3 years ago',
    description: 'Joined Deloitte as consultant, focusing on business transformation and change management.',
    logo: '💼'
  },
  {
    name: 'Luxembourg',
    year: '2022',
    description: 'Led transformation project for financial institution in Luxembourg.',
    logo: '🇱🇺'
  },
  {
    name: 'ERGO',
    year: '2023',
    description: 'Business continuity management project for ERGO insurance group.',
    logo: '🛡️'
  },
  {
    name: 'Barmenia-Gothaer',
    year: '2023-Now',
    description: 'Current project focusing on BCM transformation and digitalization.',
    logo: '🚀'
  },
];

export default function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-bold text-[#003b6e] mb-4 text-center">My Journey</h3>

      {/* Mini boxes view */}
      <div className="flex gap-2 justify-between">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className="flex-1 bg-white rounded-lg shadow-md p-2 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#86BC25]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            onClick={() => toggleExpand(index)}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{milestone.logo}</div>
              <p className="font-bold text-[#003b6e] text-xs mb-1">{milestone.name}</p>
              <p className="text-[10px] text-gray-500">{milestone.year}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded description */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="bg-white rounded-lg shadow-lg p-4 border-2 border-[#86BC25] overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{milestones[expandedIndex].logo}</span>
                  <div>
                    <h4 className="font-bold text-[#003b6e]">{milestones[expandedIndex].name}</h4>
                    <p className="text-sm text-gray-500">{milestones[expandedIndex].year}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{milestones[expandedIndex].description}</p>
              </div>
              <button
                onClick={() => setExpandedIndex(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}