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
      // First check localStorage
      const storedUsername = localStorage.getItem('username');
      
      if (storedUsername) {
        // Assume authenticated initially based on localStorage
        setUsername(storedUsername);
        setIsAuthenticated(true);
        
        // Then verify with server
        try {
          const result = await api.checkSession();
          
          if (!result.isAuthenticated) {
            // Server says not authenticated, update state
            setIsAuthenticated(false);
            setUsername(null);
            localStorage.removeItem('username');
          }
        } catch (error) {
          // Keep the user logged in if there's an error checking session
          console.error('Error checking session:', error);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Update login function
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

