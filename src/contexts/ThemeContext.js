import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({});

const borderRadiusValues = {
  sm: '0.375rem',    // 6px
  md: '0.5rem',      // 8px
  lg: '1rem',        // 16px
  xl: '1.5rem',      // 24px
};

const defaultTheme = {
  primary: '#0ea5e9',
  secondary: '#64748b',
  success: '#22c55e',
  danger: '#ef4444',
  background: '#f3f4f6',
  card: '#ffffff',
  text: '#1f2937',
  borderRadius: 'lg',
  glassEffect: true,
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('userTheme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('userTheme', JSON.stringify(theme));
    
    // Atualiza as variáveis CSS
    Object.entries(theme).forEach(([key, value]) => {
      if (key === 'borderRadius') {
        document.documentElement.style.setProperty(
          '--border-radius',
          borderRadiusValues[value] || borderRadiusValues.lg
        );
      } else {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    });

    // Atualiza o efeito de vidro
    if (theme.glassEffect) {
      document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.7)');
      document.documentElement.style.setProperty('--glass-blur', 'blur(10px)');
    } else {
      document.documentElement.style.setProperty('--glass-bg', 'var(--card)');
      document.documentElement.style.setProperty('--glass-blur', 'none');
    }
  }, [theme]);

  const updateTheme = (newTheme) => {
    setTheme({ ...theme, ...newTheme });
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 