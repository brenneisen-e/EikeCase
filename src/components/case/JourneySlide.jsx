import React from 'react';
import Slide from './Slide';
import { motion } from 'framer-motion';

const journeyItems = [
    { year: '2018', title: 'Banking Foundation', role: 'Apprentice Banker', detail: 'Sparkasse Frankfurt\nDirect sales experience', status: 'completed' },
    { year: '2019-2021', title: 'Digital Innovation', role: 'Product Owner', detail: 'Innovation Labs\nFirst automation projects', status: 'completed' },
    { year: '2021-2023', title: 'Deloitte Entry', role: 'Analyst/Consultant', detail: 'ERGO ZAV Project\nManaging 2-3 FTEs', status: 'completed' },
    { year: '2023-2025', title: 'Scale & Lead', role: 'Senior Consultant', detail: 'Sub-project lead\nManaging 4-5 FTEs', status: 'current' },
    { year: '2025+', title: 'Market Leader', role: 'Manager', detail: 'Offering lead\nManaging 10+ FTEs', status: 'future' },
];

const statusClasses = {
    completed: "bg-[#86BC25] shadow-[0_0_0_4px_rgba(134,188,37,0.2)]",
    current: "bg-[#86BC25] w-6 h-6 animate-pulse shadow-[0_0_0_8px_rgba(134,188,37,0.3)]",
    future: "bg-gray-300",
};

export default function JourneySlide() {
  return (
    <Slide id="journey" className="bg-gray-100" pageNumber="3">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 text-center">
            <p className="text-[#86BC25] font-semibold text-sm mb-2">SLIDE 2B</p>
            <h2 className="text-3xl lg:text-4xl font-light text-black">
                <strong className="font-semibold text-[#86BC25]">My Journey</strong> to Manager Level
            </h2>
        </div>

        <div className="relative my-12">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -translate-y-1/2"></div>
            <motion.div 
                className="absolute top-1/2 left-0 h-1 bg-[#86BC25] -translate-y-1/2"
                initial={{ width: 0 }}
                whileInView={{ width: '67%' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 2, ease: "easeOut" }}
            ></motion.div>
            
            <div className="relative flex justify-between">
                {journeyItems.map((item, index) => (
                    <motion.div 
                        key={item.year}
                        className="text-center flex-1 px-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        <p className="text-gray-600 font-semibold text-xs absolute -top-6 left-1/2 -translate-x-1/2">{item.year}</p>
                        <div className={`relative w-5 h-5 rounded-full mx-auto mb-4 ${statusClasses[item.status]}`}></div>
                        <h4 className="text-black text-sm font-semibold mb-1">{item.title}</h4>
                        <p className="text-[#86BC25] font-semibold text-xs mb-1">{item.role}</p>
                        <p className="text-gray-600 text-xs leading-tight whitespace-pre-line">{item.detail}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="flex justify-around mt-12 p-6 bg-white rounded-lg shadow-sm max-w-4xl mx-auto">
             <div className="text-center">
                <div className="text-2xl font-bold text-black">2 → 5 → <span className="text-[#86BC25]">12+</span></div>
                <div className="text-gray-600 text-xs">Team Growth (FTEs)</div>
            </div>
             <div className="text-center">
                <div className="text-2xl font-bold text-black">15+</div>
                <div className="text-gray-600 text-xs">Projects Delivered</div>
            </div>
             <div className="text-center">
                <div className="text-2xl font-bold text-black">€<span className="text-[#86BC25]">2.5M</span></div>
                <div className="text-gray-600 text-xs">Managed Revenue</div>
            </div>
        </div>
      </div>
    </Slide>
  );
}