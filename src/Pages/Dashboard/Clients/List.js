import React, { useEffect, useState } from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEllipsisH,} from "@fortawesome/free-solid-svg-icons"

import Panel from "../../../Components/Shared/Panel";

import { getAllClients } from "../../../Services/clientService";
import ClientCreateModal from "../../../Components/Clients/Create";
import ClientEditModal from "../../../Components/User/Edit";
import UserEditModal from "../../../Components/User/Edit";
import Pagination from "../../../Components/Pagination";
import Moment from 'react-moment';

const ClientListPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [userSelected, setUserSelected] = useState('');

    const [links, setLinks] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchClients = async () => {

        setIsLoading(true);

        try{
            const response = await getAllClients({
                params:{
                    paginate:true,
                    page:currentPage,
                    q:query,
                    limit:10
                }
            });
            setClients(response.data.data);
            setLinks(response.data.links);
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);

        }
    }

    useEffect(() => {

        fetchClients();
        
    }, [query, currentPage])

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Clientes</h1>
                
            </div>
            <Panel>
                <div className="d-flex justify-content-between">
                    <div>
                        <button 
                            className="btn btn-sm btn-primary"
                            data-bs-toggle="modal" 
                            data-bs-target="#modalCreateUser"
                        >
                            Registrar cliente
                        </button>
                    </div>
                    <div className="input-group mb-3 w-25">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="seguro..." 
                            onChange={(e) =>{setQuery(e.target.value)}}
                        />
                    </div>
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
                                    <td>
                                        <Moment format="LLL">
                                            {client.created_at}
                                        </Moment>
                                    </td>
                                    <td>
                                        <Moment format="LLL">
                                            {client.updated_at}
                                        </Moment>
                                    </td>
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
                                                {/* <li>
                                                    <button
                                                        className="dropdown-item text-danger"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalDeleteUser"
                                                        onClick={(e) => setUserSelected(client.user_id)}
                                                    >
                                                        Eliminar cliente
                                                    </button>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination 
                        links={links} 
                        handleClickPagination={
                            (e, page) => {
                                e.preventDefault();
                                setCurrentPage(page)
                            }
                        } 
                    />
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