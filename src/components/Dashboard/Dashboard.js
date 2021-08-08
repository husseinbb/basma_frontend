import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';

const Dashboard = (props) => {

    useEffect(()=>{
        const params = {
            token: localStorage.getItem('token'),
            period: 'last_month',
        }

        UserService.getCustomers(params).then(res => {
            console.log(res)
        }).catch(error => console.log(error))


        UserService.getAverageCustomers(params).then(res => {
            console.log(res)
        }).catch(error => console.log(error))
    },[]) 

    return (
        <div>asdasdasf</div>
    );
}

export default Dashboard;