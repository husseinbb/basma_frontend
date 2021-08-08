import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';
import ReactPaginate from 'react-paginate';

const Dashboard = (props) => {

    let [customers, setCustomers] = useState(null);

    useEffect(()=>{
        
        const params = getCustomersParams(null)

        UserService.getCustomers(params).then(res => {
            if (res.customers) {
                setCustomers(res.customers)
            }
        }).catch(error => console.log(error))


        // UserService.getAverageCustomers(params).then(res => {
        //     // console.log(res)
        // }).catch(error => console.log(error))
    },[]) 

    const onPageChange = (page) => {
        const params = getCustomersParams(null)

        UserService.getCustomers(params, page.selected).then(res => {
            if (res.customers) {
                setCustomers(res.customers)
            }
        }).catch(error => console.log(error))
    }

    const getCustomersParams = (data) => {
        const token = localStorage.getItem('token')
        const params = {
            token: token ,
        }
        return params
    }

    return (
        (customers) ?
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
                        
                        {Object.entries(customers.data).map(([key, val], index) => {
                            return (
                                <tr key={index} className='text-center'>
                                    <td>{val.first_name}</td>
                                    <td>{val.last_name}</td>
                                    <td>{val.email}</td>
                                </tr>
                            )})}
                    </tbody>
                </table>
                <ReactPaginate 
                    pageCount = {customers.last_page} 
                    onPageChange = {onPageChange}
                />
            </div>
       
        :
        <div></div>
    
        );
}

export default Dashboard;