

import React from 'react';

export default function Layout({ children }) {
  return (
    <>
      <style>{`
        :root {
            --deloitte-green: #86BC25;
            --deloitte-black: #000000;
            --deloitte-dark-gray: #333333;
            --deloitte-gray: #666666;
            --deloitte-light-gray: #999999;
            --deloitte-bg-gray: #f5f5f5;
            --deloitte-white: #ffffff;
        }
        html, body {
            font-family: 'Aptos', 'Open Sans', 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: var(--deloitte-dark-gray);
            overflow-x: hidden;
            background-color: var(--deloitte-white);
            margin: 0;
            padding: 0;
            height: 100%;
            font-size: 18px; /* Optimiert für 27-Zoll & Lesbarkeit (~14pt) */
        }
        
        /* Optimierung für 27-Zoll (2560x1440) */
        @media (min-width: 2400px) {
          html, body {
            font-size: 20px;
          }
          
          .snap-container {
            max-width: 2560px;
            margin: 0 auto;
          }
        }
        
        /* Snap scrolling */
        .snap-container {
            height: 100vh;
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
        }
        
        .snap-slide {
            height: 100vh;
            scroll-snap-align: start;
            scroll-snap-stop: always;
            overflow: hidden; /* Verhindert das Überlaufen von Inhalten zur nächsten Folie */
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #86BC25;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #5a8019;
        }
      `}</style>
      {children}
    </>
  );
}


