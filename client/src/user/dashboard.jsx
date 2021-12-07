import React, { useEffect, useState } from 'react'

export default function UserDashboard(props) {
    // const history = useNavigate();
    const [user, setApiData] = React.useState(null)
    const [error, setError] = React.useState(false);

    useEffect(() => {
        /*const loadApiData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/user');
            setApiData(response.data)
        };

        loadApiData();*/

        setApiData({
            name : 'Testing',
            price : '2400'
        })
    }, []);

    return (
        <div>
            <h1 style={{ color: "black", fontFamily: "Helvetica" }}>Hi {user.name}!</h1>
        </div >
    )
}
