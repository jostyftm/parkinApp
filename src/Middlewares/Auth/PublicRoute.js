import React from 'react';

import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../../Hooks/UseAuth';
import { DASHBOARD_HOME_PAGE } from '../../Routes/config';

const PublicRouteMiddleware = ({children}) => {

    let {isCheckingSesion, isLogged} = useAuth();
    let location = useLocation();

    if(!isCheckingSesion && isLogged){

        return(
            <Navigate 
                to={DASHBOARD_HOME_PAGE} 
                state={{from: location}}
                replace
            />
        );
    }

    return children;
}

export default PublicRouteMiddleware;