/*handle user authentication flows:
1. register new acc
log in 
retrieve profile
 */
import {Request, Response} from 'express';
import{UserModel } from '../models/user';
import { generateToken, comparePassword } from '../utils/auth';
import { CreateUserRequest, LoginRequest } from '../types/user';

export class AuthController {
    // 1. register new user
    static async register(req: Request, res: Response) {
        try {
            const {username, email, password, full_name}: CreateUserRequest = req.body;
            // 1.1 validation 
            if(!username || !email || !password || !full_name) {
                return res.status(400).json({error: '[backend/src/controllers/authController] one of request fields are missing'});
            }
            // 1.2 check if user or email already exists
            const existingUser = await UserModel.findByUsername(username);
            
            if (existingUser) {
                return res.status(409).json({ error: '[backend/src/controllers/authController] Username already taken' });
            }
            const existingEmail = await UserModel.findByEmail(email);
            if (existingEmail) {
                return res.status(409).json({ error: '[backend/src/controllers/authController] Email already registered' });
            }
            
            // 1.3. password validation
            if (password.length < 8) {
                return res.status(400).json({ error: '[backend/src/controllers/authController] Password must be at least 8 characters long' });
            } 

            // 1.4. create user 
            const user = await UserModel.create({username, email, password, full_name});
            const token = generateToken(user);

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role
                },
                token
            });

        } catch (error) { 
            console.error('[backend/src/controllers/authController] Error during registration:', error);
            res.status(500).json({ error: '[backend/src/controllers/authController] Internal server error' });
        }
    }

    // 2. login existing user
    static async login(req: Request, res: Response) {
        try {
            const { username, password }: LoginRequest = req.body;
            // 2.1 validation
            if (!username || !password) {
                return res.status(400).json({ error: '[backend/src/controllers/authController] Username and password are required' });
            }

            // 2.2 find user by username
            const user = await UserModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({ error: '[backend/src/controllers/authController] Invalid username or password' });
            }
            
            // 2.3 compare password
            const isValidPassword = await comparePassword(password, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({ error: '[backend/src/controllers/authController] Invalid username or password' });
            }

            // 2.4 generate token
            const token = generateToken(user);
            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role
                },
                token
            });

        } catch (error) {
            console.error('[backend/src/controllers/authController] Error during login:', error);
            res.status(500).json({ error: '[backend/src/controllers/authController] Internal server error' });
        }
    }

    // 3. get user profile
    static async getProfile(req: Request, res: Response) {
        try {
            const user = (req as any).user;
            res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role
                }
            });

        } catch (error) {
            console.error('[backend/src/controllers/authController] Error retrieving profile:', error);
            res.status(500).json({ error: '[backend/src/controllers/authController] Internal server error' });
        }
    }
};