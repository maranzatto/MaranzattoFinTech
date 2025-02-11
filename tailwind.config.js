module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        background: 'var(--background)',
        card: 'var(--card)',
        text: 'var(--text)',
      },
      borderRadius: {
        theme: 'var(--border-radius)',
      },
      backdropBlur: {
        theme: 'var(--glass-blur)',
      },
      backgroundColor: {
        glass: 'var(--glass-bg)',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.input-theme': {
          'width': '100%',
          'padding': '0.5rem 1rem',
          'borderRadius': 'var(--border-radius)',
          'border': '1px solid #e5e7eb',
          'backgroundColor': 'rgba(255, 255, 255, 0.5)',
          'transition': 'all 0.2s ease',
          'outline': 'none',
          '-webkit-appearance': 'none',
          '-moz-appearance': 'none',
          'appearance': 'none',
          '&:focus': {
            'outline': 'none',
            'ring': '0',
            'borderColor': 'var(--primary)',
            'boxShadow': '0 0 0 2px rgba(var(--primary-rgb), 0.1)',
          },
          '&:focus-visible': {
            'outline': 'none',
          },
          '&:-webkit-autofill': {
            'WebkitBoxShadow': '0 0 0 30px white inset',
          },
        },
        '.input-error': {
          'borderColor': 'var(--danger)',
          '&:focus': {
            'borderColor': 'var(--danger)',
            'boxShadow': '0 0 0 2px rgba(var(--danger-rgb), 0.1)',
          },
        }
      })
    }
  ],
} 