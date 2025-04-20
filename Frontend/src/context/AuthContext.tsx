import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';

type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage first
    const storedUsername = localStorage.getItem('username');
    
    if (storedUsername) {
      // Also verify with server that session is still valid
      const checkSession = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/check-session', {
            credentials: 'include',
          });
          
          const data = await response.json();
          
          if (data.isAuthenticated) {
            setIsAuthenticated(true);
            setUsername(data.username);
          } else {
            // Session expired on server, clear local storage
            localStorage.removeItem('username');
            setIsAuthenticated(false);
            setUsername(null);
          }
        } catch (error) {
          console.error('Session check error:', error);
        }
      };
      
      checkSession();
    }
  }, []);

  const login = (username: string) => {
    localStorage.setItem('username', username);
    setUsername(username);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await api.logout();
      localStorage.removeItem('username');
      setIsAuthenticated(false);
      setUsername(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};