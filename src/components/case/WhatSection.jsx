import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Search, Scale, TestTube2, Settings, Users, ArrowRight, MousePointerClick } from 'lucide-react';

const frameworkSteps = [
  { number: "1", icon: Search, title: "Capture", description: "Record and structure existing commission logics, map KPIs and contracts", color: "#0070c0" },
  { number: "2", icon: Scale, title: "Calibration", description: "Define and align target logic balancing fairness, cost, strategic goals", color: "#86bc25" },
  { number: "3", icon: TestTube2, title: "Prototyping & Simulation", description: "Build prototype (Excel/Power BI/SRC), test what-if scenarios, analyze agent vs. company effects", color: "#003b6e" },
  { number: "4", icon: Settings, title: "Implementation", description: "Embed target logic into systems (SRC, Power BI, SAP), supported by automation & offshore delivery", color: "#00a3a1" },
  { number: "5", icon: Users, title: "Transition", description: "Support advisor communication and rollout with tools and dashboards", color: "#757676" }
];

export default function WhatSection() {
  return (
    <Section className="bg-gray-50">
      <div className="w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003b6e] mb-2" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>WHAT</h2>
          <div className="w-16 h-1 bg-[#86bc25] mx-auto mb-3" />
          <p className="text-lg text-gray-600" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>Solution / Offering</p>
        </div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-[#003b6e] mb-2" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>Compensation Logic Harmonization – Deloitte E2E Framework</h3>
        </motion.div>

        <div className="space-y-6">
          {frameworkSteps.map((step) => (
            <motion.div
              key={step.number}
              className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-lg border-l-4" style={{borderColor: step.color}}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md flex-shrink-0" style={{backgroundColor: step.color}}>
                    <step.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h4 className="text-lg font-bold" style={{color: step.color}}>{step.number}. {step.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
              {step.title === "Prototyping & Simulation" && (
                  <div className="ml-auto flex gap-6 items-center flex-shrink-0">
                      <div>
                          <h5 className="font-semibold text-center mb-2 text-xs">Interactive Mockup</h5>
                          <div className="relative w-32 h-32 mx-auto">
                              <iframe src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/7ac572bcd_Case.html" className="w-full h-full border-4 border-gray-300 shadow-md" style={{ clipPath: 'circle(50% at 50% 50%)', transform: 'scale(1.5)' }} title="Interactive Mockup"></iframe>
                          </div>
                      </div>
                      <div className="w-56">
                          <h5 className="font-semibold text-center mb-2 text-xs">Final Product Example</h5>
                           <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/94106e3a1_Picture1.png" alt="Final Product Screenshot" className="rounded-md shadow-lg border"/>
                      </div>
                  </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}