import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Edit3, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const EditorToggleButton = () => {
  const { editorMode, setEditorMode } = useEditor();

  return (
    <motion.button
      onClick={() => setEditorMode(!editorMode)}
      className={`fixed top-4 right-4 z-[9999] rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 font-semibold ${
        editorMode
          ? 'bg-red-500 hover:bg-red-600 text-white px-4 py-3'
          : 'bg-gradient-to-r from-[#046A38] to-[#86BC25] hover:from-[#035530] hover:to-[#75ab20] text-white px-4 py-3'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={editorMode ? 'Exit Editor Mode' : 'Enter Editor Mode'}
    >
      {editorMode ? (
        <>
          <X className="w-5 h-5" />
          <span className="text-sm">Exit Editor</span>
        </>
      ) : (
        <>
          <Edit3 className="w-5 h-5" />
          <span className="text-sm">Edit Mode</span>
        </>
      )}
    </motion.button>
  );
};
