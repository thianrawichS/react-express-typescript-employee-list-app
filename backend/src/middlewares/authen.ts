import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import { userPayload } from "../types/userPayload";

dotenv.config();

const tokenKey:string = String(process.env.TOKEN_KEY);

const authenUserMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization
    if (!authHeader) {
        return res
          .json({
            signIn: false,
            message: 'No credential'
          })
    }

    const authToken = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(authToken, tokenKey) as userPayload
        (req as any).user = decoded
        next()
    } catch (err) {
        res.json({
            signIn: false,
            message: err
        })
    }
}

export default authenUserMiddleware;