import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { useNavigate } from "react-router";
import { Typography } from "@material-ui/core";
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
export default function Kyc(props) {
    const [pan, setPan] = useState('');
    const [dob, setdob] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/userone`,)
            .then(response => {
                setAadhaar(response.data.aadhaar);
                setdob(response.data.dob);



                setPan(response.data.pan)
            }).catch(err => {
                console.log(err);
            })
    }, []);

    const [file, setFile] = React.useState('');
    const goto = useNavigate();
    const submitFile = async () => {

        const formData = new FormData()
        formData.append('profileImg', file)
        axios.put(process.env.REACT_APP_API_URL + `/user/image/${props.user._id}`, formData, {
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    }
    const updateChanges = async () => {

        axios.put(process.env.REACT_APP_API_URL + `/user`, {

            body: {


                dob: dob,
                aadhaar: aadhaar,
                pan: pan,

            }
        }
        ).then(() => {
            alert('sucess');
        })




    }

    return (
        <Container maxWidth="xm">
            <Typography variant="h4">Update Kyc</Typography>
            <TextField
                label="Aadhaar Card"
                name="aadhar"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
            <TextField
                label="PAN Card"
                name="pan"
                value={pan}
                onChange={(e) => setPan(e.target.value)}

                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Dob"
                    value={dob}
                    onChange={(newValue) => {
                        setdob(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <FormGroup style={{ display: "flex", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                <input
                    style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "10px" }}
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />      <Button variant="outlined" onClick={() => submitFile()}>Upload File</Button>

            </FormGroup>
            <Stack spacing={2} direction="row">
                <Button onClick={() => goto(-1)} variant="text">Go back</Button>
                <Button variant="contained" onClick={() => updateChanges()}>Update</Button>
            </Stack>


        </Container >
    );
};