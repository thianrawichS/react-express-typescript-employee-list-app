import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import HttpService from "../services/http";
import { SERVER_API_URL } from "../configs/serverApiUrl";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: `Register with email : ${email}`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await HttpService.register(SERVER_API_URL, {username, email, password});
                    if (res) {
                        Swal.fire({
                            title: "Registered!",
                            text: "Registration has been completed",
                            icon: "success"
                        }).then(() => {
                            setUsername('');
                            setEmail('');
                            setPassword('')
                            navigate('/login')
                        })
                    }
                } catch (err) {
                    console.error(`Error while register user: ${err}`)
                    Swal.fire({
                        title: "Failed to register",
                        text: "Something went wrong while registering",
                        icon: "error"
                    });
                }
            }
        });
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/')
        }
    }, [])

    return (
        <div className="container-sm">
            <div className="display-5 text-center mb-5 mt-5"> Register </div>
            <form className="border rounded p-5" onSubmit={handleRegister}>
                <div className="mb-3">
                    <label className="form-label"> Username </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={username}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"> Email </label>
                    <input 
                        type="email" 
                        className="form-control"
                        value={email}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"> Password </label>
                    <input 
                        type={showPassword? 'text': 'password'} 
                        className="form-control"
                        value={password}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="form-label ms-2"> Show password </label>
                </div>
                <div>
                    <button className="btn btn-primary" type="submit"> Register </button>
                </div>
            </form>
        </div>
    )
}

export default Register