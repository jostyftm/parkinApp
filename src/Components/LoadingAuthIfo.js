import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/UseAuth";

const LoadingAuthIfo = () => {

    const [message, setMessage] = useState('');

    const {
        setIsLoadingPermissions,
        setUserLogged,
        setIsLogged
    } = useAuth();

    const fetchInfoAuth = async () => {

        setMessage('Cargando datos');

        try{

            // const responsePermissions = await me();

            // console.log(responsePermissions);
            
            // if(responsePermissions.data._id) {
            //     setUserLogged(responsePermissions.data);
            //     setIsLogged(true);
                
            //     setIsLoadingPermissions(false);
            // }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {

        fetchInfoAuth();

    }, []);
    return(
        <div 
            className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-center"
        >
            <div 
                className="spinner-border text-primary" 
                role="status"
                style={{width: '3em', height: '3em'}}
            >
                <span className="visually-hidden">Loading...</span>
            </div>  
            <span className="d-block">{message}</span>  
        </div>
    );
}

export default LoadingAuthIfo;