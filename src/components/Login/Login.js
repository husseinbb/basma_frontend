import React, { useState, useEffect } from 'react';
import { UserService } from '../../services/UserService';
import { Redirect } from "react-router-dom";
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Card} from '@shopify/polaris';
import { loadReCaptcha } from 'react-recaptcha-v3';
import ReCaptchaV3 from '../ReCaptcha/ReCaptchaV3';


const Login = (props) => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [redirectTo, setRedirectTo] = useState('/login');

    useEffect(()=>{
        loadReCaptcha('6Lfs9PMbAAAAAPTRFkXQSRf2yF-WCAr2W__ZzqHe', () => console.log("as"));
    }, [])


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
            if (res.error || res.message) {
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
                <AppProvider i18n={enTranslations}>
                    <div className="container w-25 text-center mt-5">
                        <Card className="m-4" sectioned>
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
                        </Card>
                    </div>
                    <ReCaptchaV3 />
                </AppProvider>  
            }
        </div>

    )

}

export default Login;