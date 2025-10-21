import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Award, Briefcase, Target, UserCheck, Code, Database, Zap, Brain, Users, TrendingUp } from 'lucide-react';

const trackRecord = [ { company: "ERGO ZAV", description: "Delivered at ERGO ZAV" }, { company: "Barmenia–Gothaer", description: "and Barmenia–Gothaer" } ];
const businessExpertise = [ { icon: Target, title: "Deep know-how in commission structures" }, { icon: TrendingUp, title: "sales steering, program management" }, { icon: UserCheck, title: "trained banker with sales background" } ];
const technicalExpertise = [ { icon: Code, title: "Prototyping in Excel/Power BI/SRC" }, { icon: Database, title: "Automation with SQL & Power Automate" }, { icon: Zap, title: "Frontends via Power Apps" }, { icon: Brain, title: "Use of AI & offshore teams for scalability" } ];

export default function HowSection() {
  return (
    <Section className="bg-white">
      <div className="w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003b6e] mb-2" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>HOW</h2>
          <div className="w-16 h-1 bg-[#86bc25] mx-auto mb-3" />
          <p className="text-lg text-gray-600" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>My Role & Differentiation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Track Record & Business Expertise */}
            <motion.div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200 space-y-6" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div>
                    <h3 className="text-xl font-bold text-[#003b6e] mb-3 flex items-center gap-2"><Award className="w-6 h-6 text-[#86bc25]" />Track record:</h3>
                    <p className="text-gray-700">{trackRecord.map(t => t.description).join(' ')}</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[#003b6e] mb-3 flex items-center gap-2"><Briefcase className="w-6 h-6 text-[#86bc25]" />Business expertise:</h3>
                     <ul className="space-y-2">
                        {businessExpertise.map(item => (
                            <li key={item.title} className="flex items-center gap-2 text-gray-700">
                                <item.icon className="w-5 h-5 text-[#0070c0]" />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* Technical Expertise */}
            <motion.div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                 <h3 className="text-xl font-bold text-[#003b6e] mb-3 flex items-center gap-2"><Code className="w-6 h-6 text-[#86bc25]" />Technical expertise:</h3>
                 <ul className="space-y-2">
                    {technicalExpertise.map(item => (
                        <li key={item.title} className="flex items-center gap-2 text-gray-700">
                            <item.icon className="w-5 h-5 text-[#0070c0]" />
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>

        <motion.div className="bg-gradient-to-r from-[#86bc25] to-[#0070c0] text-white p-6 rounded-lg text-center shadow-lg" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h4 className="text-xl font-bold mb-2">Differentiator</h4>
            <p className="opacity-95">Ability to bridge business design and technical implementation → delivering E2E, from concept to adoption</p>
        </motion.div>
      </div>
    </Section>
  );
}