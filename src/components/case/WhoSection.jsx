import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Briefcase, Brain, Code, Rocket } from 'lucide-react';
import InteractiveWorldMap from './InteractiveWorldMap';

export default function WhoSection() {
  return (
    <Section className="bg-gray-50">
      <div className="text-center w-full mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003b6e] mb-2" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>
          WHO
        </h2>
        <div className="w-16 h-1 bg-[#86bc25] mx-auto mb-3" />
        <p className="text-lg text-gray-600" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>Eike Brenneisen at a glance</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 w-full h-full flex-1">
        {/* Profile Section */}
        <motion.div 
          className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{once: true}}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl bg-gray-200">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/17b2122c1_1747395927374.jpg" 
                    alt="Eike Brenneisen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#86bc25] rounded-full flex items-center justify-center shadow-lg">
                    <Briefcase className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#003b6e]" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>Eike Brenneisen</h3>
                <p className="text-md text-[#0070c0] font-semibold" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>BCM Transformation</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>
              Experienced manager bridging business strategy and IT. Specialized in steering complex transformations in financial services to create measurable value.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="flex items-center gap-1 text-xs text-gray-700 hover:text-[#86bc25] transition-colors" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a href="#" className="flex items-center gap-1 text-xs text-gray-700 hover:text-[#86bc25] transition-colors" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </motion.div>

        {/* Middle Column */}
        <motion.div 
          className="lg:col-span-2 grid grid-rows-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{once: true}}
        >
          {/* Global Experience */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h4 className="text-lg font-bold text-[#003b6e] mb-2 flex items-center gap-2" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>
              <span>🌍</span> Global Experience
            </h4>
            <InteractiveWorldMap />
          </div>

          {/* Technical Interests */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center gap-6">
            <div className="flex-1">
              <h4 className="text-lg font-bold text-[#003b6e] mb-2 flex items-center gap-2" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>
                <Brain className="w-5 h-5 text-[#86bc25]" />
                Technical Interests & AI
              </h4>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>
                Passionate about leveraging cutting-edge tech to solve complex business challenges.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-[#0070c0]">
                  <Code className="w-4 h-4" />
                  <span style={{fontFamily: 'Aptos, Inter, sans-serif'}}>Full-Stack</span>
                </div>
                <div className="flex items-center gap-1 text-[#86bc25]">
                  <Rocket className="w-4 h-4" />
                  <span style={{fontFamily: 'Aptos, Inter, sans-serif'}}>AI Apps</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-2/5">
              <h5 className="font-semibold text-xs text-center text-[#003b6e] mb-1" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>
                Hobby Project
              </h5>
              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden shadow-inner border">
                <iframe
                  src="https://app.base44.com/apps/68c6dca4763e822e9e0d6fc0/editor/preview"
                  className="w-full h-full border-0"
                  title="Base44 App Demo"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}