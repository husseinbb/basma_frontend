import Axios from 'axios';
import { ConstantsService } from './ConstantsService';

export class UserService {

    static login = (body) => {
        const loginPromise = Axios.post(`${ConstantsService.baseUrl}/login`, body).then(res => ({
            ...UserService.parseLoginData(res.data)
        }));
        return loginPromise;
    }

    static parseLoginData(data) { 
        const parsedData = {
            token: data.token,
            error: data.error
        };
        return parsedData
    }

    static register = (body) => {
        const registerPromise = Axios.post(`${ConstantsService.baseUrl}/register`, body).then(res => ({
            ...UserService.parseRegisterData(res.data)
        }));
        return registerPromise;
    }

    static parseRegisterData(data) {
        const parsedData = {
            type: data.type,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            error: data.error
        };
        return parsedData
    }

    static logout = (token) => {
        const logoutPromise = Axios.get(`${ConstantsService.baseUrl}/logout/?token=${token}`).then(res => ({
            ...UserService.parseLogoutData(res.data)
        }));
        return logoutPromise;
    } 

    static parseLogoutData(data) {
        const parsedData = {
            message: data.message,
            error: data.error,
            success: data.success,
        };
        return parsedData
    }

    static getCustomers = (params, page = null) => {
        let url = `${ConstantsService.baseUrl}/customers`
        if (page) {
            url = `${ConstantsService.baseUrl}/customers?page=${page}`
        }
        const customersPromise = Axios.get(url, {params: params}).then(res => ({
            ...UserService.parseCustomersData(res.data)
        }));
        return customersPromise;
    } 

    static parseCustomersData(data) {
        const parsedData = {
            success: data.success,
            customers: data.customers,
            error: data.error,
        };
        return parsedData
    }

    static getAverageCustomers = (params) => {
        const averageCustomersPromise = Axios.get(`${ConstantsService.baseUrl}/customers/average-registered`, {params: params}).then(res => ({
            ...UserService.parseAverageCustomersData(res.data)
        }));
        return averageCustomersPromise;
    } 

    static parseAverageCustomersData(data) {
        const parsedData = {
            success: data.success,
            average: data.average,
            error: data.error,
        };
        return parsedData
    }
}
