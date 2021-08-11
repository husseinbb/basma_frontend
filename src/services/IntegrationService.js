import Axios from 'axios';
import { ConstantsService } from './ConstantsService';



export class IntegrationService {


    static verfiyReCaptchaResponse = (body) => {
        const promise = Axios.post(`${ConstantsService.baseUrl}/verify-recaptcha`, body).then(res => ({
            ...IntegrationService.parseVerifyReCaptcha(res.data)
        }));
        return promise;
    }

    static parseVerifyReCaptcha(data) {
        const parsedData = {
            success: data.success,
            hostname: data.hostname,
        };
        return parsedData
    }

}