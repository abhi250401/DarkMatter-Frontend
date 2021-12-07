import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function UserStockInfo(props) {
    // const history = useNavigate();
    // const [stock, setData] = React.useState(null);
    const [error, setError] = React.useState(false);

    const { id } = useParams();

    const [stock, setData] = React.useState({
        code : id,
        name : id,
        price : '0'
    });

    useEffect(() => {
        /*const loadApiData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/user/stock/' + stock.code );
            setData(response.data)
        };
        loadApiData();*/
    }, []);

    return (
        <div>
            <h1 style={{ color: "black", fontFamily: "Helvetica" }}>{stock.code}</h1>
            <p style={{ fontFamily: "Helvetica" }}>  <span>Price : </span>{stock.price}</p>
        </div >
    )
}
