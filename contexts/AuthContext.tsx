import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, Driver } from '../types';
import { MOCK_ADMIN, MOCK_DRIVER, MOCK_RIDER } from '../constants';

interface AuthContextType {
  user: User | Driver | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | Driver | null>(null);

  const login = (role: UserRole) => {
    // Simulate API call
    setTimeout(() => {
      if (role === UserRole.RIDER) setUser(MOCK_RIDER);
      if (role === UserRole.DRIVER) setUser(MOCK_DRIVER);
      if (role === UserRole.ADMIN) setUser(MOCK_ADMIN);
    }, 500);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
