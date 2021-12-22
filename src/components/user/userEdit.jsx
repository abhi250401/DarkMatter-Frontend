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
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
    }),
);
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
    const [status, setStatus] = useState("")
    console.log(id)
    const [dob, setDob] = useState(new Date());
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
                setDob(response.data.dob)

                setName(response.data.name);
                setEmail(response.data.email);
                setVerify(response.data.verify);
                console.log(role);
                setStatus(response.data.status)
            }).catch(err => {
                console.log(err);
            })
    }, []);
    const Token = {
        _id: `${id}`
    };
    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();

        let checked = false;

        if (radioGroup) {
            checked = radioGroup.value === props.value;
        }

        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    MyFormControlLabel.propTypes = {
        /**
         * The value of the component.
         */
        value: PropTypes.any,
    };

    const handledob = (newValue) => {
        setDob(newValue);
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
                    status: status,
                    verify: verify,

                    dob: dob
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

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={dob}
                            onChange={handledob}
                            renderInput={(params) => <TextField {...params} />}
                        />      </Stack>
                </LocalizationProvider>


                {props.user.role === 1 ? (
                    <>



                        <FormControl>
                            <FormLabel component="legend">Verified</FormLabel>

                            <RadioGroup name="use-radio-group" value={verify} onChange={(e) => setVerify(e.target.value)}>
                                <MyFormControlLabel value="0" label="Verified" control={<Radio />} />
                                <MyFormControlLabel value="1" label="Pending Approval" control={<Radio />} />

                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel component="legend">Status</FormLabel>

                            <RadioGroup name="use-radio-group" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <MyFormControlLabel value="0" label="Pending" control={<Radio />} />
                                <MyFormControlLabel value="1" label="Approved" control={<Radio />} />
                                <MyFormControlLabel value="2" label="Kyc not done" control={<Radio />} />

                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel component="legend"> Role</FormLabel>

                            <RadioGroup name="use-radio-group" value={role} onChange={(e) => setRole(e.target.value)}>
                                <MyFormControlLabel value="0" label=" Super Admin" control={<Radio />} />
                                <MyFormControlLabel value="1" label="Admin" control={<Radio />} />
                                <MyFormControlLabel value="2" label="User" control={<Radio />} />

                            </RadioGroup>
                        </FormControl>
                    </>) : null}
            </FormGroup>

            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                <Button onClick={() => goto(-1)} variant="text">Go back</Button>
                <Button variant="contained" onClick={() => editUserDetails()}>Save</Button>
            </Stack>

        </div >
    )
}

export default EditUser;
