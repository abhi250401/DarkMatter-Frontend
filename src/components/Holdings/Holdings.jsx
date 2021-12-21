import React from 'react'
import axios from 'axios'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

export default function Holdings(props) {
    const min = new Date();
    console.log(min)
    const [value, setValue] = useState(new Date());
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [name, setName] = useState("");
    const { id } = useParams();
    const code = id;
    console.log(code);
    function putHoldings() {
        if (price <= 0 || price === "" || quantity == 0 || name == '') {
            alert("error")
            return
        }

        axios.post(process.env.REACT_APP_API_URL + '/user/holdings', {

            name: name,
            price: price,
            quantity: quantity,
            datetime: value,
            stockCode: code
        }).then((response) => {
            console.log(response.data);

        }).catch(() => {
            console.log("err");
        })
    }
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

            <TextField sx={{ mt: 2, mb: 2 }} label="Quantity" fullWidth variant="standard" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
            <TextField sx={{}} id="standard-basic" label="Price(in Rs.)" fullWidth variant="standard" value={price} onChange={(e) => { setPrice(e.target.value) }} />
            <TextField sx={{ mt: 2, mb: 4 }} label="Stock Name" fullWidth variant="standard" value={name} onChange={(e) => { setName(e.target.value) }} />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    label="Date&Time picker"
                    value={value}
                    inputFormat="yyyy/MM/dd hh:mm a"
                    maxDate={new Date()}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />    </LocalizationProvider>

            <Button variant="contained" color="primary" onClick={() => putHoldings()}>Add Holdings</Button>

        </div >
    )
}
