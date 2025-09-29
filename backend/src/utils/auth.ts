// any fearures invloving login, signup, or token validation (eg protecting routes), call these funcs
// reusasble auth func for handling, 1. pw security, and 2. json web token based auth.)

import {User, SignOptions} from '../types/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. hasing pw
export const hashPassword = async(password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

// 2. comparing pw
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}

if (!process.env.JWT_SECRET) {
  throw new Error("[backed/src/utils/auth] JWT_SECRET is not defined");
}

if (!process.env.JWT_EXPIRES_IN) {
  throw new Error("[backed/src/utils/auth] JWT_EXPIRES_IN is not defined");
}

// 3. generating jwts
export const generateToken = (user: User): string => {
    // 1. create signed jwt token
    return jwt.sign(
        // 2. store user info (id, username, role)
        {   
            id: user.id,
            username: user.username,
            role: user.role
        },
        // 3. secret (must be private)
        process.env.JWT_SECRET as string,
        // 4. expiratation (tiken die))
        {
            expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]
        }
    );
};

// 4. veryfying jwts
export const verifyToken = (token: string) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET!
    );
};