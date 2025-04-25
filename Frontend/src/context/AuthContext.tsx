import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';

// 1. Define the context type
type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => Promise<void>;
};

// 2. Create the context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create the provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const result = await api.checkSession();
        
        if (result.isAuthenticated) {
          setIsAuthenticated(true);
          setUsername(result.username);
          localStorage.setItem('username', result.username);
        } else {
          // Clear local storage if server says we're not authenticated
          setIsAuthenticated(false);
          setUsername(null);
          localStorage.removeItem('username');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setUsername(null);
        localStorage.removeItem('username');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Update login function
  const login = async (username: string) => {
    // Don't just set state - verify with backend first
    try {
      const result = await api.checkSession();
      if (result.isAuthenticated) {
        localStorage.setItem('username', username);
        setUsername(username);
        setIsAuthenticated(true);
        return true;
      } else {
        console.error("Login state mismatch - backend says not authenticated");
        return false;
      }
    } catch (error) {
      console.error("Session verification error", error);
      return false;
    }
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

// 4. Create a separate function for the hook
// THIS IS THE KEY CHANGE: Define the hook as a named function declaration
// instead of an arrow function expression
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

