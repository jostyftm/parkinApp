import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Panel from "../../../Components/Shared/Panel";
import { getAllWebsites } from "../../../Services/websiteServices";

const WebsiteListPage = () => {

    const [websites, setWebsites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchWebsites = async () => {

        setIsLoading(true);

        try{
            const responseWebsite = await getAllWebsites();

            console.log(responseWebsite);
        }catch(err){

        }
    }

    useEffect(() => {

        fetchWebsites();
        
    }, []);


    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Sitios webs</h1>
                <Link className="btn btn-sm btn-primary">Nuevo sitio</Link>
            </div>
            <Panel>
                <div>

                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Url</th>
                                <th>Fecha de creación</th>
                                <th>Fecha de actualización</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </Panel>
        </>
    );
}

export default WebsiteListPage;