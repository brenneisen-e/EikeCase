import React from 'react';
import Slide from './Slide';

export default function TitleSlide() {
  return (
    <Slide id="home" className="bg-gradient-to-br from-white to-gray-100" pageNumber="1">
      <div className="text-center max-w-5xl mx-auto">
        <h1 className="text-4xl lg:text-6xl xl:text-7xl font-light text-black mb-8 leading-tight">
          Compensation Logic Harmonization
        </h1>
        <p className="text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-12 font-light">
          From capture and calibration to prototyping,<br/>system implementation and transition support
        </p>
        <div className="mt-16">
          <p className="text-lg lg:text-xl text-gray-800">Manager Case | Eike Brenneisen</p>
          <p className="text-lg lg:text-xl text-[#86BC25] font-semibold">BCM Transformation</p>
        </div>
      </div>
    </Slide>
  );
}