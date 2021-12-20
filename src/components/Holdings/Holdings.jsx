import React from 'react'
import axios from 'axios'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';

export default function Holdings(props) {
    const min = new Date();
    console.log(min)
    const [value, setValue] = useState(new Date('2021-12-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/user/holdings').then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })

    }, [])
    return (
        <div>

            <TextField sx={{ mt: 2, mb: 4 }} i d="filled-basic" label="Quantity" fullWidth variant="standard" />
            <TextField sx={{ mb: 4 }} id="standard-basic" label="Price(in Rs.)" fullWidth variant="standard" />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    label="Date&Time picker"
                    value={value}
                    inputFormat="yyyy/MM/dd hh:mm a"
                    maxDate={new Date()}

                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />    </LocalizationProvider>

            <Button variant="contained" color="primary">Add Holdings</Button>

        </div >
    )
}
