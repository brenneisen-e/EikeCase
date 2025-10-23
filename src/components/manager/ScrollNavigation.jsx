import React from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'start', name: 'Start' },
  { id: 'who', name: 'Who' },
  { id: 'challenge', name: 'Challenge' },
  { id: 'how', name: 'How' },
  { id: 'financials', name: 'Financials' },
  { id: 'summary', name: 'Summary' }
];

export default function ScrollNavigation({ activeSection }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-3">
      {sections.map((section) => (
        <motion.button
          key={section.id}
          className={`w-4 h-4 rounded-full transition-all group relative ${
            activeSection === section.id 
              ? 'bg-[#86BC25] scale-125' 
              : 'bg-gray-400 hover:bg-gray-600'
          }`}
          onClick={() => scrollToSection(section.id)}
          whileHover={{ scale: 1.2 }}
        >
          <span className="absolute right-full mr-3 px-2 py-1 bg-[#003b6e] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {section.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}