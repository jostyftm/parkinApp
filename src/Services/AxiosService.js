import axios from "axios";
import {
    API_URL
} from '../Config/enviroments';
import { TOKEN_AUTH } from "../Config/session";
import { getValue } from "../Utils/AuthUtils";


const URL_BASE = `${API_URL}`;

const service = axios.create({
    baseURL:URL_BASE,
    withCredentials: true
});

service.interceptors.request.use(
    config => {

        const token = getValue(TOKEN_AUTH);

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        config.headers['Content-Type'] = 'application/json';

        return config;
    }
);

export default service;