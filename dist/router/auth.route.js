import { Router } from 'express';
import { login, registerAdmin, RegisterUser } from '../controller/auth.controller.js';
export const authRouter = Router();
authRouter.post('/login', login);
authRouter.post('/register-admin', registerAdmin);
authRouter.post('/register', RegisterUser);
