import React from 'react';

export const DeloitteGPTAvatar = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-xs' },
    md: { container: 'w-9 h-9', text: 'text-sm' },
    lg: { container: 'w-11 h-11', text: 'text-base' }
  };

  const sizeConfig = sizes[size] || sizes.md;

  return (
    <div
      className={`${sizeConfig.container} rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)'
      }}
    >
      {/* Deloitte Green Dot - Brand Icon */}
    </div>
  );
};
