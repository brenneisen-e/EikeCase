import React, { useState, useEffect } from 'react';
import StartingSlide from '@/components/manager/StartingSlide';
import WhoSlide from '@/components/manager/WhoSlide';
import WhySlide from '@/components/manager/WhySlide';
import WhatSlide from '@/components/manager/WhatSlide';
import HowSlide from '@/components/manager/HowSlide';
import FinancialsSlide from '@/components/manager/FinancialsSlide';
import SummarySlide from '@/components/manager/SummarySlide';
import Navigation from '@/components/manager/Navigation';

const slides = [
  { id: 'start', name: 'Start', component: StartingSlide },
  { id: 'who', name: 'Who', component: WhoSlide },
  { id: 'why', name: 'Why', component: WhySlide },
  { id: 'what', name: 'What', component: WhatSlide },
  { id: 'how', name: 'How', component: HowSlide },
  { id: 'financials', name: 'Financials', component: FinancialsSlide },
  { id: 'summary', name: 'Summary', component: SummarySlide }
];

export default function ManagerCasePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigationVisible(true);
    }, 5000); // Show navigation after starting animation
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900">
      <CurrentSlideComponent onNext={nextSlide} onPrev={prevSlide} />
      
      {isNavigationVisible && (
        <Navigation 
          slides={slides}
          currentSlide={currentSlide}
          onSlideChange={goToSlide}
          onNext={nextSlide}
          onPrev={prevSlide}
        />
      )}
    </div>
  );
}