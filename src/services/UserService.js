import Axios from 'axios';
import { ConstantsService } from './ConstantsService';

export class UserService {

    static login = (body) => {
        const loginPromise = Axios.post(`${ConstantsService.baseUrl}/login`, body).then(res => {
            console.log(res)
        })
        .catch(error => console.log(error));
        return loginPromise;
    }
}
