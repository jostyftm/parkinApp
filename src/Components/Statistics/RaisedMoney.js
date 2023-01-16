import React, { useEffect, useRef, useState } from "react";
import { raisedMoney, registrationclient} from "../../Services/statisticsService";
import {Line} from 'react-chartjs-2';
import { CategoryScale, Chart as  ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import CurrencyFormat from 'react-currency-format';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const WidgetState = ({state}) => {

    return (
        <div 
            className="col-md-4 p-2 mx-3 rounded shadow bg-success"
        >
            <h6>{state?.name}</h6>
            <div className="text-center py-3 d-flex flex-column">
                <span className="text-white fs-5">Total recaudado</span>
                <CurrencyFormat 
                    className="fs-2 fw-bold text-white"
                    value={state?.total}
                    thousandSeparator={true}
                    prefix={'$ '}
                    displayType={'text'}
                    decimalScale={0}
                />
                {/* <span className="fs-2 fw-bold">{state?.total}</span> */}
            </div>
        </div>
    )
}


const RaisedMoneyComponent = () => {

    const [total, setTotal] = useState({});
    const [resume, setResume] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [options, setOptions] = useState({
        responsive: true,
        // maintainAspectRatio: true,
        plugins: {
            // legend: {
            // position: 'top',
            // },
            // title: {
            //     display: true,
            // },
        },
    });
    const [dataR, setDataR] = useState({});
    const formFormSearchRef = useRef(null);

    const fetchData = async () => {

        try{
            const responseData = await raisedMoney();
            setTotal(responseData.data.total);
            setResume(responseData.data.resume);

            const labelsR = responseData.data.resume.map(item => item.date);
            
            let dataSetsR = [
                {
                    label: 'Dinero recaudado',
                    data: responseData.data.resume.map(item => item.total),
                    borderColor: '#4dd4ac',
                    backgroundColor: "#4dd4ac"
                }
            ]

            setDataR({
                labels: labelsR,
                datasets: dataSetsR
            })

        }catch(err){

        }
    };

    useEffect(() => {

        fetchData();

        return () => {
            setTotal([]);
            setResume([]);
        }
    }, []);

    return (
        <div className="container-fluid mx-0">
            <div className="row">
                <WidgetState state={total} />
            </div>
            <div className="row my-3">
                <div className="col">
                    {dataR?.labels && (
                        <Line 
                            options={options}
                            data={dataR}
                            height={100}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default RaisedMoneyComponent;