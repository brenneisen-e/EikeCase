import React from 'react';
import Slide from './Slide';
import { motion } from 'framer-motion';
import InteractiveWorldMap from './InteractiveWorldMap';

const expertiseData = [
    { title: 'Business Expertise', items: ['Trained banker with sales background', 'Compensation & commission logic expert', 'Sales steering & KPI design', 'Large-scale program management'] },
    { title: 'Technical Capabilities', items: ['Rapid prototyping (Excel/Power BI/SRC)', 'Process automation (SQL/Power Automate)', 'User frontends (Power Apps)', 'AI & offshore acceleration'] },
    { title: 'Track Record', items: ['ERGO ZAV transformation lead', 'Barmenia–Gothaer harmonization', '6+ years FSI consulting', '15+ transformation projects'] },
    { title: 'Differentiator', items: ['End-to-end delivery capability', 'From strategy to implementation', 'Fact-based steering approach', 'Measurable value realization'] }
];

const ExpertiseBox = ({ title, items }) => (
    <motion.div 
        className="p-4 bg-gray-100 border-l-4 border-[#86BC25] h-full"
        whileHover={{ transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
    >
        <h3 className="text-black mb-3 text-sm font-semibold">{title}</h3>
        <ul className="list-none text-gray-600 text-xs space-y-1">
            {items.map(item => <li key={item} className="pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-[#86BC25]">{item}</li>)}
        </ul>
    </motion.div>
);

export default function WhoSlide() {
  return (
    <Slide id="who" className="bg-white" pageNumber="2">
        <div className="grid lg:grid-cols-3 gap-12 items-center h-full py-8">
            <div className="text-center lg:col-span-1">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 shadow-xl">
                    <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/17b2122c1_1747395927374.jpg" 
                        alt="Eike Brenneisen" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Eike Brenneisen</h3>
                <p className="text-md text-gray-600 mb-1">Senior Consultant</p>
                <p className="text-sm text-[#86BC25] font-semibold">BCM Transformation</p>
            </div>
            <div className="lg:col-span-2">
                <h2 className="text-2xl lg:text-3xl text-black mb-6 font-light">Bridging Business & Technology in FSI Transformations</h2>
                <div className="grid md:grid-cols-2 gap-4 h-64">
                    {expertiseData.map(data => <ExpertiseBox key={data.title} {...data} />)}
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-7xl px-12">
            <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-center text-black text-lg mb-4 font-light">Global Project Experience</h3>
                <div className="h-64 bg-white rounded-lg shadow-inner overflow-hidden">
                    <InteractiveWorldMap />
                </div>
            </div>
        </div>
    </Slide>
  );
}