import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { getReservation, payReservation } from "../../Services/reservationServices";
import Modal from "../Shared/Modal";

const ReservationPayModal = ({reservationId, onPaid, ...rest}) => {

    const [reservation, setReservation] = useState({});
    const [isLoading, setIsLoasing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const [errors, setErrors] = useState([]);

    const formPaidReservation = useRef(null);

    const handlePayReservation = async (e) => {

        console.log(e);
        e.preventDefault();

        setIsLoasing(true);
        
        try{
            const response = await payReservation(reservationId);
            onPaid(true);
            setIsPaid(true);
            setIsLoasing(false);
        }catch(err){
            setIsLoasing(false);
            setIsPaid(false);
            onPaid(false);

        }
    }

    return (
        <Modal
            title={"Pagar reserva"}
            modalSize=""
            {...rest}
        >
            {isPaid ? (
                <>
                    <div className="alert alert-success" role="alert">
                        Cobro efectuado con exito
                    </div>
                    <div className="d-grip">
                        <button className="btn btn-primary">
                            <FontAwesomeIcon icon={faPrint} className="me-2" />
                            <span>Imprimir recibo</span>
                        </button>
                    </div>
                </>
            ):(
                <form
                    onSubmit={(e) => handlePayReservation(e)}
                >
                    <div className="alert alert-primary" role="alert">
                        ¿Por favor comfirmar para efectuar el pago de la reserva?
                    </div>   
                    <div className="d-grid gap-2">
                        <button 
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Cobrando': 'Cobrar'} reserva
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

export default ReservationPayModal;