import React from 'react';
import Slide from './Slide';

const visionPillars = [
    { title: 'Core Case', content: 'Compensation Logic Harmonization – structured, repeatable, high-demand offering.' },
    { title: 'Methodology', content: 'Capture → Calibration → Prototyping → Implementation → Transition' },
    { title: 'Scalability', content: 'Framework applicable to branch network transformations, risk scoring, incentive redesigns.' },
];

export default function VisionSlide() {
  return (
    <Slide id="vision" className="bg-gray-100" pageNumber="7">
        <div className="w-full max-w-6xl mx-auto">
            <div className="mb-8 text-center">
                <p className="text-[#86BC25] font-semibold text-sm mb-2">SLIDE 6</p>
                <h2 className="text-3xl lg:text-4xl font-light text-black">
                    <strong className="font-semibold text-[#86BC25]">Vision</strong> & Outlook
                </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {visionPillars.map(pillar => (
                    <div key={pillar.title} className="bg-white p-5 rounded-lg shadow-sm">
                        <h4 className="text-[#86BC25] font-semibold mb-3 text-sm">{pillar.title}</h4>
                        <p className="text-gray-700 text-sm">{pillar.content}</p>
                    </div>
                ))}
            </div>

            <div className="p-8 bg-gradient-to-r from-[#86BC25] to-[#5a8019] text-white rounded-lg text-center shadow-lg">
                <h3 className="text-xl font-semibold mb-4">My Vision</h3>
                <p className="text-lg opacity-90">Position Deloitte as the leading partner for fact-based steering of complex transformations in Financial Services, turning data into measurable value and strategic advantage.</p>
            </div>
        </div>
    </Slide>
  );
}