import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import logo from './download.png';
import logo2 from './download (1).png';

export default function UserDashboard(props) {
    // const history = useNavigate();
    const [user, setApiData] = React.useState(null);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        const loadApiData = async () => {
            await axios.get(process.env.REACT_APP_API_URL + `/userone`,)
                .then(response => {
                    setApiData(response.data);
                }).catch(err => {
                    console.log(err);
                })
        }
        loadApiData();
    }, []);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ margin: "20px " }}>
            <h1>Hi {user && user.name}!!</h1>
            <div className='info-div'>

            </div>
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <img src={logo} height={300} />


                <img src={logo2} height={300} width={300} />
            </div>
        </div>
    )
}
