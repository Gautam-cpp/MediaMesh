import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  token: string | null;
  user: any;
  isLoggedIn: boolean;
  login: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any >(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (newToken: string, userData: any) => {
    setToken(newToken);
    setUser(userData);
    setIsLoggedIn(true);
    await AsyncStorage.setItem('access_token', newToken);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
  };

  
  const logout = async () => {
    setToken(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('access_token');
  };
  
  

  const checkAuth = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    const storedUserData = await AsyncStorage.getItem('user_data');
    if (storedToken && storedUserData) {
      setToken(storedToken);
      setUser(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    } else {
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn, login, logout, checkAuth }}>
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
