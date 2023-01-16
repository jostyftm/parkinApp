import React, { useEffect, useRef, useState } from "react";
import { registrationclient} from "../../Services/statisticsService";
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

const RegistrationClientComponent = () => {

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
    const formFormSearchRef = useRef(null);

    const fetchData = async () => {

        try{
            const responseData = await registrationclient();
            setTotals(responseData.data.total);
            setResume(responseData.data.resume);

            const labelsR = responseData.data.resume.map(item => item.date);
            
            let dataSetsR = [
                {
                    label: 'Clientes registrados',
                    data: responseData.data.resume.map(item => item.total),
                    borderColor: '#3dd5f3',
                    backgroundColor: "#3dd5f3"
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
            setTotals([]);
            setResume([]);
        }
    }, []);

    return (
        <div className="container-fluid mx-0">
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

export default RegistrationClientComponent;