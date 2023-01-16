import React, { useEffect, useRef, useState } from "react";
import { reservationByState } from "../../Services/statisticsService";
import {Line} from 'react-chartjs-2';
import { CategoryScale, Chart as  ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";

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
            className="col-md-2 p-2 mx-3 rounded shadow" 
            style={
                {backgroundColor: state?.bg_color, color: state?.text_color}
            }
        >
            <h6>{state?.name}</h6>
            <div className="text-center py-3">
                <span className="fs-2 fw-bold">{state?.total}</span>
            </div>
        </div>
    )
}

const ReservationByState = () => {

    const [totals, setTotals] = useState([]);
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
    const [dataT, setDataT] = useState({});
    const [dataC, setDataC] = useState({});

    const formFormSearchRef = useRef(null);

    const fetchData = async () => {

        try{
            const responseData = await reservationByState();
            setTotals(responseData.data.total);
            setResume(responseData.data.resume);

            const labelsR = responseData.data.resume.filter(element => element.reservation_state_id == 1).map((item, index) => item.date);
            const labelsT = responseData.data.resume.filter(element => element.reservation_state_id == 2).map((item, index) => item.date);
            const labelsC = responseData.data.resume.filter(element => element.reservation_state_id == 3).map((item, index) => item.date);

            let datasetsT = [
                {
                    label: 'Terminado',
                    data: responseData.data.resume.filter(element => element.reservation_state_id == 2).map(item => item.total),
                    borderColor: '#4dd4ac',
                    backgroundColor: "#4dd4ac"
                },
            ];

            let dataSetsC = [
                {
                    label: 'Cancelado',
                    data: responseData.data.resume.filter(element => element.reservation_state_id == 3).map(item => item.total),
                    borderColor: '#dc3545',
                    backgroundColor: "#dc3545"
                }
            ]
            
            let dataSetsR = [
                {
                    label: 'Reservados',
                    data: responseData.data.resume.filter(element => element.reservation_state_id == 1).map(item => item.total),
                    borderColor: '#3dd5f3',
                    backgroundColor: "#3dd5f3"
                }
            ]

            setDataR({
                labels: labelsR,
                datasets: dataSetsR
            })

            setDataT({
                labels: labelsT,
                datasets: datasetsT
            })

            setDataC({
                labels: labelsC,
                datasets: dataSetsC
            })
        }catch(err){

        }
    };

    const handleChartData = () => {
        
        console.log(resume);
    }

    useEffect(() => {

        fetchData();

        return () => {
            setTotals([]);
            setResume([]);
        }
    }, []);

    return (
        <div className="container-fluid mx-0">
            <div className="row my-3">
                {totals?.map((state, index) => (
                    <WidgetState key={index} state={state} />
                ))}
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
            <div className="row">
                {dataT?.labels && (
                    <Line 
                        options={options}
                        data={dataT}
                        height={100}
                    />
                )}
            </div>
            <div className="row">
                <div className="col">
                    {dataC?.labels && (
                        <Line 
                            options={options}
                            data={dataC}
                            height={100}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReservationByState;