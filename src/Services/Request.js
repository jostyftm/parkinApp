import API from './AxiosService';

export const requestGet = (url, config) => {
    return new Promise((resolve, reject) => {
        API.get(url, config)
        .then(resp => resolve(resp.data))
        .catch(err => reject(err.response))
    });
}

export const requestPost = (url, data) => {
    return new Promise((resolve, reject) => {
        API.post(url, data)
        .then(resp => resolve(resp.data))
        .catch(err => reject(err.response))
    });
}

export const requestPut = (url, data) => {
    return new Promise((resolve, reject) => {
        API.put(url, data)
        .then(resp => resolve(resp.data))
        .catch(err => reject(err.response))
    })
}

export const requestDelete = url => {
    return new Promise((resolve, reject) => {
        API.delete(url)
        .then(resp => resolve(resp.data))
        .catch(err => reject(err.response))
    })
}