import React, { useEffect, useState } from 'react'

export default function UserStockInfo(props) {
    // const history = useNavigate();
    // const [stock, setData] = React.useState(null);
    const [error, setError] = React.useState(false);

    const [stock, setData] = React.useState({
        name : '',
        price : ''
    });

    useEffect(() => {
        /*const loadApiData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/user/stock/' + id );
            setData(response.data)
        };

        loadApiData();*/

        setData({
            name : 'Testing',
            price : '2400'
        });
    }, []);

    return (
        <div>
            <h1 style={{ color: "black", fontFamily: "Helvetica" }}>{stock.name}</h1>
            <p style={{ fontFamily: "Helvetica" }}>  <span>Price : </span>{stock.price}</p>
        </div >
    )
}
