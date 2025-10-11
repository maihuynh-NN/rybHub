import React, { useState, useEffect } from 'react';
import type {ReactNode} from 'react';
import { AuthContext } from './AuthContext';
import { AuthService } from '../services/authService';
import { message } from 'antd';
import type { User, LoginData, RegisterData } from '../types/user';

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (data: LoginData) => {
    try {
      const res = await AuthService.login(data);
      setUser(res.user);
      message.success('Login successful');
    } catch (err) {
        console.error(err);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const res = await AuthService.register(data);
      setUser(res.user);
      message.success('Registration successful');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    message.info('Logged out');
  };

    useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
    }, []);


  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
