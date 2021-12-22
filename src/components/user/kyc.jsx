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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function Kyc(props) {
    const [pan, setPan] = useState('');
    const [dob, setdob] = useState('');
    const [aadhaar, setAadhaar] = useState('')
    const [img2, setimg2] = useState('')
    const [img, setimg] = useState('');
    const [idSelect, setidSelect] = useState("aadhaar");
    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL + `/userone`,)
            .then(response => {
                setAadhaar(response.data.id);
                setdob(response.data.dob);


                setidSelect(response.data.idname);

                setPan(response.data.pan)
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                if (aadhaar !== "")
                    setidSelect("aadhaar");
            })

    }, []);

    const [file, setFile1] = React.useState('');
    const [file2, setFile2] = React.useState('');

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

    const submitPan = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('panFile', file2)
        axios.put(process.env.REACT_APP_API_URL + `/user/pan/${props.user._id}`, formData, {
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    }
    const updateChanges = async () => {

        axios.put(process.env.REACT_APP_API_URL + `/user`, {

            body: {

                pan: pan,
                dob: dob,
                idSelect: aadhaar,
                idname: `${idSelect}`

            }
        }
        ).then(() => {
            alert('sucess');
        })




    }
    const imageHandler = (e) => {
        setFile1(e.target.files[0])
        const reader = new FileReader();
        console.log(reader)
        reader.onload = () => {
            if (reader.readyState === 2) {
                setimg(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }
    const imageHandler2 = (e) => {
        setFile2(e.target.files[0])
        const reader = new FileReader();
        console.log(reader)
        reader.onload = () => {
            if (reader.readyState === 2) {
                setimg2(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <Container maxWidth="xm">
            <Typography variant="h4">Update Kyc</Typography>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Select Government Id
                </InputLabel>
                <NativeSelect

                    value={idSelect}
                    onChange={(e) => setidSelect(e.target.value)}
                    inputProps={{
                        name: 'Select Govenment Id',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value="none">none</option>
                    <option value="aadhaar">Aadhaar card</option>
                    <option value="voterId">Voter ID</option>
                </NativeSelect>
            </FormControl>
            <TextField
                label={idSelect}
                name={idSelect}
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
            {/*   <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Dob"
                    value={dob}
                    onChange={(newValue) => {
                        setdob(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
                */}
            <FormGroup style={{ display: "flex", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                <input
                    style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "10px" }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => imageHandler(e)}
                />
                {img ? (<img src={img} alt="" id="img" className="img" />) : null}

                <Button variant="outlined" onClick={() => submitFile()}>Upload File</Button>

            </FormGroup>

            <FormGroup style={{ display: "flex", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                <input
                    style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "10px" }}
                    type="file"
                    onChange={(e) => imageHandler2(e)}
                />
                {img2 ? (<img src={img2} alt="" id="img" className="img" />) : null}
                <Button variant="outlined" onClick={(e) => submitPan(e)}>Upload Pan Card</Button>

            </FormGroup>
            <Stack spacing={2} direction="row">
                <Button onClick={() => goto(-1)} variant="text">Go back</Button>
                <Button variant="contained" onClick={() => updateChanges()}>Update</Button>
            </Stack>


        </Container >
    );
};