import {
    requestDelete,
    requestGet, requestPost, requestPut
} from './Request';

const endpoint = "/websites";

export const getAllWebsites = (config) => requestGet(endpoint, config);

export const getWebsite = (id) => requestGet(`${endpoint}/${id}`);

export const saveWebsite = (data) => requestPost(endpoint, data);

export const updateWebsite = (id, data) => requestPut(`${endpoint}/${id}`, data);

export const deleteWebsite = (id) => requestDelete(`${endpoint}/${id}`);