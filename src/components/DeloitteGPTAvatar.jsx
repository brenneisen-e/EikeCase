import React from 'react';

export const DeloitteGPTAvatar = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { container: 'w-10 h-10', logo: 'h-5', text: 'text-xs' },
    md: { container: 'w-12 h-12', logo: 'h-6', text: 'text-sm' },
    lg: { container: 'w-14 h-14', logo: 'h-7', text: 'text-base' }
  };

  const sizeConfig = sizes[size] || sizes.md;

  return (
    <div
      className={`${sizeConfig.container} rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)'
      }}
    >
      <div className="flex items-center gap-1">
        {/* Deloitte Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/2560px-Deloitte.svg.png"
          alt="Deloitte"
          className={`${sizeConfig.logo} object-contain brightness-0 invert`}
        />
        {/* GPT Text */}
        <span className={`${sizeConfig.text} font-bold text-white`}>
          GPT
        </span>
      </div>
    </div>
  );
};
