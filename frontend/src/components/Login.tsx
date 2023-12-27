import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthService from "../services/authen";
import HttpService from "../services/http";
import { SERVER_API_URL } from "../configs/serverApiUrl";

function Login() {
    
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const userLoginData:userLogin = { email, password };

    const userLogin = async (data:userLogin) => {
        try {
            const res = await HttpService.login(SERVER_API_URL, data);
            if (res) {
                if (res.message == 'success'){
                    Swal.fire({
                        icon: "success",
                        title: "Login success",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        localStorage.setItem('token', res.token)
                        localStorage.setItem('username', res.username);
                        navigate('/employee');
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Your email/password is incorrect",
                    });
                }
            }
        } catch (err) {
            console.error('Error loggin in', err)
            localStorage.clear();
            navigate('/login')
        }
    }

    const handleLogin = (e:React.FormEvent) => {
        e.preventDefault();
        userLogin(userLoginData);
        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        AuthService.authenUser(navigate)
    }, [])

    return (
        <div className="container-sm">
            <div className='display-5 text-center mb-5 mt-5'> Login </div>

            <form 
                className="border rounded p-5 "
                onSubmit={handleLogin}
            >
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">"example@email.com"</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type={isShowPassword? 'text': 'password'}
                        className="form-control"
                        value={password}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <div className="mb-3 form-check">
                        <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={() => setIsShowPassword(!isShowPassword)}
                        />
                        <label className="form-check-label">show password</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mb-3">
                    Login
                </button>
                <div>
                    <Link to='/register'> don't have an account? register first </Link>
                </div>
                
            </form>
        </div>
    )
}

export default Login