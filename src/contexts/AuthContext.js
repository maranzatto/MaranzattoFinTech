import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se há um usuário no localStorage ao carregar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    // Verifica se é o login admin
    if (email === 'admin' && password === '1234') {
      const adminUser = { email: 'admin', role: 'admin' };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setUser(adminUser);
      return Promise.resolve();
    }
    
    // Se não for admin, usa o Firebase
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    return signOut(auth);
  };

  const value = {
    user,
    signup,
    login,
    logout
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