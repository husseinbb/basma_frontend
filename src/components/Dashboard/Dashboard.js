import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';
import ReactPaginate from 'react-paginate';

const Dashboard = (props) => {

    let [customers, setCustomers] = useState(null);

    let [filterRequestParam, setFilterRequestParam] = useState({email:"", id: 0, firstName: "", pagination: 10});
    let [page, setPage] = useState(0);
    let [error, setError] = useState(null);


    useEffect(()=>{
        
        const params = getCustomersParams()
        UserService.getCustomers(params).then(res => {
            if (res.customers) {
                setCustomers(res.customers)
            }
            else if (res.error) {
                setError(res.error)
            }
        }).catch(error => console.log(error))

        // UserService.getAverageCustomers(params).then(res => {
        //     // console.log(res)
        // }).catch(error => console.log(error))
    }, []) 

    const onPageChange = (page) => {
        const params = getCustomersParams()
        setPage(page)

        UserService.getCustomers(params, page.selected).then(res => {
            if (res.customers) {
                setCustomers(res.customers)
            }
        }).catch(error => console.log(error))
    }

    const getCustomersParams = () => {
        const token = localStorage.getItem('token')
        const params = {
            token: token ,
            first_name: filterRequestParam.first_name ? filterRequestParam.first_name : null,
            email: filterRequestParam.email ? filterRequestParam.email : null,
            id: filterRequestParam.id ? filterRequestParam.id  : null,
            pagination: filterRequestParam.pagination ? filterRequestParam.pagination  : null,
        }
        return params
    }

    const handleFilterByEmail = (e) => {
        setFilterRequestParam({...filterRequestParam, email: e.target.value});
    }

    const handleFilterById = (e) => {
        setFilterRequestParam({...filterRequestParam, id: e.target.value});
    }

    const handleFilterByFirstName = (e) => {
        setFilterRequestParam({...filterRequestParam, firstName: e.target.value});
        }

    const handleAddPagination = (e) => {
        setFilterRequestParam({...filterRequestParam, pagination: e.target.value});
    }

    const filter = (e) => {
        e.preventDefault()
        const params = getCustomersParams()
        UserService.getCustomers(params, page.selected).then(res => {
            if (res.customers) {
                setPage(0)
                setCustomers(res.customers)
            }
        }).catch(error => console.log(error))
    }

    if (error !== null) {
        return (
            <div className="text-center m-5 text-danger">
                <h2>{error}</h2>
            </div>
        )
    }

    return (
        (customers) ?
            <div className="container-fluid m-4">
                <div className="row">
                    <div className="col-md-8">
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
                        containerClassName="container"
                        pageClassName="btn btn-primary m-1"
                        previousClassName="btn btn-primary"
                        nextClassName="btn btn-primary"
                        pageCount = {customers.last_page} 
                        onPageChange = {onPageChange}
                    />
                    </div>
                    <div className="col-md-3">
                        <form onSubmit={filter}>
                            <input className="form-control m-1" type="text" placeholder="Filter by email" onChange={handleFilterByEmail} />
                            <input className="form-control m-1" type="text" placeholder="Filter by first name" onChange={handleFilterByFirstName} />
                            <input className="form-control m-1" type="number" placeholder="Filter by id" onChange={handleFilterById} />
                            <input className="form-control m-1" type="number" placeholder="Filter By number of rows" onChange={handleAddPagination} />
                            <button className="btn btn-primary m-1">Filter</button>
                        </form>
                    </div>
                </div>

            </div>
       
        :
        <div></div>
    
        );
}

export default Dashboard;