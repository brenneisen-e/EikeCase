import React, { useEffect } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { InlineEditorPopup } from './InlineEditorPopup';

export const EditorOverlay = () => {
  const { activePopup, closePopup, updateTextStyle, editorMode } = useEditor();

  // Close popup on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activePopup) {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activePopup, closePopup]);

  // Close popup when clicking outside
  useEffect(() => {
    if (!activePopup || !editorMode) return;

    const handleClickOutside = (e) => {
      // Check if click is on an editable text element
      const isEditableText = e.target.closest('[data-editor-id]');
      // Check if click is inside the popup
      const isInsidePopup = e.target.closest('[data-inline-editor-popup]');

      if (!isEditableText && !isInsidePopup) {
        closePopup();
      }
    };

    // Small delay to avoid immediate closure on the same click that opened it
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activePopup, closePopup, editorMode]);

  if (!activePopup) return null;

  const handleSelectSize = (size) => {
    updateTextStyle(activePopup.id, 'fontSize', size);
  };

  return (
    <div data-inline-editor-popup>
      <InlineEditorPopup
        isOpen={!!activePopup}
        position={activePopup.position}
        currentSize={activePopup.currentSize}
        onSelectSize={handleSelectSize}
        onClose={closePopup}
        elementId={activePopup.id}
      />
    </div>
  );
};
