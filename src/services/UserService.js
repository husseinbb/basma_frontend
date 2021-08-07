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
}
