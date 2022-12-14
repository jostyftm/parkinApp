import axios from 'axios';

import {
    requestGet,
    requestPost
} from './Request';

import {
    WEB_URL
} from '../Config/enviroments';

const endpointAuth = '/me';

export const login = (data) => {
    return axios.get(`${WEB_URL}/sanctum/csrf-cookie`)
    .then(resp => {
        return requestPost('/login', data)
    });
}

export const myPermissions = () => requestGet(`${endpointAuth}/permissions`);