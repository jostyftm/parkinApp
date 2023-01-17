import {
    requestDelete,
    requestGet, requestPost, requestPut
} from './Request';

const endpoint = "/reservations";

export const getAllReservations = (config) => requestGet(endpoint, config);

export const getReservation = (id) => requestGet(`${endpoint}/${id}`);

export const saveReservation = (data) => requestPost(endpoint, data);

export const updateReservation = (id, data) => requestPut(`${endpoint}/${id}`, data);

export const deleteReservation = (id) => requestDelete(`${endpoint}/${id}`);

export const payReservation = (id) => requestPost(`${endpoint}/${id}/payReservation`);

export const cancelReservation = (id) => requestPost(`${endpoint}/${id}/cancelReservation`);