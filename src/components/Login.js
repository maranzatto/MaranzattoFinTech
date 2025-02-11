import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Input } from './common/Input';
import { 
  ArrowRightIcon, 
  KeyIcon, 
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (credentials.email.trim() === '') {
        throw new Error('Por favor, insira seu usuário');
      }
      if (credentials.password.trim() === '') {
        throw new Error('Por favor, insira sua senha');
      }

      // Validação mock para admin/1234
      if (credentials.email === 'admin' && credentials.password === '1234') {
        await login(credentials.email, credentials.password);
        if (rememberMe) {
          localStorage.setItem('rememberedUser', credentials.email);
        } else {
          localStorage.removeItem('rememberedUser');
        }
        navigate('/dashboard');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      setError(error.message || 'Email ou senha inválidos. Use admin/1234');
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = () => {
    setCredentials({
      email: 'admin',
      password: '1234'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Container Principal */}
      <div className="w-full max-w-6xl mx-4 flex rounded-theme overflow-hidden shadow-2xl bg-white">
        {/* Lado Esquerdo - Informações */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between text-white relative overflow-hidden">
          {/* Padrão de fundo decorativo */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)"/>
            </svg>
          </div>

          <div className="relative">
            <h1 className="text-4xl font-bold mb-4">MZFinanças</h1>
            <p className="text-lg opacity-90">
              Sua plataforma completa de gestão financeira
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Gestão Financeira Inteligente</h3>
                <p className="opacity-80">Controle total sobre suas finanças pessoais e empresariais</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Notificações Automáticas</h3>
                <p className="opacity-80">Nunca perca um vencimento com nosso sistema de alertas</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Relatórios Detalhados</h3>
                <p className="opacity-80">Visualize seus dados com gráficos e análises avançadas</p>
              </div>
            </div>
          </div>

          <p className="text-sm opacity-70 relative">
            © 2024 MZFinanças. Todos os direitos reservados.
          </p>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <ShieldCheckIcon className="h-12 w-12 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h2>
              <p className="mt-2 text-gray-600">
                Faça login para acessar sua conta
              </p>
              <button
                type="button"
                onClick={fillTestCredentials}
                className="mt-2 text-sm text-primary hover:text-primary/80 transition-colors flex items-center justify-center mx-auto"
              >
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Usar credenciais de teste (admin/1234)
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usuário
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className="pl-10"
                    placeholder="admin"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-danger/10 text-danger text-sm p-3 rounded-theme flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Lembrar-me</span>
                </label>

                <Link 
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-theme shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Entrar
                    <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link 
                    to="/register"
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Cadastre-se
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 