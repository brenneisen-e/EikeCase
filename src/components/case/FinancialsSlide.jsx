import React from 'react';
import Slide from './Slide';
import { motion } from 'framer-motion';

const financialCards = [
    { title: 'Typical Project Duration', value: '6-12', unit: 'Months', description: 'From initial analysis to final rollout.' },
    { title: 'Team Size', value: '4-5', unit: 'FTEs', description: 'Core team of business and tech experts.' },
    { title: 'Revenue per Project', value: '€200-400k', unit: '', description: 'Depending on complexity and scope.' },
];

export default function FinancialsSlide() {
  return (
    <Slide id="financials" className="bg-white" pageNumber="6">
        <div className="w-full max-w-6xl mx-auto">
            <div className="mb-8 text-center">
                <p className="text-[#86BC25] font-semibold text-sm mb-2">SLIDE 5</p>
                <h2 className="text-3xl lg:text-4xl font-light text-black">
                    <strong className="font-semibold text-[#86BC25]">Financials</strong> & Market Potential
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {financialCards.map((card, index) => (
                    <motion.div 
                        key={card.title}
                        className="bg-white p-6 border-t-4 border-[#86BC25] shadow-lg transition-transform duration-300 rounded-b-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h4 className="text-gray-500 text-xs uppercase font-semibold mb-2">{card.title}</h4>
                        <div className="text-3xl text-black font-bold mb-2">
                            {card.value}
                            {card.unit && <span className="text-2xl text-gray-600 ml-2">{card.unit}</span>}
                        </div>
                        <p className="text-gray-600 text-sm">{card.description}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-semibold text-black mb-3">Market Potential</h3>
                    <p className="text-gray-700 text-sm">Every <strong className="text-[#86BC25]">consolidation & transformation</strong> triggers harmonization projects. The current M&A climate and ongoing regulatory pressure create a continuous demand for this offering.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-semibold text-black mb-3">Opportunity for Deloitte</h3>
                    <p className="text-gray-700 text-sm">Establish Deloitte as the <strong className="text-[#86BC25]">go-to partner</strong> in DACH for fact-based compensation logic harmonization, leveraging our unique blend of business and tech expertise.</p>
                </div>
            </div>
        </div>
    </Slide>
  );
}