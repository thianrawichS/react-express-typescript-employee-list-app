import express, { Request, Response } from 'express';
import cors from 'cors';
import employeeRouter from './routes/employee.route';
import userRouter from './routes/user.route';
import authenRouter from './routes/authen.route';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript/Express Practice!')
})

app.use('/employee', employeeRouter);
app.use('/user', userRouter);
app.use('/authen', authenRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})