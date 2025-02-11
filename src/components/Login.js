import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Input } from './common/Input';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-glass backdrop-blur-theme rounded-theme p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-text mb-6">Login</h2>
        
        {error && (
          <div className="bg-danger/10 text-danger p-3 rounded-theme mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Usuário
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="Digite seu usuário"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Senha
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-primary text-white rounded-theme 
              hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Informações de login para teste */}
        <div className="mt-4 p-4 bg-primary/5 rounded-theme">
          <p className="text-sm text-gray-600 mb-2">Credenciais para teste:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Admin: usuario: <strong>admin</strong> / senha: <strong>1234</strong></li>
            <li>Usuário: usuario: <strong>usuario</strong> / senha: <strong>1234</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
} 