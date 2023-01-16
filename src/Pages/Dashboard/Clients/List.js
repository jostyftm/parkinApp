import React, { useEffect, useState } from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEllipsisH,} from "@fortawesome/free-solid-svg-icons"

import Panel from "../../../Components/Shared/Panel";

import { getAllClients } from "../../../Services/clientService";
import ClientCreateModal from "../../../Components/Clients/Create";
import ClientEditModal from "../../../Components/User/Edit";
import UserEditModal from "../../../Components/User/Edit";

const ClientListPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [userSelected, setUserSelected] = useState('');


    const fetchClients = async () => {

        setIsLoading(true);

        try{
            const response = await getAllClients();
            setClients(response.data);
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);

        }
    }

    useEffect(() => {

        fetchClients();
        
    }, [])

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Clientes</h1>
                <button 
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal" 
                    data-bs-target="#modalCreateUser"
                >
                    Nuevo cliente
                </button>
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
                                <th>Identificación</th>
                                <th>Email</th>
                                <th>Fecha de creación</th>
                                <th>Fecha de actualización</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients?.map((client, index) => (
                                <tr key={index}>
                                    <td>{client.user?.id}</td>
                                    <td>{client.user?.name}</td>
                                    <td>{`${client.user?.identification_type?.prefix} ${client.user?.identification_number}`}</td>
                                    <td>{client.user?.email}</td>
                                    <td>{client.created_at}</td>
                                    <td>{client.updated_at}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-sm rounded-pill btn-primary"
                                                data-bs-toggle="dropdown" 
                                                aria-expanded="false"
                                                type="button"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEllipsisH}
                                                />
                                            </button>
                                            <ul
                                                className="dropdown-menu shadow border-0 rounded"
                                            >
                                                <li>
                                                    <button
                                                        className="dropdown-item text-default"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalEditUser"
                                                        onClick={(e) => setUserSelected(client.user_id)}
                                                    >
                                                        Editar cliente
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item text-danger"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalDeleteUser"
                                                        onClick={(e) => setUserSelected(client.user_id)}
                                                    >
                                                        Eliminar cliente
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ClientCreateModal 
                    id="modalCreateUser"
                    onCreate={(data) => {if(data.result){fetchClients()}}}
                />
                <UserEditModal 
                    id="modalEditUser"
                    userId={userSelected}
                    onUpdate={(result) => {if(result){fetchClients()}}}
                />
                {/* <WebsiteCreateModal
                    id="modalAddWebsite"
                    onCreate={(result) => {if(result){fetchWebsites()}}}
                /> */}
            </Panel>
        </>
    );
}

export default ClientListPage;