import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardLayout from './components/Layout/DashboardLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';

// Lazy loading dos componentes
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const GestaoContas = lazy(() => import('./components/GestaoContas'));
const Movimentacoes = lazy(() => import('./components/Movimentacoes'));
const Configuracoes = lazy(() => import('./components/Configuracoes'));
const Perfil = lazy(() => import('./components/Perfil'));
const Salarios = lazy(() => import('./components/Salarios'));

// Componente de Loading simples
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Componente para proteger rotas
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!loading) {
      if (!user && !token) {
        navigate('/login');
      } else if (user && token && window.location.pathname === '/login') {
        navigate('/dashboard');
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

// Componente para rotas públicas
function PublicRoute({ children }) {
  const { user } = useAuth();
  const token = localStorage.getItem('authToken');

  if (user && token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } 
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contas"
                  element={
                    <PrivateRoute>
                      <GestaoContas />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/salarios"
                  element={
                    <PrivateRoute>
                      <Salarios />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/movimentacoes"
                  element={
                    <PrivateRoute>
                      <Movimentacoes />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/configuracoes"
                  element={
                    <PrivateRoute>
                      <Configuracoes />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/perfil"
                  element={
                    <PrivateRoute>
                      <Perfil />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <ForgotPassword />
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Register />
                  }
                />
                <Route 
                  path="*" 
                  element={
                    localStorage.getItem('authToken') 
                      ? <Navigate to="/dashboard" /> 
                      : <Navigate to="/login" />
                  } 
                />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
