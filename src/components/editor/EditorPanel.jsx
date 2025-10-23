import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditor } from '@/contexts/EditorContext';
import { X, Download, Trash2, Eye, EyeOff } from 'lucide-react';

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

export const EditorPanel = () => {
  const {
    editorMode,
    setEditorMode,
    updateTextStyle,
    getTextStyle,
    exportSettings,
    clearSettings,
    textStyles
  } = useEditor();

  const [editableElements, setEditableElements] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  // Scan for all editable elements in the DOM
  useEffect(() => {
    if (editorMode) {
      const scanElements = () => {
        const elements = document.querySelectorAll('[data-editor-id]');
        const elementData = Array.from(elements).map(el => ({
          id: el.getAttribute('data-editor-id'),
          text: el.textContent.substring(0, 50) + (el.textContent.length > 50 ? '...' : ''),
          element: el
        }));
        setEditableElements(elementData);
      };

      // Initial scan
      scanElements();

      // Rescan after a short delay to catch dynamically rendered elements
      const timer = setTimeout(scanElements, 500);

      return () => clearTimeout(timer);
    }
  }, [editorMode]);

  if (!editorMode) return null;

  return (
    <motion.div
      className="fixed top-4 right-4 z-[10000] bg-white rounded-xl shadow-2xl border-2 border-[#046A38]"
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      style={{
        width: isMinimized ? '250px' : '400px',
        maxHeight: isMinimized ? '60px' : '80vh',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#046A38] to-[#86BC25] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold text-lg">Editor Mode</h3>
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
            {Object.keys(textStyles).length} modified
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-white/20 p-1 rounded transition-colors"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setEditorMode(false)}
            className="text-white hover:bg-white/20 p-1 rounded transition-colors"
            title="Close Editor Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Actions */}
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex gap-2">
            <button
              onClick={exportSettings}
              className="flex-1 bg-[#046A38] text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#035530] transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>
            <button
              onClick={clearSettings}
              className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>

          {/* Editable Elements List */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 180px)' }}>
            {editableElements.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-sm">No editable elements found on this page.</p>
                <p className="text-xs mt-2">Navigate to a section with EditableText components.</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {editableElements.map((element) => {
                  const currentStyle = getTextStyle(element.id);
                  const currentSize = currentStyle.fontSize || element.element.className.match(/text-\w+/)?.[0] || 'text-base';

                  return (
                    <div
                      key={element.id}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:border-[#046A38] transition-colors"
                    >
                      <div className="text-xs text-gray-500 mb-1 font-mono">{element.id}</div>
                      <div className="text-sm text-gray-700 mb-3 line-clamp-2">{element.text}</div>

                      <div className="flex flex-wrap gap-1">
                        {fontSizeOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => updateTextStyle(element.id, 'fontSize', option.value)}
                            className={`px-2 py-1 text-xs rounded transition-colors ${
                              currentSize === option.value
                                ? 'bg-[#046A38] text-white font-bold'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Click font sizes to update • Changes auto-save • Export JSON when done
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};
