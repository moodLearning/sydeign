import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
console.log("AuthContext initialized");

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  // Start loading as false, or handle hydration gracefully
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedToken = localStorage.getItem('shopify_customer_token');
        if (savedToken) {
          setToken(savedToken);
        }
      }
    } catch (e) {
      console.warn("Auth localStorage access failed:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('shopify_customer_token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('shopify_customer_token');
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}