import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Root = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure to Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF0000",
            cancelButtonColor: "#858585",
            confirmButtonText: "Logout"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLogin(false);
                setUsername('');
                localStorage.clear();
                navigate('/')
            }
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogin(true);
            const user = localStorage.getItem('username')
            if (typeof user === 'string'){
                setUsername(user)
            }
        } else {
            setIsLogin(false);
            localStorage.clear()
        }
    }, [location])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand"> BRANDING </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link"> Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/employee' className={isLogin? 'nav-link':'nav-link disabled'}> Employee </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            
                            {isLogin? (
                                <>
                                    <li className="nav-item">
                                        <div className="nav-link disabled"> {username} </div>
                                    </li>
                                    <li className="nav-item">
                                        <button 
                                            className="nav-link" 
                                            type="button"
                                            onClick={handleLogout}
                                        > 
                                            Logout 
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link"> Login </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                <Outlet/>
            </div>
        </>
    )
}

export default Root;