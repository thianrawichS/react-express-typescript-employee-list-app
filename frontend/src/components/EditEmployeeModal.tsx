import { Employee } from "../types/employee";
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";


interface EditEmployeeModalProps {
    isOpen: boolean;
    employeeData: Employee;
    updateEmployee: (
        updateData:Employee
    ) => void;
    closeModal: () => void;
}

const EditEmployeeModal:React.FC<EditEmployeeModalProps> = (props) => {
    const {
        isOpen,
        employeeData,
        closeModal,
        updateEmployee,
    } = props;
    
    const [newFirstName, setNewFirstName] = useState<string>('');
    const [newLastName, setNewLastName] = useState<string>('');
    const [newAge, setNewAge] = useState<string>('');
    const [newPosition, setNewPosition] = useState<string>('');
    const [newSalary, setNewSalary] = useState<string>('');
    const handleUpdateData = () => {
        updateEmployee({
            id: employeeData.id,
            first_name: newFirstName,
            last_name: newLastName,
            age: newAge,
            position: newPosition,
            salary: newSalary,
        })
        Swal.fire({
            icon: "success",
            title: `ID:${employeeData.id} has been edited`,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            closeModal()
        })
        
    }
    useEffect(() => {
        if (employeeData) {
            setNewFirstName(employeeData.first_name);
            setNewLastName(employeeData.last_name);
            setNewAge(employeeData.age);
            setNewPosition(employeeData.position);
            setNewSalary(employeeData.salary);
        }
    }, [isOpen])

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Employee (ID:{employeeData?.id})</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex justify-content-start">
                            <div>
                                <label className="form-label"> Firstname </label>
                                <input 
                                    value={newFirstName} 
                                    onChange={(e) => setNewFirstName(e.target.value)}
                                    className="form-control" 
                                    type="text" 
                                    required
                                    />
                            </div>
                            <div>
                                <label className="form-label"> Lastname </label>
                                <input 
                                    value={newLastName} 
                                    onChange={(e) => setNewLastName(e.target.value)}
                                    className="form-control" 
                                    type="text" 
                                    required/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start">
                            <div>
                                <label className="form-label"> Age </label>
                                <input 
                                    value={newAge}
                                    onChange={(e) => setNewAge((e.target.value))} 
                                    className="form-control" 
                                    type="number"  
                                    required/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start">
                            <div>
                                <label className="form-label"> Position </label>
                                <input 
                                    value={newPosition} 
                                    onChange={(e) => setNewPosition(e.target.value)}
                                    className="form-control" 
                                    type="text" 
                                    required/>
                            </div>
                            <div>
                                <label className="form-label"> Salary </label>
                                <input 
                                    value={newSalary} 
                                    onChange={(e) => setNewSalary((e.target.value))}
                                    className="form-control" 
                                    type="number" 
                                    required/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={handleUpdateData}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmployeeModal;