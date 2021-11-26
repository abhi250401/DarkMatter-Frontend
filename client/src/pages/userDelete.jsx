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

const DeleteUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const classes = useStyles();
    let history = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/userone/${id}`).then(response => {
            console.log(response.data);
            setLoading(true);
            setUser(response.data);
            setName(response.data.name);
            setEmail(response.data.email);

        }).catch(err => {
            console.log(err);
        })

    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    const deleteUserDetails = async () => {
        const response = await fetch(`http://localhost:3000/user/${id}`, {
            method: 'DELETE',

        })

        const data = await response.json()
        if (data) {
            // console.log('successfull')
            history('/admin/users'); console.log(data);
        }else {
            alert('error');
        }
    }

    if (!loading)
        return <h1>loading....</h1>;


    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">DELETE User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => setName(e.target.value)} name="name" type="name" id="name" value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => setEmail(e.target.value)} name="email" id="email" type="email" value={email} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl>
                <Button variant="contained" color="primary" onClick={() => deleteUserDetails()}>Delete User</Button>
            </FormControl>
        </FormGroup>
    )
}

export default DeleteUser;