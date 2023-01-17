import React, { useEffect, useRef, useState } from "react";
import ClientCreateModal from "../../../Components/Clients/Create";
import Panel from "../../../Components/Shared/Panel";
import { PRINT_RESVERATION_IN_ROUTE, RESERVATION_LIST_PAGE } from "../../../Routes/config";
import { verifyClient } from "../../../Services/clientService";
import { allIdentificationTypes } from "../../../Services/idenfitifacionTypeService";
import { allVehicleTypes } from "../../../Services/vehicleTypes";
import { saveReservation } from "../../../Services/reservationServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

import useAuth  from '../../../Hooks/UseAuth';

const ReservationCreatePage = () => {

    const [iTypes, setIdentificationTypes] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [clientSelected, setClientSelected] = useState({});
    const [reservation, setReservation] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [isCreated, setIsCreated] = useState(true);
    const [errors, setErrors] = useState([]);
    
    const formCreateReservationRef = useRef(null);

    const {userLogged} = useAuth();

    const handleCreateReservation = async(e) => {
        e.preventDefault();

        setErrors([]);
        setIsLoading(true);
        try{

            const formData = new FormData(formCreateReservationRef.current);
            formData.append('client_id', clientSelected.client?.id);

            const response = await saveReservation(formData);
            
            setReservation(response.data);

            setIsCreated(true);
            setIsLoading(false);
        }catch(err){
            setIsCreated(false);
            setIsLoading(false);

            if(err.status === 422){
                setErrors(err.data.errors);
            }
        }
    }

    const handleSearchClient = async(e) => {
        e.preventDefault();

        console.log(e);

        setIsLoading(true);
        setErrors([])
        setClientSelected(null)

        try{

            const formData = new FormData(formCreateReservationRef.current);

            const responseClient = await verifyClient({
                identification_type_id: formData.get('identification_type_id'),
                identification_number: formData.get('identification_number')
            });

            setClientSelected(responseClient.data);
        }catch(err){
            console.log(err)

            if(err.status === 422)
                setErrors(err.data.errors);
        }

        setIsLoading(false);
    }

    const fetchData = async() => {

        setIsLoading(true);
        try{
            const responseIType = await allIdentificationTypes();
            const vehicleTypesResponse = await allVehicleTypes();

            setIdentificationTypes(responseIType.data);
            setVehicleTypes(vehicleTypesResponse.data);

        }catch(err){
            console.log(err)
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();

        return () => {
            setIdentificationTypes([]);
        }
    }, []);

    return(
        <>
            <div className="d-flex j
        ustify-content-between align-items-center">
                <h1>Crear reservación</h1>
            </div>
            <div className="container">
                <form
                    ref={formCreateReservationRef}
                    onSubmit={(e)=> {handleCreateReservation(e)}}
                >
                <div className="row">
                    <div className="col-md-7">
                        <Panel>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <div className="form-floating mb-3">
                                        <select
                                            className={errors && errors.identification_type_id ? `form-select is-invalid` : `form-select`}  
                                            name="identification_type_id"
                                        >
                                            <option value="">-Selecione una opción-</option>
                                            {iTypes && iTypes.map((type, index) => (
                                                <option value={type.id} key={index}>{type.name}</option>
                                            ))}
                                        </select>
                                        <label className='form-label'>Tipo de Identificación</label>
                                        {errors && errors.identification_type_id &&(
                                            <div className="invalid-feedback">
                                                {errors.identification_type_id}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-md-5'>
                                    <div className='form-floating'>
                                        <input 
                                            className={errors && errors.identification_number ? `form-control is-invalid` : `form-control`}  
                                            type="text"
                                            name="identification_number"
                                            placeholder="identificación"
                                        />
                                        <label className='form-label'>Identificación</label>
                                        {errors && errors.identification_number &&(
                                            <div className="invalid-feedback">
                                                {errors.identification_number}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <button 
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={(e) => handleSearchClient(e)}
                                        disabled={isLoading}
                                    >
                                        Buscar
                                    </button>
                                </div>
                            </div>
                            <div className="my-2">
                                {errors.identification_number && (
                                    <span className="text-muted">
                                        Si el usuario no esta registrado <a href="#" data-bs-toggle="modal" data-bs-target="#modalCreateClient">Click aqui</a> para registrarlo
                                    </span>
                                )}
                            </div>
                            {clientSelected?.name && (
                                <>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                className='form-control'  
                                                id="floatingInputName" 
                                                name='name'
                                                disabled
                                                defaultValue={`${clientSelected.name} ${clientSelected.last_name}`}
                                            />
                                            <label htmlFor="floatingInputName">Cliente</label>
                                            {errors && errors.name &&(
                                                <div className="invalid-feedback">
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className='col'>
                                        <div className="form-floating mb-3">
                                            <select
                                                className={errors && errors.vehicle_type_id ? `form-select is-invalid` : `form-select`}  
                                                name="vehicle_type_id"
                                            >
                                                <option value="">-Selecione una opción-</option>
                                                {vehicleTypes && vehicleTypes.map((type, index) => (
                                                    <option value={type.id} key={index}>{type.name}</option>
                                                ))}
                                            </select>
                                            <label className='form-label'>Tipo de vehiculo</label>
                                            {errors && errors.vehicle_type_id &&(
                                                <div className="invalid-feedback">
                                                    {errors.vehicle_type_id}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className='form-floating'>
                                            <input 
                                                className={errors && errors.license_plate ? `form-control is-invalid` : `form-control`}  
                                                type="text"
                                                name="license_plate"
                                                placeholder="placa"
                                            />
                                            <label className='form-label'>Placa</label>
                                            {errors && errors.license_plate &&(
                                                <div className="invalid-feedback">
                                                    {errors.license_plate}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mx-auto">
                                    {(isCreated && reservation.id) ? (
                                        <a 
                                            className="btn btn-success"
                                            href={PRINT_RESVERATION_IN_ROUTE(reservation.id, userLogged.id)}
                                            target={"_blank"}
                                        >
                                            <FontAwesomeIcon icon={faPrint} className="me-2" />
                                            <span>Imprimir Ticket de entrada</span>
                                        </a>
                                    ): (
                                        <button 
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Creando': 'Crear'} reserva
                                        </button>
                                    )}
                                </div>
                                </>
                            )}
                        </Panel>
                    </div>
                </div>
                </form>
            </div>
            <ClientCreateModal 
                id="modalCreateClient"
                onCreate={(data) => {if(data.result){setClientSelected(data.data)}}}
            />
        </>
    );
}

export default ReservationCreatePage;