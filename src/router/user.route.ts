import { Router } from 'express';
import { createUserData, getUserData } from '../controller/user.controller.js';
import { authentication } from '../middleware/auth.js';



export const userRouter = Router();

userRouter.get("/get-data",authentication
    ,getUserData);
    
userRouter.post("/create-data",authentication,createUserData);


