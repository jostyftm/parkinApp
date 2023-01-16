import React, { useEffect, useState } from 'react';
import Panel from '../../../Components/Shared/Panel';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEllipsisH,} from "@fortawesome/free-solid-svg-icons"
import { getAllReservations } from '../../../Services/reservationServices';
import { Link } from 'react-router-dom';
import { RESERVATION_CREATE_PAGE } from '../../../Routes/config';
import ReservationPayModal from '../../../Components/Reservations/Pay';

const ReservationListPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [reservationSelected, setReservationSelected] = useState('');

    const fetchReservations = async () => {

        try{

            const response = await getAllReservations();
            setReservations(response.data);

        }catch(err){

        }
    }

    useEffect(() => {

        fetchReservations();

        return () => {
            setReservations([]);
        }
    }, []);

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Reservaciones</h1>
                <Link 
                    className='btn btn-sm btn-primary'
                    to={RESERVATION_CREATE_PAGE}
                >
                    Nueva resrvación
                </Link>
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
                                    <td>{reservation.started_at}</td>
                                    <td>{reservation.finished_at}</td>
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
                                                {reservation.reservation_state_id == 1 && (
                                                    <>
                                                    <li>
                                                        <button
                                                            className="dropdown-item text-default"
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#modalEditSearch"
                                                            onClick={(e) => setReservationSelected(reservation.id)}
                                                        >
                                                            
                                                            Editar reserva
                                                        </button>
                                                    </li>
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
                                                            className="dropdown-item text-danger"
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#modalDeleteReservation"
                                                            onClick={(e) => setReservationSelected(reservation.id)}
                                                        >
                                                            Cancelar reserva
                                                        </button>
                                                    </li>
                                                    </>
                                                )}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ReservationPayModal
                    id="modalPayReservation"
                    reservationId={reservationSelected}
                    onPaid={(result) => console.log(result)}
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