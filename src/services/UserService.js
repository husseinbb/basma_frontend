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
}
