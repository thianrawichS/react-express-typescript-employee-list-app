import { PoolOptions } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbPoolConfig: PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
}

export default dbPoolConfig;