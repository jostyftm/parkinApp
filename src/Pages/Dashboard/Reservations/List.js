import React, { useEffect, useState } from 'react';
import Panel from '../../../Components/Shared/Panel';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEllipsisH,} from "@fortawesome/free-solid-svg-icons"
import { getAllReservations } from '../../../Services/reservationServices';
import { Link } from 'react-router-dom';
import { PRINT_RESVERATION_IN_ROUTE, PRINT_RESVERATION_OUT_ROUTE, RESERVATION_CREATE_PAGE } from '../../../Routes/config';
import ReservationPayModal from '../../../Components/Reservations/Pay';
import { PRINT_TICKET_RESERVATION_ROUTE } from '../../../Config/routes';
import { printReservationIn, printReservationOut } from '../../../Services/printService';
import { downloadFile } from '../../../Utils/DownloadFile';

import useAuth from '../../../Hooks/UseAuth';
import Pagination from '../../../Components/Pagination';
import Moment from 'react-moment';
import ReservationCancelModal from '../../../Components/Reservations/Cancel';

const ReservationListPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [reservationSelected, setReservationSelected] = useState('');

    const [links, setLinks] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const {userLogged} = useAuth();

    const fetchReservations = async () => {

        try{

            const response = await getAllReservations({
                params:{
                    paginate:true,
                    page:currentPage,
                    q:query,
                    limit:6
                }
            });
            setReservations(response.data.data);
            setLinks(response.data.links);

        }catch(err){

        }
    }

    const downloadReservation = async (reservationId, type) => {
        
        let response;

        try{
            if(type == 'in'){

                response = await printReservationIn(reservationId, {
                    responseType: 'blob',
                    params:{
                        printedBy: userLogged.id
                    }
                });
            }else if(type == 'out'){
                
                response = await printReservationOut(reservationId, {
                    responseType: 'blob',
                    params:{
                        printedBy: userLogged.id
                    }
                });
            }

            downloadFile(response, "ticketOut");

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {

        fetchReservations();

        return () => {
            setReservations([]);
        }
    }, [query, currentPage]);

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Reservaciones</h1>
            </div>
            <div className="d-flex justify-content-between">
                <div>
                    <Link 
                        className='btn btn-sm btn-primary'
                        to={RESERVATION_CREATE_PAGE}
                    >
                        Nueva resrvación
                    </Link>
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
            <Panel>
                <div>

                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Estado</th>
                                <th>Cliente</th> 
                                <th>Tipo Vehiculo</th>
                                <th>Precio</th>
                                <th>Hora de llegada</th>
                                <th>Hora de salida</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations?.map((reservation, index) => (
                                <tr key={index}>
                                    <td>{reservation.id}</td>
                                    <td>
                                        <span 
                                            className='badge'
                                            style={
                                                {backgroundColor: reservation.reservation_state?.bg_color, 
                                                color: reservation.reservation_state?.text_color}
                                            }
                                        >{reservation.reservation_state?.name}</span>
                                    </td>
                                    <td>{`${reservation.client?.user?.name} ${reservation.client?.user?.identification_number} `}</td>
                                    <td>{reservation.vehicle_type?.name}</td>
                                    <td>{reservation.hour_price}</td>
                                    <td>
                                        <Moment format='LLL'>
                                            {reservation.started_at}
                                        </Moment>
                                    </td>
                                    <td>
                                        <Moment format='LLL'>
                                            {reservation?.finished_at || ''}    
                                        </Moment>
                                    </td>
                                    <td>
                                        {reservation.reservation_state_id !== 3 && (
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
                                                    {reservation.reservation_state_id == 1 && (
                                                        <>
                                                        <li>
                                                            <button
                                                                className="dropdown-item text-default"
                                                                data-bs-toggle="modal" 
                                                                data-bs-target="#modalPayReservation"
                                                                onClick={(e) => setReservationSelected(reservation.id)}
                                                            >
                                                                
                                                                Cobrar
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                onClick={(e) => setReservationSelected(reservation.id)}
                                                                className="dropdown-item text-danger"
                                                                data-bs-toggle="modal" 
                                                                data-bs-target="#modalCanceledReservation"
                                                            >
                                                                Cancelar reserva
                                                            </button>
                                                        </li>
                                                        </>
                                                    )}
                                                    {reservation.reservation_state_id == 2 && (
                                                        <>
                                                            <li>
                                                                <a
                                                                    className='dropdown-item'
                                                                    target={"_blank"}
                                                                    href={PRINT_RESVERATION_OUT_ROUTE(reservation.id, userLogged.id)}
                                                                >
                                                                    Imprimir recibo
                                                                </a>
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
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
                <ReservationPayModal
                    id="modalPayReservation"
                    reservationId={reservationSelected}
                    onPaid={(result) => {if(result){fetchReservations()}}}
                />
                <ReservationCancelModal 
                    id="modalCanceledReservation"
                    reservationId={reservationSelected}
                    onCanceled={(result) => {if(result){fetchReservations()}}}

                />
                {/* <SearchCreateModal
                    id="modalAddSearch"
                    websites={websites}
                    onCreate={(result) => {if(result){fetchSearches()}}}
                    /> 
                <SearchEditModal 
                    id="modalEditSearch"
                    websites={websites}
                    searchId={searchSelected}
                    onUpdate={(result) => {if(result){fetchSearches()}}}
                /> */}
            </Panel>
        </>
    );
}

export default ReservationListPage;