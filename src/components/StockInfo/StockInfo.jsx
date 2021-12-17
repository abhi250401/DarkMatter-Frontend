import React from 'react'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react';

export default function StockInfo(props) {
    const { id } = useParams();
    const code = id;
    console.log(code);
    const [stock, setData] = React.useState({});
    const navigate = useNavigate();

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
            <h1>{code}</h1>
            <p><span> Name : </span>{stock.name}</p>
            <p>{stock.marketCaptial}</p>
            <p>{stock.sector}</p>
            <p>{stock.peRatio}</p>
            <p>{stock.openPrice}</p>
            <p>{stock.closePrice}</p>
            <p>{stock.closePrice}</p>
        </div>
    )
}
