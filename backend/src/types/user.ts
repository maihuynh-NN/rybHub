// TS interfaces, describe shape of user-related data objects in system
// Any func claims to return those obj must respect structure within that obj

// 1. User obj, how it looks once retrieved from db, or returned by an API.
export interface User {
    id: number;
    username: string;
    email: string;
    full_name: string;
    avatar_url?: string;
    role: 'admin' | 'privileged'| 'regular';
    created_at: Date;
};

// 2. obj requires those data, for when creating new user (signup form, or add user etc)
export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    full_name: string;
};

// 3. payload, for login endpoint
export interface LoginRequest {
    username: string;
    password: string;
};

// 4. obj, defines response structure, for success authentication
export interface AuthRespond {
    user: User;
    token: string;
};

export interface SignOptions {
    expiresIn: string | number;
};