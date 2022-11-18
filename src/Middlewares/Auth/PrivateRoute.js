import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from '../../Hooks/UseAuth';
import { LOGIN_PAGE } from "../../Routes/config";
import LoadingAuthIfo from "../../Components/LoadingAuthIfo";

const PrivateRouteMiddleware = ({children}) => {

    let {
            isCheckingSesion, 
            isLogged,
            isLoadingPermissions
        } = useAuth();

    let location = useLocation();
        
    if(!isCheckingSesion && !isLogged){

        return(
            <Navigate 
                to={LOGIN_PAGE} 
                state={{from: location}}
                replace
            />
        );
    }

    if(isLoadingPermissions){
        return <LoadingAuthIfo />
    }

    return children;
}

export default PrivateRouteMiddleware;