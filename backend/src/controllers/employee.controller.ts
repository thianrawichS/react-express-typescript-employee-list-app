import { Request, Response } from 'express';
import * as employeeService from '../services/employee.service';

async function get (req:Request, res:Response) {
    try {
        let name: string | undefined;
        if (typeof req.query.name === 'string') {
            name = req.query.name;
        }
        res.json({
            time: new Date().toLocaleString(),
            results: await employeeService.getEmployee(name)
        });
    } catch (err) {
        console.error('Error executing get employee query', err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

async function create (req:Request, res:Response) {
    try {
        res.json({
            time: new Date().toLocaleString(),
            results: await employeeService.createEmployee(req.body)
        });
    } catch (err) {
        console.error(`Error posting employee: ${err}`)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

async function update (req:Request, res:Response) {
    try {
        res.json({
            time: new Date().toLocaleString(),
            results: await employeeService.updateEmployee(req.params.id, req.body)
        })
    } catch (err) {
        console.error(`Error updating employee: ${err}`)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

async function del (req:Request, res:Response) {
    try {
        res.json({
            time: new Date().toLocaleString(),
            results: await employeeService.deleteEmployee(req.params.id)
        })
    } catch (err) {
        console.error(`Error deleting employee: ${err}`)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

export {
    get,
    create,
    update,
    del
}