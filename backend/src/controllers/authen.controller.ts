import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { userPayload } from "../types/userPayload";
import * as userService from '../services/user.service'

dotenv.config();

const tokenKey:string = String(process.env.TOKEN_KEY);

async function authenUser (req: Request, res: Response) {
    const authHeader: string | undefined =  req.headers.authorization;
    if (!authHeader) {
        return res.json({
            signIn: false,
            message: 'No credential'
        });
    }

    const authToken = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(authToken, tokenKey) as userPayload
        const isUser = await userService.getUser(decoded.username)
        if (isUser.length === 0) {
            return res.json({
                signIn: false,
                message: 'user not found'
            })
        }
        res.json({
            signIn: true,
            user: decoded
        })
    } catch (err) {
        res.json({
            signIn: false,
            message: err
        })
    }
}

export {
    authenUser,
}