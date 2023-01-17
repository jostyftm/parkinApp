import {
    requestGet
} from './Request';

export const endpoint = '/prints';

export const printReservationIn = (id, config) => requestGet(`${endpoint}/${id}/reservationIn`);
export const printReservationOut = (id, config) => requestGet(`${endpoint}/${id}/reservationOut`);