import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';
import { Redirect } from "react-router-dom";


const Logout = (props) => {

    let [redirectTo, setRedirectTo] = useState('/logout');

    const token = localStorage.getItem('token')

    useEffect(()=>{
        if (token) {
            UserService.logout(token).then(res => {
                if (res.success && res.success === true) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('isAuthenticated');
                    props.onChange(false)
                    setRedirectTo('/login');
                }
            }).catch(error => console.log(error))
        }
      },[]) 

    return (
        <div>
            <Redirect to={redirectTo} />
        </div>
    )
}

export default Logout;