import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function UserDashboard(props) {
    // const history = useNavigate();
    const [user, setApiData] = React.useState(null);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        const loadApiData = async () => {
            await axios.get(process.env.REACT_APP_API_URL + `/userone`,)
                .then(response => {
                    console.log(response.data);
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
        <div>
            <h1 style={{ color: "black", fontFamily: "Helvetica" }}>Hi {user && user.name}!!</h1>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Item One" value="1" />
                            <Tab label="Item Two" value="2" />
                            <Tab label="Item Three" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
        </div >
    )
}
