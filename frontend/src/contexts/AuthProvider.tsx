import { useState, useEffect } from 'react';
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
      AuthService.storeAuth(res);
      setUser(res.user);
      message.success('Login successful');
    } catch (err) {
      console.error(err);
      message.error('Login failed');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const res = await AuthService.register(data);
      AuthService.storeAuth(res);
      setUser(res.user);
      message.success('Registration successful');
    } catch (err) {
      console.error(err);
      message.error('Registration failed');
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    message.info('Logged out');
  };

  const hasRole = (roles: string[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  useEffect(() => {
    const storedUser = AuthService.getStoredUser();
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};