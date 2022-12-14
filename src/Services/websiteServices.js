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

// Configuration
export const getWebsiteConfiguration = (websiteId) => requestGet(`${endpoint}/${websiteId}/configuration`);

export const updateWebsiteConfiguration = (id, data) => requestPut(`${endpoint}/${id}/configuration`, data);

export const testWebsiteConfiguration = (id, data) => requestPost(`${endpoint}/${id}/test`, data);