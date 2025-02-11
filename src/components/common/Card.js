import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`
        bg-white 
        rounded-theme 
        shadow-soft
        backdrop-blur-sm
        border border-gray-100
        transition-all duration-200
        hover:shadow-glass
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}; 