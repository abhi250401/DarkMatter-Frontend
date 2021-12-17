import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography, TextField } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { ButtonUnstyled } from '@mui/base';
import { SendToMobile } from '@mui/icons-material';



const EditUser = (props) => {
    const [user, setUser] = useState(null);
    const [verify, setVerify] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [phone, setPhone] = useState('');
    const [role, setrole] = useState('')
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
                setrole(response.data.role);
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setVerify(response.data.verify);
                console.log(role);
                setAadhaar(response.data.aadhaar);
                setdob(response.data.dob);
                setPan(response.data.pan)
            }).catch(err => {
                console.log(err);
            })
    }, []);
    const Token = {
        _id: `${id}`
    };


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState('');
    const [pan, setPan] = useState('');
    const [dob, setdob] = useState('');
    const [aadhaar, setAadhaar] = useState('');


    const editUserDetails = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization2': `${props.user.userID}`
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                role,
                verify
            }),
        })

        const data = await response.json()
        if (data.acknowledged === true) {
            alert('successfull')
        } else {
            alert('error');
        }
    }

    if (!loading)
        return <h1>loading....</h1>;

    return (
        <div style={{ margin: "20px " }}>

            <FormGroup >
                <Typography variant="h4" style={{ display: "flex" }}>User Information</Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input onChange={(e) => setName(e.target.value)} name="name" className="input" type="name" id="name" value={name} aria-describedby="my-helper-text" />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="my-input">Email</InputLabel>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" className="input" id="email" type="email" value={email} aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Aadhaar</InputLabel>
                    <Input name="aadhaar" className="input" disabled value={aadhaar} aria-describedby="my-helper-text" />
                </FormControl>

                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Birth"
                            value={dob}
                            onChange={(newValue) => {
                                setdob(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </FormControl>


                <FormControl>
                    <InputLabel htmlFor="my-input">Phone</InputLabel>
                    <Input onChange={(e) => setPhone(e.target.value)} name="email" id="email" type="email" value={phone} aria-describedby="my-helper-text" />
                </FormControl>
                {props.user.role === 1 ? (
                    <>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Role</InputLabel>
                            <Input onChange={(e) => setrole(e.target.value)} name="role" id="role" type="role" value={role} aria-describedby="my-helper-text" />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Verified</InputLabel>
                            <Input onChange={(e) => setVerify(e.target.value)} name="verify" id="verify" type="verify" value={verify} aria-describedby="my-helper-text" />
                        </FormControl>
                    </>) : null}
            </FormGroup>

            <ButtonUnstyled onClick={() => editUserDetails()}>save</ButtonUnstyled>
            <ButtonUnstyled onClick={() => goto(-1)}>Go Back</ButtonUnstyled>

        </div>
    )
}

export default EditUser;
