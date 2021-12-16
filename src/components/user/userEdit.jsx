import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography } from '@material-ui/core';
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
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const classes = useStyles();
    let history = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/userone/${id}`)
            .then(response => {
                // console.log(response.data);
                setLoading(true);
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setrole(response.data.role);

            }).catch(err => {
                console.log(err);
            })

    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setrole] = useState('')

    const editUserDetails = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                role
            }),
        })

        const data = await response.json()
        if (data.acknowledged === true) {
            // alert('successfull')
            history('/admin/users'); console.log(data);
        } else {
            alert('error');
        }
    }

    if (!loading)
        return <h1>loading....</h1>;

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => setName(e.target.value)} name="name" type="name" id="name" value={name} aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => setEmail(e.target.value)} name="email" id="email" type="email" value={email} aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => setPhone(e.target.value)} name="email" id="email" type="email" value={phone} aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Role</InputLabel>
                <Input onChange={(e) => setrole(e.target.value)} name="email" id="email" type="email" value={role} aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl>
            </FormControl>

        </FormGroup>
    )
}

export default EditUser;