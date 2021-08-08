import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';

const Logout = (props) => {

    const token = localStorage.getItem('token')

    useEffect(()=>{
        if (token) {
            UserService.logout(token).then(res => {
                if (res.success && res.success === true) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('isAuthenticated');
                    props.onChange(false)
                }
            }).catch(error => console.log(error))
        }
      },[]) 

    return (
        <div>
        </div>
    )
}

export default Logout;