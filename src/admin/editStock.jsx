import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { code } = useParams();
    const classes = useStyles();
    let history = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/user/stock/${code}`)
            .then(response => {
                // console.log(response.data);
                setLoading(true);

                setName(response.data.name);
                setPrice(response.data.price);

            }).catch(err => {
                console.log(err);
            })

    }, []);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');


    const editStockDetails = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/stock/${code}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price,
            }),
        })

        const data = await response.json()
        if (data.acknowledged == true) {
            // alert('successfull')
            history('/admin/stocks'); console.log(data);
        } else {
            alert('error');
        }
    }



    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => setName(e.target.value)} name="name" type="name" id="name" value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input onChange={(e) => setPrice(e.target.value)} name="price" id="price" type="price" value={price} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editStockDetails()}>Edit Stock</Button>
            </FormControl>
        </FormGroup>
    )
}

export default EditUser;