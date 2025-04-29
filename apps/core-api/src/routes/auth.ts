import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { registerSchema, loginSchema } from '../schemas/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Route di registrazione
router.post('/register', validateRequest(registerSchema), register);

// Route di login
router.post('/login', validateRequest(loginSchema), login);

export default router; 