import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
export default function UserStockInfo(props) {

    // const history = useNavigate();
    // const [stock, setData] = React.useState(null);
    const [error, setError] = React.useState(false);

    const { id } = useParams();
    const code = id;
    console.log(code);
    const [stock, setData] = React.useState({


    });

    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/user/stock/${code}`);
            setData(response.data)
            console.log(stock);
        };
        loadData();

    }, [id]);

    return (
        <div>
            <h1 style={{ color: "black", fontFamily: "Helvetica" }}>{code}</h1>
            <p style={{ fontFamily: "Helvetica" }}>  <span> Name : </span>{stock.name}</p>

            <p>{stock.marketCaptial}</p>
            <p>{stock.sector}</p>
            <p>{stock.peRatio}</p>
            <p>{stock.closePrice}</p>



        </div >
    )
}
