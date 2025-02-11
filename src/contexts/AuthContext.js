import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

// Usuários mock para teste
const MOCK_USERS = {
  'admin': {
    password: '1234',
    name: 'Administrador',
    role: 'admin'
  },
  'usuario': {
    password: '1234',
    name: 'Usuário Teste',
    role: 'user'
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const userFound = MOCK_USERS[username];
      
      if (!userFound || userFound.password !== password) {
        throw new Error('Usuário ou senha inválidos');
      }

      const userData = {
        username,
        name: userFound.name,
        role: userFound.role
      };

      // Salva os dados do usuário
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      
      return userData;
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    getCurrentUsername: () => user?.name || ''
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 