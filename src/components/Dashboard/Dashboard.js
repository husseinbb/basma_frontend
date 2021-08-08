import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';

const Dashboard = (props) => {

    let [customers, setCustomers] = useState(null);

    useEffect(()=>{
        const params = {
            token: localStorage.getItem('token'),
            period: 'last_month',
        }

        UserService.getCustomers(params).then(res => {
            if (res.customers) {
                setCustomers(res.customers)
            }
        }).catch(error => console.log(error))


        UserService.getAverageCustomers(params).then(res => {
            // console.log(res)
        }).catch(error => console.log(error))
    },[]) 

    console.log(customers)
    return (
        <div className="container-fluid m-4">
            <table className="table table-striped border" >
                <thead>
                    <tr className="pl-4 text-center">
                        <th >First Name</th>
                        <th >Last Name</th>
                        <th >Email</th>
                    </tr>
                </thead>
                <tbody>
                    {(customers) ?  
                    Object.entries(customers.data).map(([key, val], index) => {
                        return (
                            <tr key={index} className='text-center'>
                                <td>{val.first_name}</td>
                                <td>{val.last_name}</td>
                                <td>{val.email}</td>
                            </tr>
                        )})
                        :
                        <div></div>
                    } 
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;