import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Clock, Users, DollarSign, TrendingUp, Target } from 'lucide-react';

const financialMetrics = [
  { icon: Clock, title: "Typical project duration:", value: "6–12 months", color: "#0070c0" },
  { icon: Users, title: "Team size:", value: "4–5 FTEs", color: "#86bc25" },
  { icon: DollarSign, title: "Revenue per project:", value: "€200k–€400k", color: "#003b6e" },
];

const marketPotential = [
    { text: "Every consolidation & transformation triggers harmonization projects" },
];

const deloitteOpportunity = [
    { text: "Establish as go-to partner in DACH for compensation logic harmonization" },
];

export default function FinancialsSection() {
  return (
    <Section className="bg-gray-50">
      <div className="w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003b6e] mb-2" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>FINANCIALS</h2>
          <div className="w-16 h-1 bg-[#86bc25] mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {financialMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4" style={{borderColor: metric.color}}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
            >
              <metric.icon className="w-10 h-10 mx-auto mb-3" style={{color: metric.color}} />
              <h3 className="font-semibold text-gray-600">{metric.title}</h3>
              <p className="text-2xl font-bold text-[#003b6e]">{metric.value}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            <motion.div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#00a3a1]" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h3 className="text-xl font-bold text-[#003b6e] mb-3 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-[#00a3a1]" />Market potential:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {marketPotential.map(item => <li key={item.text}>{item.text}</li>)}
                </ul>
            </motion.div>
             <motion.div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#757676]" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h3 className="text-xl font-bold text-[#003b6e] mb-3 flex items-center gap-2"><Target className="w-6 h-6 text-[#757676]" />Opportunity for Deloitte:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {deloitteOpportunity.map(item => <li key={item.text}>{item.text}</li>)}
                </ul>
            </motion.div>
        </div>

      </div>
    </Section>
  );
}