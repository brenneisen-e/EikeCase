
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const handleScrollDown = () => {
    document.querySelector('#who')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2670&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003b6e]/80 to-[#0070c0]/60" />
      </div>

      <motion.div
        className="relative z-10 text-center p-4 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{fontFamily: 'Aptos, Inter, sans-serif'}}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Deloitte.svg/2560px-Deloitte.svg.png" alt="Deloitte Logo" className="w-40 mx-auto mb-8 brightness-0 invert" />
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4" style={{ color: '#86bc25', fontFamily: 'Aptos, Inter, sans-serif' }}>
          Compensation Logic<br/>Harmonization
        </h1>
        
        <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-95 font-light leading-relaxed" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>
          From capture and calibration to prototyping,<br/>
          system implementation and transition support
        </p>
        
        <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg inline-block">
          <p className="text-lg text-gray-200 font-medium" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>Manager Case | Eike Brenneisen</p>
          <p className="text-md text-gray-300" style={{fontFamily: 'Aptos, Inter, sans-serif'}}>BCM Transformation</p>
        </div>
      </motion.div>
      
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center animate-bounce hover:bg-white/20 transition-all">
          <ArrowDown className="w-6 h-6" />
        </div>
      </motion.button>
    </div>
  );
}
