// defines the AuthService, fe's gateway to auth operations
// what to talk to be user endpoints

import api from './api';
import type {AuthResponse, LoginData, RegisterData, User} from '../types/user';

export class AuthService {
    static async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post('/auth/login', data);
        return response.data;
  }
  
  static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  }

  static async getProfile(): Promise<{user: User}> {
    const response = await api.get('/auth/profile');
    return response.data;
  }

  static logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getStoredToken(): string | null {
    return localStorage.getItem('token');
  }

  static getStoredUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData): null;
  }

  static storeAuth(authData: AuthResponse): void {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
  }

}