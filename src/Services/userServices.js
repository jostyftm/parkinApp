import {
    requestDelete,
    requestGet, requestPost, requestPut
} from './Request';

const endpoint = "/employees";

export const getAllUsers = (config) => requestGet(endpoint, config);

export const getUser = (id) => requestGet(`${endpoint}/${id}`);

export const saveUser = (data) => requestPost(endpoint, data);

export const updateUser = (id, data) => requestPut(`${endpoint}/${id}`, data);

export const deleteUser = (id) => requestDelete(`${endpoint}/${id}`);