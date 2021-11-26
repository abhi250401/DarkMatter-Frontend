import React from "react";

import TextField from "@material-ui/core/TextField";

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';


import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();
export const Contact = ({ formData, setForm, navigation, steps }) => {
    const { phone, email } = formData;
    const [activeStep, setActiveStep] = React.useState(0);
    return (


        <Container maxWidth="xs">

            <TextField
                label="Phone"
                name="phone"
                value={phone}
                onChange={setForm}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
            <TextField
                label="E-Mail"
                name="email"
                value={email}
                onChange={setForm}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />

        </Container>

    );
};