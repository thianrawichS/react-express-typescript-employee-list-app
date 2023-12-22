import conn from "./db.service";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { EmployeeData } from "../types/EmployeeData";

const promiseConn = conn.promise();

async function getEmployee (employeeName?: string) {
    let getEmpDataSql = 'SELECT * FROM employee_list';
    if (employeeName) {
        const name = `"%${employeeName}%"`;
        getEmpDataSql += ` WHERE first_name LIKE ${name} `
    }
    const results = await promiseConn.query<RowDataPacket[]>(getEmpDataSql);

    return results[0];
}

async function createEmployee (employeeData:EmployeeData) {
    const {
        first_name,
        last_name,
        age,
        position,
        salary
    } = employeeData
    const createEmpDataSql = "INSERT INTO employee_list " +
            "(first_name, last_name, age, position, salary) " +
            "VALUES (?, ?, ?, ?, ?) ";
    const createEmpData = [first_name, last_name, age, position, salary]
    const results = await promiseConn.execute<ResultSetHeader>(
        createEmpDataSql, 
        createEmpData
    )

    return results[0]
}

async function updateEmployee (employeeId:string | number, employeeData:EmployeeData) {
    const {
        first_name,
        last_name,
        age,
        position,
        salary
    } = employeeData
    const updateEmpDataSql = "UPDATE employee_list " +
        "SET first_name = ?, last_name = ?, age = ?, position = ?, salary = ? " +
        "WHERE id = ?";
    const updateEmpData = [first_name, last_name, age, position, salary, employeeId]
    const results = await promiseConn.execute<ResultSetHeader>(
        updateEmpDataSql, 
        updateEmpData
    )

    return results[0];
}

async function deleteEmployee (employeeId:string | number) {
    const deleteEmpDataSql = "DELETE FROM employee_list WHERE id = ?";
    const results = await promiseConn.execute<ResultSetHeader>(
        deleteEmpDataSql, 
        [employeeId]
    );

    return results[0];
}

export {
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}