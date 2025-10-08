export interface User {
    id: number;
    username: string;
    email: string;
    full_name: string;
    avatar_url?: string;
    role: 'admin' | 'privileged'| 'regular';
}

export interface AuthResponse {
    user: User;
    token: string;
    message: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    full_name: string;
}

