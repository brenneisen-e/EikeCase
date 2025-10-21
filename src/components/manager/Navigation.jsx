import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Navigation({ slides, currentSlide, onSlideChange, onNext, onPrev }) {
  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div 
          className="h-full bg-[#86BC25]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 space-y-2">
        {slides.map((slide, index) => (
          <motion.button
            key={slide.id}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-[#86BC25] scale-125' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => onSlideChange(index)}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        <motion.button
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          onClick={onPrev}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
          {currentSlide + 1} / {slides.length}
        </div>

        <motion.button
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          onClick={onNext}
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </>
  );
}