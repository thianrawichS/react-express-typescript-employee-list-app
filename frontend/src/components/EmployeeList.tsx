import { Employee } from "../types/employee"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import EditEmployeeModal from "./EditEmployeeModal";
import PaginationPage from "./PaginationPage";
import YourSearchInput from "./YourSearchInput";
import Swal from "sweetalert2";
import HttpService from "../services/http";
import AuthService from "../services/authen";

interface EmployeeListProps {
    employee: Employee[];
    setEmployee: React.Dispatch<React.SetStateAction<Employee[]>>
}

const EmployeeList:React.FC<EmployeeListProps> = (props) => {
    const {
        employee,
        setEmployee
    } = props;
    const SERVER_API_URL:string = import.meta.env.VITE_SERVER_API;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Get employee data
    const getEmployee = async () => {
        setIsLoading(true)
        try {
        const employeeData = await HttpService.getEmployeeData(SERVER_API_URL);
        if (employeeData) {
            setEmployee(employeeData.results);
            setIsLoading(false);
        }
        } catch (err) {
        console.error(`Error fetching data: ${err}`)
        }
    }
    
    // Search employee name
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>('');
    const [searchName, setSearchName] = useState<string>('');
    const searchEmployeeName = async (name:string): Promise<void> => {
        const res = await HttpService.getEmployeeData(SERVER_API_URL, name);
        if (res) {
            setEmployee(res.results);
        }
    }
    const handleSearch = (e:React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim() !== '') {
            searchEmployeeName(searchInput);
            setIsSearch(true);
        }
        setSearchName(searchInput)
        setSearchInput('');
    }
    const cancelSearch = () => {
        setIsSearch(false);
        searchEmployeeName(' ');
    }

    // Delete employee
    const deleteEmployee = async (id: number) => {
        if (typeof id !== 'undefined') {
        try {
            const res = await HttpService.deleteEmployeeData(SERVER_API_URL, id)
            if (res) {
            setEmployee(employee.filter(e => e.id !== id));
            }
        } catch (err) {
            console.error(`Error deleting data: ${err}`)
        }
        }
    }
    const handleDeleteEmployee = (id:number) => {
        Swal.fire({
            title: `Are you sure to delete ID:${id}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEmployee(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    // Edit Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>({
        id:NaN,
        first_name:'',
        last_name:'',
        position:'',
        salary:'',
        age:''
    });
    const updateEmployee = async (updateData:Employee) => {
        const newEmployeeData = {
            first_name: updateData.first_name,
            last_name: updateData.last_name,
            age: updateData.age,
            position: updateData.position,
            salary: updateData.salary
        }
        try {
            const res = await HttpService.putEmployeeData(SERVER_API_URL, newEmployeeData, updateData.id)
            console.log(res)
            if (!res.results || res.signIn === false) {
            AuthService.authenUser(navigate);
            return
            }
            const updatedEmployees = employee.map(emp => {
            if (emp.id == updateData.id) {
                return {...emp, ...newEmployeeData};
            }
            return emp;
            })
            setEmployee(updatedEmployees)
        } catch (err) {
            console.error(`Error updating employee data: ${err}`)
        }
    }
    const openModal = (person: Employee) => {
        setSelectedEmployee(person);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    // Pagination config
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [itemPerPage, setItemPerPage] = useState<number>(10);
    const startIndex = currentPage * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const slicedItem = [...employee].reverse().slice(startIndex, endIndex)
    const handleChangePage = (selectedPage: {selected:number}) => {
        setCurrentPage(selectedPage.selected)
    }
    const handleChangeItemPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemPerPage(parseInt(e.target.value));
    }

    useEffect(() => {
        getEmployee()
    }, [])

    useEffect(() => {
        setTotalPage(Math.ceil(employee.length / itemPerPage));
        setCurrentPage(0);
    }, [employee, itemPerPage]);

    return (
        <div className="container-sm mt-3">
            <form className="d-flex">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Employee's firstname"
                    value={searchInput}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSearch}
                    >
                    search
                </button>
            </form>
            <YourSearchInput
                isSearch={isSearch}
                cancelSearch={cancelSearch}
                searchName={searchName}
            />
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> FIRSTNAME </th>
                            <th> LASTNAME </th>
                            <th> AGE </th>
                            <th> POSITION </th>
                            <th> SALARY </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr >
                                <td colSpan={6}>
                                    <Loading/>
                                </td>
                            </tr>
                        ) : (
                            slicedItem.map(person => (
                                <tr key={person.id}>
                                    <td> {person.id} </td>
                                    <td> {person.first_name} </td>
                                    <td> {person.last_name} </td>
                                    <td> {person.age} </td>
                                    <td> {person.position} </td>
                                    <td> {person.salary} </td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            type="button"
                                            onClick={() => openModal(person)}
                                        >
                                            Edit
                                        </button> 
                                        <button 
                                            className="btn btn-danger" 
                                            type="button"
                                            onClick={() => handleDeleteEmployee(person.id)}
                                            >
                                            DEL
                                        </button> 
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <PaginationPage
                    handleChangeItemPerPage={handleChangeItemPerPage}
                    handleChangePage={handleChangePage}
                    itemPerPage={itemPerPage}
                    totalPage={totalPage}
                    currentPage={currentPage}
                />
            </div>
            
            <EditEmployeeModal
                isOpen = {isModalOpen}
                closeModal = {closeModal}
                employeeData = {selectedEmployee}
                updateEmployee = {updateEmployee}
            />
            
        </div>
    )
}

export default EmployeeList