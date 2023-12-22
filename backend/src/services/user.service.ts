import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import conn from "./db.service";
import jwt from 'jsonwebtoken'
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { LoginData } from "../types/LoginData";
import { RegisterData } from "../types/RegisterData";

dotenv.config();

const promiseConn = conn.promise();
const saltRounds:number = Number(process.env.SALTS);
const tokenKey:string = String(process.env.TOKEN_KEY);

async function userRegister (registerData:RegisterData) {
    const {
        email,
        username,
        password
    } = registerData
    const registerSql = "INSERT INTO employee_list_user SET username = ?, email = ?, password = ?"
    const hashedPwd = await bcrypt.hash(password, saltRounds);
    const results = await promiseConn.execute<ResultSetHeader>(registerSql, [username, email, hashedPwd]);

    return results[0]
}

async function userLogin (loginData:LoginData) {
    const {
        email,
        password,
    } = loginData

    let message:string;
    // check user
    const getUserSql = "SELECT * FROM employee_list_user WHERE email = ?" 
    const user = await promiseConn.execute<RowDataPacket[]>(getUserSql, [email]);
    if (user[0].length == 0) {
        message = 'user not found'
        return {message: message}
    }
    // check password
    const passwordMatch = await bcrypt.compare(password, user[0][0].password);
    if (!passwordMatch) {
        message = 'incorrect password'
        return {message: message}
    }
    // sign token
    const token = jwt.sign({
        id: user[0][0].id,
        username: user[0][0].username,
        email: user[0][0].email
    }, tokenKey, { expiresIn: '1h' });
    message = 'success'

    return { message: message, token, username: user[0][0].username }
}

async function getAllUser () {
    let getAllUserSql = "SELECT * FROM employee_list_user ";
    const results = await promiseConn.query<RowDataPacket[]>(getAllUserSql);
    return results[0]
}

async function getUser (username:string) {
    let getUserSql = "SELECT * FROM employee_list_user WHERE username = ?";
    const results = await promiseConn.execute<RowDataPacket[]>(getUserSql, [username]);
    return results[0]
}

export {
    userLogin,
    userRegister,
    getAllUser,
    getUser
}