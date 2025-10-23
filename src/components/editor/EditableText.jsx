import React from 'react';
import { useEditor } from '@/contexts/EditorContext';

/**
 * EditableText component - wraps any text element and makes it editable in editor mode
 *
 * Usage:
 * <EditableText id="unique-id" defaultSize="text-2xl" as="h1">
 *   Your text here
 * </EditableText>
 */
export const EditableText = ({
  id,
  children,
  defaultSize = 'text-base',
  as: Component = 'div',
  className = '',
  style = {},
  onClick,
  ...props
}) => {
  const { editorMode, getTextStyle, openPopup, activePopup } = useEditor();

  const textStyle = getTextStyle(id);
  const fontSize = textStyle.fontSize || defaultSize;

  // Combine className with fontSize
  const finalClassName = `${className} ${fontSize}`.trim();

  const isActive = activePopup?.id === id;

  // Add visual indication in editor mode
  const editorStyles = editorMode ? {
    outline: isActive ? '2px solid #046A38' : '1px dashed #86BC25',
    outlineOffset: '2px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ...style
  } : style;

  const handleClick = (e) => {
    if (editorMode) {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const position = {
        x: rect.left,
        y: rect.bottom + 10
      };
      openPopup(id, position, fontSize);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Component
      className={finalClassName}
      style={editorStyles}
      data-editor-id={id}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Component>
  );
};
