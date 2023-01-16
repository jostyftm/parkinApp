import { requestGet } from './Request';

const endpoint = '/identificationTypes';

export const allIdentificationTypes = (config) => {
    return requestGet(endpoint, config);
}