import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Award, Target, Layers, TrendingUp, Building, ShieldCheck, Users, ArrowRight } from 'lucide-react';

const coreCase = "Compensation Logic Harmonization – structured, repeatable, high-demand";
const methodology = ["Capture", "Calibration", "Prototyping", "Implementation", "Transition"];
const scalabilityAreas = [
  { icon: Building, title: "Branch network transformations in banking" },
  { icon: ShieldCheck, title: "Risk scoring implementations in insurance" },
  { icon: Users, title: "Sales force restructuring & incentive redesigns" }
];
const vision = "Position Deloitte as the leading partner for fact-based steering of complex transformations in Financial Services";

export default function WrapUpSection() {
  return (
    <Section className="bg-white">
      <div className="w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003b6e] mb-2" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>WRAP-UP / OUTLOOK</h2>
          <div className="w-16 h-1 bg-[#86bc25] mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
                <motion.div className="bg-gray-50 p-6 rounded-lg shadow-lg border-l-4 border-[#86bc25]" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h3 className="text-xl font-bold text-[#003b6e] mb-3 flex items-center gap-2"><Award className="w-6 h-6 text-[#86bc25]" />Core Case:</h3>
                    <p className="text-gray-700">{coreCase}</p>
                </motion.div>
                <motion.div className="bg-gray-50 p-6 rounded-lg shadow-lg border-l-4 border-[#0070c0]" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                    <h3 className="text-xl font-bold text-[#003b6e] mb-3 flex items-center gap-2"><Target className="w-6 h-6 text-[#0070c0]" />Methodology:</h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                        {methodology.map((step, index) => (
                            <React.Fragment key={step}>
                                <span className="font-semibold text-gray-700">{step}</span>
                                {index < methodology.length - 1 && <ArrowRight className="w-4 h-4 text-gray-400" />}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>
            </div>
            {/* Right Column */}
            <div className="space-y-8">
                <motion.div className="bg-gray-50 p-6 rounded-lg shadow-lg border-l-4 border-[#00a3a1]" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                     <h3 className="text-xl font-bold text-[#003b6e] mb-3 flex items-center gap-2"><Layers className="w-6 h-6 text-[#00a3a1]" />Scalability: Same framework applicable to:</h3>
                     <ul className="space-y-2">
                        {scalabilityAreas.map(item => (
                            <li key={item.title} className="flex items-center gap-2 text-gray-700 text-sm">
                                <item.icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
                <motion.div className="bg-gradient-to-r from-[#86bc25] to-[#0070c0] text-white p-6 rounded-lg shadow-lg" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><TrendingUp className="w-6 h-6" />Vision:</h3>
                    <p className="opacity-95">{vision}</p>
                </motion.div>
            </div>
        </div>

      </div>
    </Section>
  );
}