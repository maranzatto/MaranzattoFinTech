import React from 'react';

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`
        w-full px-4 py-2.5 
        bg-gray-50 border-0 
        focus:ring-2 focus:ring-primary/20 
        rounded-theme text-sm 
        shadow-inner-soft
        placeholder:text-gray-400
        transition-all duration-200
        focus:outline-none
        focus-visible:outline-none
        ${className}
      `}
      {...props}
    />
  );
}; 