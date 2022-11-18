import { AUTH_USER, TOKEN_AUTH } from "../Config/session";

export const getValue = (key) => {

    let value = localStorage.getItem(key);
    return value;
}

export const saveUserSession = (data) => {

    console.log("Vamos a guardar: ", data);
    try{
        localStorage.setItem(AUTH_USER, JSON.stringify(data.user));
        localStorage.setItem(TOKEN_AUTH, data.token);
    }catch(err) {
        console.error(err)
    }
}

export const removeUserSession = () => {

    try{
        localStorage.removeItem(AUTH_USER);
        localStorage.removeItem(TOKEN_AUTH);
    }catch(err) {
        console.error(err)
    }
}

export const getSession = () => {
    try{

        setTimeout(() => {}, 2000);
        
        const user = JSON.parse(localStorage.getItem(AUTH_USER));
        const token = localStorage.getItem(TOKEN_AUTH);
        
        return Promise.resolve({
            user,
            token
        });
    }catch(err){

        return Promise.reject({
            error: "No se pudo obtener los datos de la sesión"
        });
    }
}