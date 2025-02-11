import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';

const AllTheProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

test('renders without crashing', () => {
  render(<App />, { wrapper: AllTheProviders });
});

// Adicione mais testes conforme necessário
