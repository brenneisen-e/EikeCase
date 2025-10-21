import React from 'react';
import { motion } from 'framer-motion';

export default function Section({ children, className = '', id }) {
  return (
    <section
      id={id}
      className={`min-h-screen w-screen flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-y-auto ${className}`}
    >
      <motion.div
        className="h-full w-full max-w-7xl flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.div>
    </section>
  );
}