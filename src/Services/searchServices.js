import {
    requestDelete,
    requestGet, requestPost, requestPut
} from './Request';

const endpoint = "/searches";

export const getAllSearches = (config) => requestGet(endpoint, config);

export const getSearch = (id) => requestGet(`${endpoint}/${id}`);

export const saveSearch = (data) => requestPost(endpoint, data);

export const updateSearch = (id, data) => requestPut(`${endpoint}/${id}`, data);

export const deleteSearch = (id) => requestDelete(`${endpoint}/${id}`);