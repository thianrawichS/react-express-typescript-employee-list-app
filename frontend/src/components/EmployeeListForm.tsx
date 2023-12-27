import { addEmployee } from '../types/addEmployee'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { Employee } from '../types/employee'
import HttpService from '../services/http'
import { SERVER_API_URL } from "../configs/serverApiUrl";

interface EmployeeListFormProps {
    employee: Employee[];
    setEmployee: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const EmployeeListForm = (props:EmployeeListFormProps) => {
    const { employee, setEmployee } = props

    // FORM INPUT HANDLE
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [salary, setSalary] = useState<string>('');

    const addEmployee = async (insertData:addEmployee) => {
        const res = await HttpService.postEmployeeData(SERVER_API_URL, insertData);
        console.log(res)
        if (res) {
        const newEmployee:Employee = {
            id: res.results.insertId,
            first_name: insertData.first_name,
            last_name: insertData.last_name,
            age: insertData.age,
            position: insertData.position,
            salary: insertData.salary
        }
        setEmployee([...employee, newEmployee])
        }
    } 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const employeeData:addEmployee = {
            first_name: firstName,
            last_name: lastName,
            age: age,
            position: position,
            salary: salary,
        } 
        Swal.fire({
            title: "NEW EMPLOYEE",
            text: `Add ${firstName} ${lastName} to the database?`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Add"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    addEmployee(employeeData);
                    Swal.fire({
                        title: "Added",
                        text: `${firstName} ${lastName} has been added as a ${position}`,
                        icon: "success"
                    });
                    setFirstName('');
                    setLastName('');
                    setAge('');
                    setPosition('');
                    setSalary('');
                    
                } catch (err) {
                    console.error('Error while add employee', err)
                    Swal.fire({
                        title: "Error!",
                        text: 'Failed to add new employee',
                        icon: "error"
                    });
                }
            }
        });
    }

    const handleReset = () => {
        setFirstName('');
        setLastName('');
        setAge('');
        setPosition('');
        setSalary('')
    }

    return (
        <div className='container-sm mt-5'>
            <button 
                type="button" 
                className="btn btn-success" 
                data-bs-toggle="modal" 
                data-bs-target="#addEmployeeModal"
            >
                Add
            </button>
            <div 
                className="modal fade" 
                id="addEmployeeModal" 
                tabIndex={-1} 
                aria-labelledby="addEmployeeModalLabel" 
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addEmployeeModalLabel">Add employee</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div>
                                    <label className='form-label'> Firstname </label>
                                    <input 
                                        type="text" 
                                        className='form-control'
                                        value={firstName} 
                                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='form-label'> Lastname </label>
                                    <input 
                                        type="text" 
                                        className='form-control'
                                        value={lastName} 
                                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='form-label'> Age </label>
                                    <input 
                                        type="number" 
                                        className='form-control' 
                                        value={age} 
                                        min={1}
                                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='form-label'> Position </label>
                                    <input 
                                        type="text" 
                                        className='form-control' 
                                        value={position} 
                                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPosition(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='form-label'> Salary </label>
                                    <input 
                                        type="number" 
                                        className='form-control' 
                                        value={salary} 
                                        min={1}
                                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSalary(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    className='btn btn-success' 
                                    type='submit'
                                > 
                                    Save 
                                </button>
                                <button 
                                    className='btn btn-secondary'
                                    onClick={handleReset}
                                > 
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeListForm