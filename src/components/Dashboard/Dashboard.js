import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';
import ReactPaginate from 'react-paginate';
import { Line } from 'react-chartjs-2';

const Dashboard = (props) => {

    let [customers, setCustomers] = useState(null);

    let [filterRequestParam, setFilterRequestParam] = useState({email:"", id: 0, firstName: "", pagination: 10});
    let [page, setPage] = useState(0);
    let [error, setError] = useState(null);
    let [period, setPeriod] = useState("last_24_hours");
    let [averageData, setAverageData] = useState([]);

    let [chartDataDate, setChartDataDate] = useState([]);
    let [chartDataCount, setChartDataCount] = useState([]);

    const token = localStorage.getItem('token')


    useEffect(()=>{
        
        getCustomers()
        
        getAverageRegisteredCustomers()
       
    }, [period])

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

    const handleselectDate = (e) => {
        const val = (e.target.value)
        console.log(val)
        setPeriod(val)
        getAverageRegisteredCustomers()
    }


    const chartData = {
        labels: chartDataDate,
        datasets: [
            {
                data: chartDataCount,
                borderColor:[
                    '#000',
                ],
                backgroundColor:[
                    '#6960EC',
                ]
            }
        ]
    }

    const chartOptions = {
        title:{
            display: true,
            text: 'Line Chart',
        }
    }

    const onPageChange = (page) => {
        setPage(page)

        getCustomers()
    }


    const updateChartData = () => {
        let dates = []
        let counts = []
        averageData.forEach(average => {
            dates.push(average.date)
            counts.push(average.count)
        })
        setChartDataCount(counts)
        setChartDataDate(dates)
    }

    const getCustomers = () => {
        const params = getCustomersParams()
        UserService.getCustomers(params).then(res => {
            if (res.customers) {
                setCustomers(res.customers)
            }
            else if (res.error) {
                setError(res.error)
            }
        }).catch(error => console.log(error))
    }

    const getAverageRegisteredCustomers = () => {
        UserService.getAverageCustomers(getAverageCustomersParams()).then(res => {
            if (res.average) {
                setAverageData(res.average);
                updateChartData()
            }
        }).catch(error => console.log(error))
    }


    const getCustomersParams = () => {
        const params = {
            token: token ,
            first_name: filterRequestParam.first_name ? filterRequestParam.first_name : null,
            email: filterRequestParam.email ? filterRequestParam.email : null,
            id: filterRequestParam.id ? filterRequestParam.id  : null,
            pagination: filterRequestParam.pagination ? filterRequestParam.pagination  : null,
        }
        return params
    }

    const getAverageCustomersParams = () => {
        const params = {
            token: token ,
            period: period,
        }
        return params
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
        <div>
            {(customers !== null) ?
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
            }
            <div className="container"> 
            <div className="text-center m-3">
                <h3>Average Registration</h3>
            </div>  
            {averageData ?
                <div className="row">
                    <div className="col-md-8">
                        
                        <div  style={{
                            width: '600px',
                            height: '300px'
                        }}>
                        <Line data = {chartData} options = {chartOptions} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <select className="btn btn-primary mt-5" onChange={handleselectDate}>
                            <option value="last_24_hours">Last 24 hours</option>
                            <option value="last_week">Last week</option>
                            <option value="last_month">Last month</option>
                            <option value="last_3_months">Last 3 months</option>
                            <option value="last_year">Last year</option>
                        </select>
                    </div>
            </div>
            :
            <div></div>
            }
            </div>                           
        </div>
    
        );
}

export default Dashboard;