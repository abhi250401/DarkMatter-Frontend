import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router';

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}
export default function Holding() {
    const { id } = useParams();
    const code = id
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                <LinkTab label="Page One" href={`/user/stock/${code}/analysis`} />
                <LinkTab label="Page Two" href="/trash" />
                <LinkTab label="Page Three" href="/spam" />
            </Tabs>
        </div>
    )
}
