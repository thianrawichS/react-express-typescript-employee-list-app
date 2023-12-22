import mysql, { Pool } from 'mysql2'
import dbPoolConfig from '../configs/db.config'

const conn:Pool = mysql.createPool(dbPoolConfig)

export default conn;