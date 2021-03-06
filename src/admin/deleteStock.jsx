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

const DeleteStock = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const classes = useStyles();
    let history = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/stockone/${id}`).then(response => {
            console.log(response.data);
            setLoading(true);
            setUser(response.data);
            setName(response.data.name);
            setPrice(response.data.price);

        }).catch(err => {
            console.log(err);
        })
    }, []);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const deleteStockDetails = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/stock/${id}`, {
            method: 'DELETE',
        })

        const data = await response.json()
        if (data) {
            // console.log('successfull')
            history('/admin/stocks'); console.log(data);
        } else {
            alert('error');
        }
    }

    if (!loading)
        return <h1>loading....</h1>;


    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">DELETE Stock</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => setName(e.target.value)} name="name" type="name" id="name" value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input onChange={(e) => setPrice(e.target.value)} name="price" id="price" type="price" value={price} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl>
                <Button variant="contained" color="primary" onClick={() => deleteStockDetails()}>Delete Stock</Button>
            </FormControl>
        </FormGroup>
    )
}

export default DeleteStock;