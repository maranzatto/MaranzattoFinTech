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
  plugins: [],
} 