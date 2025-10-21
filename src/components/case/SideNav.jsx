import React from 'react';
import { motion } from 'framer-motion';

const SideNav = ({ sections, activeSection }) => {
  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionLabels = {
    'home': 'Home',
    'who': 'Who',
    'journey': 'Journey', 
    'why': 'Why',
    'what': 'What',
    'financials': 'Financials',
    'vision': 'Vision'
  };

  const progressSections = ['who', 'why', 'what', 'how', 'financials'];
  const currentIndex = progressSections.indexOf(activeSection);
  const progressPercentage = currentIndex >= 0 ? ((currentIndex + 1) / progressSections.length) * 100 : 0;

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      {/* Progress Bar */}
      <div className="mb-8 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="text-xs font-semibold text-gray-600 mb-3">PROGRESS</div>
        <div className="w-32 bg-gray-200 rounded-full h-2 mb-3">
          <motion.div 
            className="bg-[#86bc25] h-2 rounded-full"
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="space-y-2 text-xs">
          {progressSections.map((section, index) => (
            <div 
              key={section} 
              className={`flex items-center gap-2 ${
                progressSections.indexOf(activeSection) >= index 
                  ? 'text-[#86bc25] font-semibold' 
                  : 'text-gray-400'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                progressSections.indexOf(activeSection) >= index 
                  ? 'bg-[#86bc25]' 
                  : 'bg-gray-300'
              }`} />
              {sectionLabels[section]}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <ul className="flex flex-col gap-3">
        {sections.map(section => (
          <li key={section.id} className="group relative">
            <button
              onClick={() => handleNavClick(section.id)}
              className="flex items-center cursor-pointer"
            >
              <span className="absolute right-full mr-3 px-2 py-1 bg-[#003b6e] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {section.name}
              </span>
              <motion.div
                className="w-3 h-3 rounded-full border-2 transition-all duration-300"
                animate={{ 
                  scale: activeSection === section.id ? 1.5 : 1,
                  backgroundColor: activeSection === section.id ? '#86bc25' : '#ffffff',
                  borderColor: activeSection === section.id ? '#86bc25' : '#003b6e'
                }}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;