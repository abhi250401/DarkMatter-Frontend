import React from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar, Line, Scatter } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
export default function StockInfo(props) {



    const { id } = useParams();
    const code = id;
    console.log(code);
    const [stock, setData] = React.useState({});
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);
    const [color, setColor] = useState("green");
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    const data = {
        labels: x,
        datasets: [
            {

                data: y,
                borderColor: color,
                backgroundColor: "grey", lineTension: 0.6
            },



        ]
    };
    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/user/stock/${code}`);
            setData(response.data)
            console.log(stock);
        };

        const FetchStockData = async () => {
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${code}.BSE&outputsize=compact&apikey=952752Q0G0RQL0EA`);
            console.log(response.data);
            if (response) {
                for (var key in response.data['Time Series (Daily)']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(response.data['Time Series (Daily)'][key]['1. open']);
                }
                if ((stockChartYValuesFunction[0] > stockChartYValuesFunction[stockChartYValuesFunction.length - 1]) == true) {
                    setColor("red");
                }
            }

            console.log(stockChartYValuesFunction[0])
            console.log(stockChartYValuesFunction[stockChartYValuesFunction.length - 1])

            setX(stockChartXValuesFunction);
            setY(stockChartYValuesFunction);
            console.log(x);
            console.log(y);


        };
        FetchStockData();
        loadData();
    }, [id]);

    return (
        <div >
            <div style={{ display: "flex" }}>
                <h1>{code}</h1> <h1> - {stock.name}</h1>
            </div>

            <   Line
                data={data}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in` },
                }}
            />
        </div>
    )
}
