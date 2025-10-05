// for role-based access enforcing
// to validate token on *incoming request* 
// -> protect apis, allow authenticated users

import {Request, Response, NextFunction} from 'express';
import {verifyToken } from '../utils/auth';
import {UserModel } from '../models/user';

// Request obj -> can attach 'req.user'
export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) =>  {
    // 1. look for Authorization: Bearer <token>, in headers
    const authHeader = req.headers['authorization'];
    // 2. extract token, skips 'Bearer
    const token = authHeader && authHeader.split(' ')[1];

    // 3. if missing -> return 401 unauthorized
    if (!token) {
        return res.status(401).json({ error: '[backend/src/middleware/auth] ]Access token required' });    
    }

    // after determine token exost, lok for that user
    try {
        const decoded = verifyToken(token); // make sure token is valid, not expired
        const user = await UserModel.findById(decoded.id as any) // payload includes userID

        if (!user) {
            return res.status(401).json({error: '[backend/src/middleware/auth] User not found -> invalid token' });
        }

        req.user = user; // THIS LINE ATTACH AUTHNTICATED USER TO req.user
        next(); // this line lets, request, proceed to *route handler*
    } catch (errorr) {
        return res.status(403).json({ error: '[backend/src/middleware/auth] Invalid or expired token' });
    }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

