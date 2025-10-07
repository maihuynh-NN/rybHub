// routes that match HTTP endpoints, to corresponding func within AuthController.ts

import Routes from 'express';
import {AuthController} from '../controllers/authController';
import {authenticateToken} from '../middleware/auth';

const router = Routes();

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/profile', authenticateToken, AuthController.getProfile);

export default router;