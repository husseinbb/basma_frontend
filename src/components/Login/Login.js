import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';

const Login = (props) => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const handleEmail = (e) => {
       setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
     }

    const login = (e) => {
        e.preventDefault();
        const body = {
            email: email,
            password: password,
        }
        UserService.login(body)
    }
    
    return (
        <div>
            <div className="container w-25 text-center mt-5">
                <h1>Login</h1>
                <form onSubmit={login}>
                    <div className="m-3 form-group">
                        <input className="form-control" type="text" placeholder="Email" onChange={handleEmail} />
                    </div>

                    <div className="m-3 form-group">
                        <input className="form-control" type="password" placeholder="Password" onChange={handlePassword} />
                    </div>

                    <div>
                        <button className="btn btn-primary text-white">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login;