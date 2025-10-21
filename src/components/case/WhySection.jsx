import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { TrendingUp, GitMerge, Building2, AlertCircle, Users, DollarSign, Target, ShieldAlert } from 'lucide-react';

const marketData = [
  { company: "UBS–CS", value: "CHF 3bn" },
  { company: "Generali–Liberty", value: "€2.3bn" },
  { company: "Aviva–Direct Line", value: "£3.7bn" }
];

const stats = [
  { icon: GitMerge, number: "574", text: "European insurance M&A deals in 2023" },
  { icon: Building2, number: "55+", text: "fintech transactions" },
];

const challenges = [
    { icon: AlertCircle, title: "Inefficiency" },
    { icon: Users, title: "Advisor Dissatisfaction" },
    { icon: DollarSign, title: "Value Leakage" },
];

export default function WhySection() {
  return (
    <Section className="bg-white">
        <div className="w-full">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#003b6e] mb-2" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>WHY</h2>
                <div className="w-16 h-1 bg-[#86bc25] mx-auto mb-3" />
                <p className="text-lg text-gray-600" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>Market View / Client Need</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 w-full">
                {/* Left Column - Market View */}
                <motion.div 
                    className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200"
                    initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{once: true}}
                >
                    <h3 className="text-xl font-bold text-[#003b6e] mb-4 text-center" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>Ongoing consolidation in Financial Services</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                        {marketData.map(d => <li key={d.company}>{d.company} ({d.value})</li>)}
                    </ul>
                     <div className="flex gap-4 mb-4">
                        {stats.map((stat) => (
                            <div key={stat.text} className="flex-1 bg-white p-3 rounded-lg border flex items-center gap-2">
                                <stat.icon className="w-6 h-6 text-[#86bc25]" />
                                <div>
                                    <span className="font-bold text-lg text-[#003b6e]">{stat.number}</span>
                                    <p className="text-xs text-gray-600">{stat.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gradient-to-r from-[#86bc25]/80 to-[#0070c0]/80 text-white p-4 rounded-lg text-center shadow-md">
                        <p className="font-semibold">Impact: Every merger brings multiple commission logics → harmonization inevitable</p>
                    </div>
                </motion.div>

                {/* Right Column - Client Need */}
                <motion.div 
                    className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200"
                    initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{once: true}}
                >
                    <h3 className="text-xl font-bold text-[#003b6e] mb-4 text-center" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>Client Challenge</h3>
                    <p className="text-center text-gray-600 mb-4 bg-white p-3 rounded-lg border">
                        Beyond M&A: Internal transformations (new sales models, regulatory change) create the same need
                    </p>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-center text-red-800 mb-4">Without structured harmonization, risk of:</h4>
                        <div className="flex justify-around">
                            {challenges.map((challenge, index) => (
                                <div key={index} className="flex flex-col items-center text-center w-28">
                                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mb-2">
                                        <challenge.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h5 className="font-semibold text-[#003b6e] text-sm">{challenge.title}</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </Section>
  );
}