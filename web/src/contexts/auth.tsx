import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import api from '../services/api.service';
import { AxiosResponse } from 'axios';

interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(email: string, password: string): Promise<AxiosResponse<any>>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadStoredData() {
      const storedToken = localStorage.getItem('@auth:token');
      const storedUser = localStorage.getItem('@auth:user');

      if (storedToken && storedUser) {
        setUser(JSON.parse(storedUser));
        api.defaults.headers.authorization = `Bearer ${storedToken}`;
      }
    }
    loadStoredData();
  }, []);

  async function signIn(email: string, password: string): Promise<AxiosResponse<any>> {
    const promise = AuthService.signIn({ email, password });

    promise.then(response => {
      const { token, ...data } = response.data;
      const userData = { ...data };

      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(userData);

      localStorage.setItem('@auth:token', token);
      localStorage.setItem('@auth:user', JSON.stringify(userData));
    });
    
    return promise;
  }

  function signOut() {
    api.defaults.headers.authorization = '';
    localStorage.removeItem('@auth:token');
    localStorage.removeItem('@auth:user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}