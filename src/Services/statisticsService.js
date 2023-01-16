import {
    requestGet
} from './Request';

const endpoint = "/statistics";

export const reservationByState = () => requestGet(`${endpoint}/reservationByState`);
export const reservationByDay = () => requestGet(`${endpoint}/reservationByDay`);
export const registrationclient = () => requestGet(`${endpoint}/registrationclient`);
export const raisedMoney = () => requestGet(`${endpoint}/raisedMoney`);
