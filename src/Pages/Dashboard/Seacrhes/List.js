import React, { useEffect, useState } from 'react';
import SearchCreateModal from '../../../Components/Search/Create';
import Panel from '../../../Components/Shared/Panel';
import { getAllSearches } from '../../../Services/searchServices';
import { getAllWebsites } from '../../../Services/websiteServices';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEllipsisH,} from "@fortawesome/free-solid-svg-icons"
import SearchEditModal from '../../../Components/Search/Edit';

const SearchListPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [websites, setWebsites] = useState([]);
    const [searches, setSearches] = useState([]);
    const [searchSelected, setSearchSeledted] = useState('');

    const fetchWebsites = async () => {

        try{

            const response = await getAllWebsites();
            setWebsites(response.data);

        }catch(err){

        }
    }

    const fetchSearches = async () =>{
       
    
        setIsLoading(true);
        
        try{
            
            const response = await getAllSearches();
            setSearches(response.data);

            setIsLoading(false);
        }catch(err){
            setIsLoading(false);

        }
    }


    useEffect(() => {

        fetchSearches();
        fetchWebsites();

        return () => {
            setWebsites([]);
            setSearches([]);
        }
    }, []);

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Busquedas</h1>
                <button 
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal" 
                    data-bs-target="#modalAddSearch"
                >
                    Nueva busqueda
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
                                <th>Consulta</th>
                                {/* <th>Estado</th> */}
                                <th>Sitio web</th>
                                <th>Fecha de creación</th>
                                <th>Fecha de actualización</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {searches?.map((search, index) => (
                                <tr key={index}>
                                    <td>{search.id}</td>
                                    <td>{search.query}</td>
                                    {/* <td>{search.is_active}</td> */}
                                    <td><span className="badge bg-primary">{search.website?.url}</span></td>
                                    <td>{search.created_at}</td>
                                    <td>{search.updated_at}</td>
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
                                                        data-bs-target="#modalEditSearch"
                                                        onClick={(e) => setSearchSeledted(search.id)}
                                                    >
                                                        
                                                        Editar busqueda
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item text-danger"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalDeleteSearch"
                                                        onClick={(e) => setSearchSeledted(search.id)}
                                                    >
                                                        Eliminar busqueda
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
                <SearchCreateModal
                    id="modalAddSearch"
                    websites={websites}
                    onCreate={(result) => {if(result){fetchSearches()}}}
                    /> 
                <SearchEditModal 
                    id="modalEditSearch"
                    websites={websites}
                    searchId={searchSelected}
                    onUpdate={(result) => {if(result){fetchSearches()}}}
                />
            </Panel>
        </>
    );
}

export default SearchListPage;