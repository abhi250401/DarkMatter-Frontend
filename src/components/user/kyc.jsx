import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { FormGroup } from "@material-ui/core";
import { useNavigate } from "react-router";
import { Typography } from "@material-ui/core";
export default function Kyc(props) {

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
    return (
        <Container maxWidth="xm">
            <Typography variant="h4">Update Kyc</Typography>
            <TextField
                label="Aadhaar Card"
                name="aadhar"

                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
            <TextField
                label="PAN Card"
                name="pan"

                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
            <Stack component="form" noValidate spacing={1}>
                <TextField
                    label="Date of Birth"
                    name="dob"

                    margin="normal"
                    type="date"
                    variant="outlined"
                    autoComplete="off"
                    fullWidth
                    defaultValue=""
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Stack>
            <FormGroup style={{ display: "flex", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                <input
                    style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "10px" }}
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button style={{/* width: "100px", marginBottom: "5px", display: "flex", padding: "6px", justifyContent: "center" */ }} onClick={() => submitFile()}> Upload File</button>
            </FormGroup>
            <button>Update</button>
            <button onClick={() => goto(-1)} >go back</button>
        </Container >
    );
};