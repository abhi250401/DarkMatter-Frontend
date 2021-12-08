import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function UserDashboard(props) {
    // const history = useNavigate();
    const [user, setApiData] = React.useState(null);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        const loadApiData = async () => {
            await axios.get(process.env.REACT_APP_API_URL + `/userone/${props.user._id}`)
                .then(response => {
                    console.log(response.data);
                    setApiData(response.data);

                }).catch(err => {
                    console.log(err);
                })
        }
        loadApiData();
    }, []);

    return (
        <div>
            <h1 style={{ color: "black", fontFamily: "Helvetica" }}>Hi {user && user.name}!!</h1>
        </div >
    )
}
