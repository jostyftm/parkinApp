import { requestGet } from './Request';

const endpoint = '/vehicleTypes';

export const allVehicleTypes = (config) => {
    return requestGet(endpoint, config);
}