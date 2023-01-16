import axios from "axios";
import {
    API_URL
} from '../Config/enviroments';
import { AUTH_USER, TOKEN_AUTH } from "../Config/session";
import { getValue } from "../Utils/AuthUtils";


const URL_BASE = `${API_URL}`;

const service = axios.create({
    baseURL:URL_BASE,
    withCredentials: true
});

service.interceptors.request.use(
    config => {

        const token = getValue(TOKEN_AUTH);
        const userAuth = JSON.parse(getValue(AUTH_USER));

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
            config.headers['userAuth'] = userAuth.id;
        }
        

        config.headers['Content-Type'] = 'application/json';

        return config;
    }
);

export default service;