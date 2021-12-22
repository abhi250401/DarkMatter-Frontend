import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from "react-dom";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router';
import StockInfo from '../StockInfo/StockInfo';

export default function UserStockInfo(props) {
    const { id } = useParams();
    const code = id;

    const val = localStorage.getItem('value') || 1;
    const [value, setValue] = React.useState(val);
    const navigate = useNavigate();
    const [data, setData] = useState();
    const Context = React.createContext();
    localStorage.setItem('value', value);

    useEffect(() => {
        if (window.location.pathname === `/user/stock/${code}`)
            setValue('1');
        if (window.location.pathname === `/user/stock/${code}/compare`)
            setValue('4');
        if (window.location.pathname === `/user/stock/${code}/analysis`)
            setValue('2');

    }, [window.location.pathname])



    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Info" value="1" onClick={() => navigate(`/user/stock/${code}`)} />
                        <Tab label="Analysis" value="2" onClick={() => navigate(`/user/stock/${code}/analysis`)} />
                        <Tab label="Performance" value="3" onClick={() => navigate(`/user/stock/${code}/performance`)} />
                        <Tab label="Compare" value="4" onClick={() => navigate(`/user/stock/${code}/compare`)} />
                        <Tab label="Shortlist" value="5" onClick={() => navigate(`/user/stock/${code}/shortlist`)} />
                        <Tab label="Holdings" value="6" onClick={() => navigate(`/user/stock/${code}/holdings`)} />

                    </TabList>
                </Box>
                <TabPanel value="1"><StockInfo /></TabPanel>

                <TabPanel value={value}><Outlet data={data} /></TabPanel>


            </TabContext>
        </Box >
    )
}
