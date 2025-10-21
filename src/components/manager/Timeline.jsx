import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  { name: 'Bank Career', year: '2010' },
  { name: 'Deloitte Entry', year: '3 years ago' },
  { name: 'Luxembourg Project', year: '2022' },
  { name: 'ERGO Project', year: '2023' },
  { name: 'Barmenia-Gothaer', year: '2023' },
  { name: 'Today', year: 'Now' },
];

export default function Timeline() {
  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-bold text-[#003b6e] mb-4 text-center">My Journey</h3>
      <div className="relative w-full h-12">
        {/* The line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full" />
        
        {/* The progress line */}
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-[#86BC25] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* The milestones */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative group">
              <motion.div
                className="w-4 h-4 bg-white border-2 border-[#86BC25] rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
              />
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-black/70 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-bold">{milestone.name}</p>
                <p>{milestone.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}