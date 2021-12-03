import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const EditUser = () => {

    const classes = useStyles();
    let history = useNavigate();



    const [name, setName] = useState('');
    const [price, setPrice] = useState('');


    const addNewStock = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + "/stock", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price,
            }),
        })

        const data = await response.json()
        if (data.status === "ok") {
            alert('successfull')
            history('/admin/stocks'); console.log(data);
        } else {
            alert('error');
        }
    }



    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Add Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => setName(e.target.value)} name="name" type="name" id="name" value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input onChange={(e) => setPrice(e.target.value)} name="price" id="price" type="price" value={price} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addNewStock()}>Add Stock</Button>
            </FormControl>
        </FormGroup>
    )
}

export default EditUser;