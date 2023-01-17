import React, { useEffect, useState } from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEllipsisH,} from "@fortawesome/free-solid-svg-icons"

import Panel from "../../../Components/Shared/Panel";
import UserCreateModal from "../../../Components/User/Create";

import { getAllUsers } from "../../../Services/userServices";

import Moment from 'react-moment';

const UserListPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [userSelected, setUSerSelected] = useState('');


    const fetchUser = async () => {

        setIsLoading(true);

        try{
            const response = await getAllUsers();
            setUsers(response.data);
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);

        }
    }

    useEffect(() => {

        fetchUser();
        
    }, [])

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Empleados</h1>
                <button 
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal" 
                    data-bs-target="#modalCreateUser"
                >
                    Nuevo empleado
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
                                <th>email</th>
                                <th>Fecha de creación</th>
                                <th>Fecha de actualización</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.user?.id}</td>
                                    <td>{employee.user?.name}</td>
                                    <td>{employee.user?.email}</td>
                                    <td>
                                        <Moment format="LLL">
                                            {employee.user?.created_at}
                                        </Moment>
                                    </td>
                                    <td>
                                        <Moment format="LLL">
                                            {employee.user?.updated_at}
                                        </Moment>
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-sm rounded-pill btn-primary"
                                                data-bs-toggle="dropdown" 
                                                aria-expanded="false"
                                                type="button"
                                                id="employee"
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
                                                        onClick={(e) => setUSerSelected(employee.id)}
                                                    >
                                                        Editar usuario
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item text-danger"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalDeleteUser"
                                                        onClick={(e) => setUSerSelected(employee.id)}
                                                    >
                                                        Eliminar usuario
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
                <UserCreateModal 
                    id="modalCreateUser"
                    onCreate={(result) => {if(result){fetchUser()}}}
                />
                {/* <WebsiteEditModal 
                    id="modalEditWebsite"
                    webisteId={websiteSelected}
                    onUpdate={(result) => {if(result){fetchWebsites()}}}
                />
                <WebsiteCreateModal
                    id="modalAddWebsite"
                    onCreate={(result) => {if(result){fetchWebsites()}}}
                /> */}
            </Panel>
        </>
    );
}

export default UserListPage;