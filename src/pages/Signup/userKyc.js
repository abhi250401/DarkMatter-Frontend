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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
export const Address = ({ formData, setForm, navigation, steps }) => {
    const { aadhar, pan, dob } = formData;
    const [activeStep, setActiveStep] = React.useState(0);
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