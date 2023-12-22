import { Router } from 'express';
import * as employeeController from '../controllers/employee.controller'
import authenUserMiddleware from '../middlewares/authen';

const employeeRouter = Router()

// GET Employee data
employeeRouter.get('/', employeeController.get);

// POST Employee data
employeeRouter.post('/', employeeController.create);

// PUT Employee data
employeeRouter.put('/:id', authenUserMiddleware, employeeController.update);

// DELETE Employee data
employeeRouter.delete('/:id', employeeController.del);

export default employeeRouter 