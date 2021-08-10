import React, { useState } from 'react';
import { UserService } from '../../services/UserService';
import SuccessfullRegistration from './SuccessfullRegistration';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Card} from '@shopify/polaris';

const Register = (props) => {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [isRegistered, setIsRegistered] = useState(false);

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }
 
    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
       setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
     }

    const register = (e) => {
        e.preventDefault();
        const body = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            type: 'customer'
        }
        UserService.register(body).then(res => {
            if (res.error) {
                // to be displayed
                console.log(res.error)
            }
            else {
                setIsRegistered(true);
            }
        }).catch(error => console.log(error))
    }

    if (isRegistered === true) {
        return (
            <SuccessfullRegistration />
        )
    }
    
    return (

        <AppProvider i18n={enTranslations}>
            <div className="container w-25 text-center mt-5">
                <Card className="m-4" sectioned>
                    <h1>Register</h1>
                    <form onSubmit={register}>

                        <div className="m-3 form-group">
                            <input className="form-control" type="text" placeholder="First Name" onChange={handleFirstName} />
                        </div>

                        <div className="m-3 form-group">
                            <input className="form-control" type="text" placeholder="Last Name" onChange={handleLastName} />
                        </div>

                        <div className="m-3 form-group">
                            <input className="form-control" type="text" placeholder="Email" onChange={handleEmail} />
                        </div>

                        <div className="m-3 form-group">
                            <input className="form-control" type="password" placeholder="Password" onChange={handlePassword} />
                        </div>

                        <div>
                            <button className="btn btn-primary text-white">Register</button>
                        </div>
                    </form>
                </Card> 
            </div>
        </AppProvider>
    )

}

export default Register;