export const API_URL = (process.env.NODE_ENV === 'production') 
    ? process.env.REACT_APP_API_PROD_URL 
    : process.env.REACT_APP_API_LOCAL_URL;

export const WEB_URL = (process.env.NODE_ENV === 'production')
    ? process.env.REACT_APP_API_WEB_PROD_URL
    : process.env.REACT_APP_LOCAL_URL;

export const BASE_NAME_URL = (process.env.NODE_ENV === 'production')
    ? process.env.REACT_APP_BASENAME_PROD_URL
    : '';

export const HOMEPAGE_URL = (process.env.NODE_ENV === 'production')
    ? process.env.REACT_APP_BASENAME_PROD_URL
    : '/';