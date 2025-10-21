import React, { useState, useEffect, useRef } from 'react';
import StartingSection from '@/components/manager/StartingSection';
import WhoSection from '@/components/manager/WhoSection';
import ChallengeSection from '@/components/manager/ChallengeSection';
import WhySection from '@/components/manager/WhySection';
import WhatSection from '@/components/manager/WhatSection';
import HowSection from '@/components/manager/HowSection';
import FinancialsSection from '@/components/manager/FinancialsSection';
import SummarySection from '@/components/manager/SummarySection';
import ScrollNavigation from '@/components/manager/ScrollNavigation';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('start');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      const sections = ['start', 'who', 'challenge', 'how', 'financials', 'summary', 'why', 'what'];
      const scrollPosition = e.target.scrollTop + e.target.clientHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const container = scrollContainerRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll({ target: container });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="snap-container" ref={scrollContainerRef}>
      <div className="snap-slide">
        <StartingSection />
      </div>
      <div className="snap-slide">
        <WhoSection />
      </div>
      <div className="snap-slide">
        <ChallengeSection />
      </div>
      <div className="snap-slide">
        <HowSection />
      </div>
      <div className="snap-slide">
        <FinancialsSection />
      </div>
      <div className="snap-slide">
        <SummarySection />
      </div>
      <div className="snap-slide">
        <WhySection />
      </div>
      <div className="snap-slide">
        <WhatSection />
      </div>

      <ScrollNavigation activeSection={activeSection} />
    </div>
  );
}