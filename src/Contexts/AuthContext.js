import React, { createContext, useEffect, useState } from 'react';
import { getSession } from '../Utils/AuthUtils';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [isLoadingPermissions, setIsLoadingPermissions] = useState(false);
    const [isCheckingSesion, setIsCheckingSesion] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const [userLogged, setUserLogged] = useState({});
    const [permissions, setPermissions] = useState([])

    const getUserAuth = async () => {

        const data = await getSession();

        if(data.user){
            setIsLogged(true);
            setUserLogged(data.user);
        }

        setIsCheckingSesion(false);
    }

    useEffect(() => {

        getUserAuth();

        return () => {
            setUserLogged({})
        }
    }, [])

    const data = {
        isLoadingPermissions,
        setIsLoadingPermissions,
        permissions,
        setPermissions,
        isCheckingSesion,
        isLogged,
        setIsLogged,
        userLogged,
        setUserLogged
    };

     return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;