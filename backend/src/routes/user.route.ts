import { Router } from 'express';
import * as userController from '../controllers/user.controller'

const userRouter = Router()

// USER LOGIN
userRouter.post('/login', userController.login);

// USER REGISTER
userRouter.post('/register', userController.register);

export default userRouter;