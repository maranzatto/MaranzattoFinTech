import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from './common/Input';
import { 
  ArrowRightIcon,
  UserIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (email.trim() === '') {
        throw new Error('Por favor, insira seu email');
      }

      // Simulação de envio
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Link de recuperação enviado com sucesso! Verifique seu email.');
      
    } catch (error) {
      setError(error.message || 'Erro ao enviar o email de recuperação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Container Principal */}
      <div className="w-full max-w-6xl mx-4 flex rounded-theme overflow-hidden shadow-2xl bg-white">
        {/* Lado Esquerdo - Formulário */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <Link 
              to="/login"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Voltar ao login
            </Link>

            <div className="text-center mb-8">
              <ShieldCheckIcon className="h-12 w-12 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Recuperar Senha</h2>
              <p className="mt-2 text-gray-600">
                Digite seu email para receber as instruções
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-danger/10 text-danger text-sm p-3 rounded-theme flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-success/10 text-success text-sm p-3 rounded-theme flex items-center">
                  <span className="mr-2">✅</span>
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-theme shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Enviar instruções
                    <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Lado Direito - Informações */}
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
              Recupere o acesso à sua conta de forma segura
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <EnvelopeIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email de Recuperação</h3>
                <p className="opacity-80">Enviaremos instruções detalhadas para seu email</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <ShieldCheckIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Processo Seguro</h3>
                <p className="opacity-80">Sua segurança é nossa prioridade</p>
              </div>
            </div>
          </div>

          <p className="text-sm opacity-70 relative">
            © 2024 MZFinanças. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
} 