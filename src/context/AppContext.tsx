import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUser, mockTouristUser } from '../data/mockData';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isOnline: boolean;
  login: (email: string, password: string, role: 'resident' | 'tourist') => boolean;
  logout: () => void;
  setOnline: (online: boolean) => void;
  switchRole: (role: 'resident' | 'tourist') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  const login = (email: string, _password: string, role: 'resident' | 'tourist') => {
    if (email && _password) {
      setUser(role === 'resident' ? { ...mockUser, email } : { ...mockTouristUser, email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);
  const setOnline = (online: boolean) => setIsOnline(online);
  const switchRole = (role: 'resident' | 'tourist') => {
    if (user) {
      setUser(role === 'resident' ? { ...mockUser, email: user.email } : { ...mockTouristUser, email: user.email });
    }
  };

  return (
    <AppContext.Provider value={{ user, isAuthenticated: !!user, isOnline, login, logout, setOnline, switchRole }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
