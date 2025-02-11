import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary',
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary/20',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-200',
    danger: 'bg-danger text-white hover:bg-danger/90 focus:ring-danger/20',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  };

  return (
    <button
      className={`
        px-4 py-2.5 
        rounded-theme
        font-medium text-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}; 