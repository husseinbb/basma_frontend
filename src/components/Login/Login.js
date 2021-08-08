import React, { useState } from 'react';
import { UserService } from '../../services/UserService';
import { Redirect } from "react-router-dom";

const Login = (props) => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [redirectTo, setRedirectTo] = useState('/login');

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
        UserService.login(body).then(res => {
            if (res.error) {
                // to be displayed
                console.log(res.error)
            }
            else {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("token", res.token);
                setRedirectTo('/dashboard');
                props.onChange(true);
            }
        }).catch(error => console.log(error))
    }
    
    return (
        <div>
            {
            redirectTo !== '/login' ?
                <Redirect to={redirectTo} />
            :
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
            }
        </div>

    )

}

export default Login;