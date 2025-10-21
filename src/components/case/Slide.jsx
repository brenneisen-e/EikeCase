import React from 'react';
import { motion } from 'framer-motion';

const Slide = ({ children, id, className = '', pageNumber }) => {
  return (
    <section className={`h-full w-full flex items-center justify-center p-4 md:p-8 lg:p-12 relative ${className}`}>
      <motion.div 
        className="w-full max-w-7xl flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
      {pageNumber && (
        <span className="absolute bottom-5 right-10 text-gray-500 text-sm">
          Deloitte 2025 | {pageNumber}
        </span>
      )}
    </section>
  );
};

export default Slide;