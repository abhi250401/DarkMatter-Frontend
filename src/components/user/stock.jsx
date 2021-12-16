import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Performance from '../Performance/Performance';
import Analysis from '../Analysis/Analysis';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router';
export default function UserStockInfo(props) {
    const { id } = useParams();
    const code = id;
    console.log(code);
    const [stock, setData] = React.useState({
    });
    const navigate = useNavigate();
    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/user/stock/${code}`);
            setData(response.data)
            console.log(stock);
        };
        loadData();
    }, [id]);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (

        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Stock Inforamtion" value="1" onClick={() => navigate(`/user/stock/${code}`)} />
                        <Tab label="Analysis" value="2" onClick={() => navigate(`/user/stock/${code}/Analysis`)} />
                        <Tab label="Performance" value="3" onClick={() => navigate(`/user/stock/${code}/Performance`)} />
                    </TabList>
                </Box>
                <TabPanel value="1"><div>
                    <h1 style={{ color: "black", fontFamily: "Helvetica" }}>{code}</h1>
                    <p style={{ fontFamily: "Helvetica" }}>  <span> Name : </span>{stock.name}</p>
                    <p>{stock.marketCaptial}</p>
                    <p>{stock.sector}</p>
                    <p>{stock.peRatio}</p>
                    <p>{stock.closePrice}</p>
                </div></TabPanel>
                <TabPanel value="2"><Outlet /></TabPanel>
                <TabPanel value="3"><Outlet /></TabPanel>
            </TabContext>
        </Box>
    )
}
