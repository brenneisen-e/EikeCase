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
  ...props
}) => {
  const { editorMode, getTextStyle } = useEditor();

  const textStyle = getTextStyle(id);
  const fontSize = textStyle.fontSize || defaultSize;

  // Combine className with fontSize
  const finalClassName = `${className} ${fontSize}`.trim();

  // Add visual indication in editor mode
  const editorStyles = editorMode ? {
    outline: '1px dashed #86BC25',
    outlineOffset: '2px',
    position: 'relative',
    ...style
  } : style;

  return (
    <Component
      className={finalClassName}
      style={editorStyles}
      data-editor-id={id}
      {...props}
    >
      {children}
    </Component>
  );
};
