import {
    requestDelete,
    requestGet, requestPost, requestPut
} from './Request';

const endpoint = "/clients";

export const getAllClients = (config) => requestGet(endpoint, config);

export const getClient = (id) => requestGet(`${endpoint}/${id}`);

export const saveClient = (data) => requestPost(endpoint, data);

export const updateClient = (id, data) => requestPut(`${endpoint}/${id}`, data);

export const deleteClient = (id) => requestDelete(`${endpoint}/${id}`);

export const verifyClient = data => requestPost(`${endpoint}/verifyClient`, data);