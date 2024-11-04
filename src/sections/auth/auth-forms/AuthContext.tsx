'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context data
interface AuthContextType {
  authData: any;
  setAuthData: React.Dispatch<React.SetStateAction<any>>;
}

// Provide a default value for the context
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<any>(null);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
