import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

const IframeContext = createContext(null);

export const IframeProvider = ({ children }) => {
  const iframeContainerRef = useRef(null);
  const [activeTarget, setActiveTarget] = useState(null);
  const [requester, setRequester] = useState(null); // Track who requested the iframe
  const [currentZIndex, setCurrentZIndex] = useState(50); // Track current z-index

  // Function to position iframe over a target element
  const positionIframeOver = useCallback((targetId, requesterId = 'default', zIndex = 50) => {
    if (!iframeContainerRef.current) return;

    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      console.warn(`Target element ${targetId} not found`);
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    const container = iframeContainerRef.current;

    container.style.position = 'fixed';
    container.style.top = `${rect.top}px`;
    container.style.left = `${rect.left}px`;
    container.style.width = `${rect.width}px`;
    container.style.height = `${rect.height}px`;
    container.style.display = 'block';
    container.style.zIndex = String(zIndex);
    container.style.pointerEvents = 'auto';

    setActiveTarget(targetId);
    setRequester(requesterId);
    setCurrentZIndex(zIndex);
    console.log(`✅ VSTEike iframe positioned over ${targetId} by ${requesterId} with z-index ${zIndex}`);
  }, []);

  // Function to hide iframe (only if called by current requester)
  const hideIframe = useCallback((requesterId = 'default') => {
    if (iframeContainerRef.current && (requester === requesterId || requester === null)) {
      iframeContainerRef.current.style.display = 'none';
      setActiveTarget(null);
      setRequester(null);
      console.log(`✅ VSTEike iframe hidden by ${requesterId}`);
    }
  }, [requester]);

  // Re-position iframe when window resizes or activeTarget changes
  useEffect(() => {
    if (!activeTarget) return;

    const handleResize = () => {
      positionIframeOver(activeTarget, requester, currentZIndex);
    };

    const intervalId = setInterval(() => {
      if (activeTarget) {
        const targetElement = document.getElementById(activeTarget);
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const container = iframeContainerRef.current;
          if (container) {
            container.style.top = `${rect.top}px`;
            container.style.left = `${rect.left}px`;
            container.style.width = `${rect.width}px`;
            container.style.height = `${rect.height}px`;
            container.style.zIndex = String(currentZIndex);
          }
        }
      }
    }, 100); // Re-position every 100ms to handle animations

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(intervalId);
    };
  }, [activeTarget, requester, currentZIndex, positionIframeOver]);

  return (
    <IframeContext.Provider value={{
      positionIframeOver,
      hideIframe,
      activeTarget,
      requester
    }}>
      {children}
      {/* Permanent iframe container */}
      <div
        ref={iframeContainerRef}
        style={{
          position: 'fixed',
          display: 'none',
          pointerEvents: 'none'
        }}
      >
        <iframe
          src="https://brenneisen-e.github.io/VSTEike/"
          className="w-full h-full border-0"
          title="VSTEike Prototype"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
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
