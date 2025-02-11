import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import GestaoContas from './components/GestaoContas';
import Salarios from './components/Salarios';
import Movimentacoes from './components/Movimentacoes';
import DashboardLayout from './components/Layout/DashboardLayout';
import Configuracoes from './components/Configuracoes';
import { ThemeProvider } from './contexts/ThemeContext';
import Perfil from './components/Perfil';

// Componente para proteger rotas que precisam de autenticação
function RotaProtegida({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <DashboardLayout>{children}</DashboardLayout>;
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            
            {/* Rotas protegidas */}
            <Route path="/dashboard" element={
              <RotaProtegida>
                <Dashboard />
              </RotaProtegida>
            } />
            
            <Route path="/contas" element={
              <RotaProtegida>
                <GestaoContas />
              </RotaProtegida>
            } />
            
            <Route path="/salarios" element={
              <RotaProtegida>
                <Salarios />
              </RotaProtegida>
            } />
            
            <Route path="/movimentacoes" element={
              <RotaProtegida>
                <Movimentacoes />
              </RotaProtegida>
            } />

            <Route path="/configuracoes" element={
              <RotaProtegida>
                <Configuracoes />
              </RotaProtegida>
            } />

            <Route path="/perfil" element={
              <RotaProtegida>
                <Perfil />
              </RotaProtegida>
            } />

            {/* Redireciona / para /login */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
