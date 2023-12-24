import { Router } from 'express';
import * as employeeController from '../controllers/employee.controller'
import authenUserMiddleware from '../middlewares/authen';

const employeeRouter = Router()

// GET Employee data
employeeRouter.get('/', authenUserMiddleware, employeeController.get);

// POST Employee data
employeeRouter.post('/', authenUserMiddleware, employeeController.create);

// PUT Employee data
employeeRouter.put('/:id', authenUserMiddleware, employeeController.update);

// DELETE Employee data
employeeRouter.delete('/:id', authenUserMiddleware, employeeController.del);

export default employeeRouter 