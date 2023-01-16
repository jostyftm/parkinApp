import React from 'react';
import RaisedMoneyComponent from '../../../Components/Statistics/RaisedMoney';
import RegistrationClientComponent from '../../../Components/Statistics/RegistrationClient';
import ReservationByDayComponent from '../../../Components/Statistics/ReservationByDay';
import ReservationByState from '../../../Components/Statistics/ReservationByState';

const StatisticsHomePage = () => {

    return (
        <>
            <h1>Estadisticas</h1>
            <div className="d-flex align-items-start">
                <div 
                    className="nav nav-pills me-3" 
                    id="v-pills-tab" 
                    role="tablist" 
                    aria-orientation="vertical"
                >
                    <button 
                        className="nav-link active" 
                        id="v-pills-re-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#v-pills-re" 
                        type="button" 
                        role="tab" 
                        aria-controls="v-pills-re" 
                        aria-selected="true"
                    >Reservas por estado</button>
                    <button 
                        className="nav-link" 
                        id="v-pills-rd-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#v-pills-rd" 
                        type="button" 
                        role="tab" 
                        aria-controls="v-pills-rd" 
                        aria-selected="false"
                    >Reservas por dia</button>
                    <button 
                        className="nav-link" 
                        id="v-pills-rc-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#v-pills-rc" 
                        type="button" 
                        role="tab" 
                        aria-controls="v-pills-rc" 
                        aria-selected="false"
                    >Registro de clientes</button>
                    <button 
                        className="nav-link" 
                        id="v-pills-dr-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#v-pills-dr" 
                        type="button" 
                        role="tab" 
                        aria-controls="v-pills-dr" 
                        aria-selected="false"
                    >Dinero recaudado</button>
                </div>
            </div>
            <div className="tab-content" id="v-pills-tabContent">
                <div 
                    className="tab-pane fade show active" 
                    id="v-pills-re" 
                    role="tabpanel" 
                    aria-labelledby="v-pills-re-tab" 
                    tabIndex="0"
                >
                    <ReservationByState />
                </div>
                <div 
                    className="tab-pane fade" 
                    id="v-pills-rd" 
                    role="tabpanel" 
                    aria-labelledby="v-pills-rd-tab" 
                    tabIndex="0"
                >
                    <ReservationByDayComponent />
                </div>
                <div 
                    className="tab-pane fade" 
                    id="v-pills-rc" 
                    role="tabpanel" 
                    aria-labelledby="v-pills-rc-tab" 
                    tabIndex="0"
                >
                    <RegistrationClientComponent />
                </div>
                <div 
                    className="tab-pane fade" 
                    id="v-pills-dr" 
                    role="tabpanel" 
                    aria-labelledby="v-pills-dr-tab" 
                    tabIndex="0"
                >
                    <RaisedMoneyComponent />
                </div>
            </div>
        </>
    );
}

export default StatisticsHomePage;