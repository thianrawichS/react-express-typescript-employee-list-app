import * as userService from '../services/user.service'
import { Request, Response } from 'express';

async function register (req:Request, res:Response) {
    try {
        res.json({
            time: new Date().toLocaleString(),
            results: await userService.userRegister(req.body)
        })
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

async function login (req:Request, res:Response) {
    try {
        const loginResult = await userService.userLogin(req.body)
        res.json({
            time: new Date().toLocaleString(),
            message: loginResult.message,
            token: loginResult.token,
            username: loginResult.username
        })
    } catch (err) {
        console.error('error while logging in', err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export {
    register,
    login,
}