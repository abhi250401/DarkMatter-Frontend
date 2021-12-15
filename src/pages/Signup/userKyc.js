import React from "react";
import TextField from "@material-ui/core/TextField";

import Container from '@mui/material/Container';

import Stack from '@mui/material/Stack';

import { createTheme } from '@mui/material/styles';

export const Address = ({ formData, setForm, navigation, steps }) => {
    const { aadhar, pan, dob } = formData;
    // const stepss = ['Shipping address', 'Payment details', 'Review your order'];

    console.log(steps);
    return (
        <Container maxWidth="xs">

            <TextField
                label="Aadhaar Card"
                name="aadhar"
                value={aadhar}
                onChange={setForm}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
            <TextField
                label="PAN Card"
                name="pan"
                value={pan}
                onChange={setForm}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
            <Stack component="form" noValidate spacing={3}>
                <TextField
                    label="Date of Birth"
                    name="dob"
                    value={dob}
                    onChange={setForm}
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
        </Container>
    );
};