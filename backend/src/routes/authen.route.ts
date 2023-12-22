import { Router } from 'express';
import * as employeeController from '../controllers/authen.controller'

const authenRouter = Router()

// authen user token
authenRouter.post('/user', employeeController.authenUser)

export default authenRouter;