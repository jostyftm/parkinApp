import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { cancelReservation, getReservation, payReservation } from "../../Services/reservationServices";
import Modal from "../Shared/Modal";

import useAuth from "../../Hooks/UseAuth";
import { PRINT_RESVERATION_OUT_ROUTE } from "../../Routes/config";

const ReservationCancelModal = ({reservationId, onCanceled, ...rest}) => {

    const [reservation, setReservation] = useState({});
    const [isLoading, setIsLoasing] = useState(false);
    const [isCanceled, setIsCanceled] = useState(false);

    const [errors, setErrors] = useState([]);

    const formPaidReservation = useRef(null);

    const {userLogged} = useAuth();

    const handleCancelReservation = async (e) => {

        console.log(e);
        e.preventDefault();

        setIsLoasing(true);
        
        try{
            const response = await cancelReservation(reservationId);
            onCanceled(true);
            setIsCanceled(true);
            setIsLoasing(false);
        }catch(err){
            setIsLoasing(false);
            setIsCanceled(false);
            onCanceled(false);

        }
    }

    return (
        <Modal
            title={"Cancelar reserva"}
            modalSize=""
            {...rest}
        >
            {isCanceled ? (
                <>
                    <div className="alert alert-success" role="alert">
                        Se cancelo la reserva
                    </div>
                    <div className="d-grip">
                    <button 
                            type='button'
                            className='btn btn-default'
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>
                    </div>
                </>
            ):(
                <form
                    onSubmit={(e) => handleCancelReservation(e)}
                >
                    <div className="alert alert-primary" role="alert">
                        ¿Por favor comfirmar para cancelar la reserva?
                    </div>   
                    <div className="d-grid gap-2">
                        <button 
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Cancelando': 'Cancelar'} reserva
                        </button>
                        <button 
                            type='button'
                            className='btn btn-default'
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
}

export default ReservationCancelModal;