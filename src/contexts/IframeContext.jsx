import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const IframeContext = createContext(null);

export const IframeProvider = ({ children }) => {
  const vsteIkeIframeRef = useRef(null);
  const [currentContainer, setCurrentContainer] = useState(null);

  // Create iframe on mount
  useEffect(() => {
    if (!vsteIkeIframeRef.current) {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://brenneisen-e.github.io/VSTEike/';
      iframe.className = 'w-full h-full border-0';
      iframe.title = 'VSTEike Prototype';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      vsteIkeIframeRef.current = iframe;
      console.log('✅ VSTEike iframe created');
    }
  }, []);

  // Function to mount iframe to a container
  const mountIframe = (containerId) => {
    if (!vsteIkeIframeRef.current) return false;

    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Container ${containerId} not found`);
      return false;
    }

    // Remove iframe from current location
    if (vsteIkeIframeRef.current.parentNode) {
      vsteIkeIframeRef.current.parentNode.removeChild(vsteIkeIframeRef.current);
    }

    // Clear container and append iframe
    container.innerHTML = '';
    container.appendChild(vsteIkeIframeRef.current);
    setCurrentContainer(containerId);
    console.log(`✅ VSTEike iframe mounted to ${containerId}`);
    return true;
  };

  // Function to unmount iframe
  const unmountIframe = () => {
    if (vsteIkeIframeRef.current && vsteIkeIframeRef.current.parentNode) {
      vsteIkeIframeRef.current.parentNode.removeChild(vsteIkeIframeRef.current);
      setCurrentContainer(null);
      console.log('✅ VSTEike iframe unmounted');
    }
  };

  return (
    <IframeContext.Provider value={{
      vsteIkeIframeRef,
      currentContainer,
      mountIframe,
      unmountIframe
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
