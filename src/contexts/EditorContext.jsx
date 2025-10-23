import React, { createContext, useContext, useState, useEffect } from 'react';

const EditorContext = createContext();

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
};

export const EditorProvider = ({ children }) => {
  const [editorMode, setEditorMode] = useState(false);
  const [textStyles, setTextStyles] = useState({});
  const [showExportModal, setShowExportModal] = useState(false);

  // Load saved styles from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('editorTextStyles');
    if (saved) {
      try {
        setTextStyles(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load editor styles:', e);
      }
    }
  }, []);

  // Save styles to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(textStyles).length > 0) {
      localStorage.setItem('editorTextStyles', JSON.stringify(textStyles));
    }
  }, [textStyles]);

  const updateTextStyle = (id, property, value) => {
    setTextStyles(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [property]: value
      }
    }));
  };

  const getTextStyle = (id) => {
    return textStyles[id] || {};
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(textStyles, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `editor-settings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearSettings = () => {
    if (window.confirm('Are you sure you want to clear all editor settings?')) {
      setTextStyles({});
      localStorage.removeItem('editorTextStyles');
    }
  };

  const value = {
    editorMode,
    setEditorMode,
    textStyles,
    updateTextStyle,
    getTextStyle,
    exportSettings,
    clearSettings,
    showExportModal,
    setShowExportModal
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};
