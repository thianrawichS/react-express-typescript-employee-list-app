import { useState, useEffect } from 'react'
import EmployeeListForm from './components/EmployeeListForm'
import EmployeeList from './components/EmployeeList'
import { Employee } from './types/employee'
import { useNavigate } from "react-router-dom";
import AuthService from './services/authen'

function App() {

  const [employee, setEmployee] = useState<Employee[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    AuthService.authenUser(navigate);
  }, []);

  return (
    <div>
      <div className='display-5 mt-5 mb-5 text-center'> Employee Database </div>
      <EmployeeListForm
        employee={employee}
        setEmployee={setEmployee}
      /> 
      <EmployeeList 
        employee={employee}
        setEmployee={setEmployee}
      />
    </div>
  )
}

export default App
