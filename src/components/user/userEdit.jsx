import { React, useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography, TextField, Snackbar } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import { Alert, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { RotateLeftOutlined } from '@mui/icons-material';

const currencies = [
    {
        value: '0',
        label: 'super admin',
    },

    {
        value: '1',
        label: 'admin',
    },
    {
        value: '2',
        label: 'user',
    },
];


const EditUser = (props) => {
    const [user, setUser] = useState(null);
    const [verify, setVerify] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    console.log(id)
    const [phone, setPhone] = useState('');
    const goto = useNavigate();
    console.log(props);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/userone`,
            {
                params: {
                    _id: id
                }
            }
        )
            .then(response => {
                console.log(response.data);
                setLoading(true);
                setPhone(response.data.phone);
                setRole(response.data.role);
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setVerify(response.data.verify);
                console.log(role);

            }).catch(err => {
                console.log(err);
            })
    }, []);
    const Token = {
        _id: `${id}`
    };


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const token = localStorage.getItem('token')

    const editUserDetails = async () => {
        if (name === '' || email === '')
            alert('error');
        if (!email.includes('@') || !email.includes('.'))
            alert('Invalid email');

        else {
            axios.put(process.env.REACT_APP_API_URL + `/user`, {
                params: {
                    _id: id
                },
                body: {
                    name: name,
                    email: email,
                    role: role,



                }
            }
            ).then(() => {
                alert('sucess');
            })



        }
    }
    const [role, setRole] = useState('');

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    if (!loading)
        return <h1>loading....</h1>;

    return (
        <div style={{ margin: "20px " }}>

            <FormGroup >
                <Typography variant="h4" style={{ display: "flex" }}>User Information</Typography>
                <FormControl margin="normal">
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input onChange={(e) => {
                        // if (name === '')
                        //   setError('not valid');
                        setName(e.target.value)
                    }} name="name" className="input" type="name" id="name" value={name} aria-describedby="my-helper-text" />
                    {!name ? <p style={{ color: "red" }}>Required</p> : null}
                </FormControl>

                <FormControl margin="normal">
                    <InputLabel htmlFor="my-input">Email</InputLabel>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" className="input" type="email" value={email} aria-describedby="my-helper-text" />
                    {!email ? (<p style={{ color: "red" }}>Required</p>) : null}
                </FormControl>

                <FormControl margin="normal">
                    <InputLabel htmlFor="my-input">Phone</InputLabel>
                    <Input onChange={(e) => setPhone(e.target.value)} name="phone" type="phone" value={phone} disabled aria-describedby="my-helper-text" />
                </FormControl>
                {props.user.role === 1 ? (
                    <>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Edit Role"
                            value={role}
                            margin="normal"
                            onChange={handleChange}
                            helperText="ROLES"
                            variant="standard"
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <FormControl margin="normal">
                            <InputLabel htmlFor="my-input">Verified</InputLabel>
                            <Input onChange={(e) => setVerify(e.target.value)} name="verify" id="verify" type="verify" value={verify} aria-describedby="my-helper-text" />
                        </FormControl>
                    </>) : null}
            </FormGroup>

            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                <Button onClick={() => goto(-1)} variant="text">Go back</Button>
                <Button variant="contained" onClick={() => editUserDetails()}>Save</Button>
            </Stack>

        </div>
    )
}

export default EditUser;
