import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

const fontSizeOptions = [
  { label: 'XS', value: 'text-xs' },
  { label: 'SM', value: 'text-sm' },
  { label: 'Base', value: 'text-base' },
  { label: 'LG', value: 'text-lg' },
  { label: 'XL', value: 'text-xl' },
  { label: '2XL', value: 'text-2xl' },
  { label: '3XL', value: 'text-3xl' },
  { label: '4XL', value: 'text-4xl' },
  { label: '5XL', value: 'text-5xl' },
  { label: '6XL', value: 'text-6xl' }
];

export const InlineEditorPopup = ({
  isOpen,
  position,
  currentSize,
  onSelectSize,
  onClose,
  elementId
}) => {
  const popupRef = useRef(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    if (isOpen && popupRef.current && position) {
      const popup = popupRef.current;
      const rect = popup.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let { x, y } = position;

      // Adjust horizontal position if popup goes off-screen
      if (x + rect.width > viewportWidth - 20) {
        x = viewportWidth - rect.width - 20;
      }
      if (x < 20) {
        x = 20;
      }

      // Adjust vertical position if popup goes off-screen
      if (y + rect.height > viewportHeight - 20) {
        y = y - rect.height - 40; // Position above instead of below
      }

      setAdjustedPosition({ x, y });
    }
  }, [isOpen, position]);

  if (!isOpen || !position) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={popupRef}
        className="fixed z-[10001] bg-white rounded-lg shadow-2xl border-2 border-[#046A38] p-3"
        style={{
          left: `${adjustedPosition.x}px`,
          top: `${adjustedPosition.y}px`,
        }}
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#046A38] rounded-full"></div>
            <span className="text-xs font-semibold text-gray-700">Font Size</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Element ID */}
        <div className="text-xs text-gray-500 font-mono mb-2 truncate max-w-xs">
          {elementId}
        </div>

        {/* Font Size Grid */}
        <div className="grid grid-cols-5 gap-2">
          {fontSizeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelectSize(option.value);
                onClose();
              }}
              className={`px-3 py-2 text-xs rounded-lg transition-all font-semibold ${
                currentSize === option.value
                  ? 'bg-[#046A38] text-white ring-2 ring-[#86BC25] ring-offset-2'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {currentSize === option.value && (
                <Check className="w-3 h-3 inline mr-1" />
              )}
              {option.label}
            </button>
          ))}
        </div>

        {/* Footer Tip */}
        <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500 text-center">
          Click size to apply • Changes auto-save
        </div>

        {/* Arrow pointing to element */}
        <div
          className="absolute w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#046A38]"
          style={{
            left: '20px',
            top: '-8px',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
