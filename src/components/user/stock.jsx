import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
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

    localStorage.setItem('value', value);

    useEffect(() => {
        if (window.location.pathname === `/user/stock/${code}`)
            setValue('1');
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
                    </TabList>
                </Box>
                <TabPanel sx={{ p: 0 }} value="1"><StockInfo /></TabPanel>
                <TabPanel sx={{ p: 0 }} value="2"><Outlet /></TabPanel>
                <TabPanel sx={{ p: 0 }} value="3"><Outlet /></TabPanel>
                <TabPanel sx={{ p: 0 }} value="4"><Outlet /></TabPanel>
                <TabPanel sx={{ p: 0 }} value="5"><Outlet /></TabPanel>
            </TabContext>
        </Box>
    )
}
