import React, { createContext, useContext, useRef, useState } from 'react';

const IframeContext = createContext(null);

export const IframeProvider = ({ children }) => {
  const vsteIkeIframeRef = useRef(null);
  const [iframeContainer, setIframeContainer] = useState(null);

  // Function to move iframe to a new container
  const attachIframeToContainer = (containerId) => {
    if (vsteIkeIframeRef.current && containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        // Move iframe to new container
        container.appendChild(vsteIkeIframeRef.current);
        setIframeContainer(containerId);
      }
    }
  };

  // Function to create iframe if it doesn't exist
  const createVSTEikeIframe = () => {
    if (!vsteIkeIframeRef.current) {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://brenneisen-e.github.io/VSTEike/';
      iframe.className = 'w-full h-full border-0';
      iframe.title = 'VSTEike Prototype';
      vsteIkeIframeRef.current = iframe;
    }
    return vsteIkeIframeRef.current;
  };

  return (
    <IframeContext.Provider value={{
      vsteIkeIframeRef,
      iframeContainer,
      attachIframeToContainer,
      createVSTEikeIframe
    }}>
      {children}
    </IframeContext.Provider>
  );
};

export const useIframe = () => {
  const context = useContext(IframeContext);
  if (!context) {
    throw new Error('useIframe must be used within an IframeProvider');
  }
  return context;
};
