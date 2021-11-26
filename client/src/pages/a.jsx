import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { Names } from "./Signup/checkout";
import { Address } from "./Signup/AddressForm";
import { Contact } from "./Signup/PaymentForm";
import { Review } from "./Signup/Review";
import { Submit } from "./Signup/Submit.jsx";



function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                DarkMatter
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



const theme = createTheme();
const phone = localStorage.getItem("phone_number");
const defaultData = {
    firstName: "",

    plan1: "plan1",
    plan2: "plan2",
    plan3: "plan3",


    pan: "",
    aadhar: "",
    dob: "",
    password: "",
    city: "",
    state: "",
    zip: "",
    phone,
    email: "",
};
export default function Checkout() {
    const [formData, setForm] = useForm(defaultData);
    const [activeStep, setActiveStep] = React.useState(0);

    const steps = ['Profile', 'Kyc', 'Select Plan'];
    const { steep, navigation } = useStep({
        steps,
        initialStep: 0,
    });
    function getStepContent(steps) {

        const props = { formData, setForm, navigation, steep };
        switch (steps) {
            case 0:
                return <Names {...props} />;
            case 1:
                return <Address {...props} />;

            case 2:
                return <Review {...props} />;
            case 3:
                return <Submit {...props} />;
        }
    }
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container component="main" sx={{ height: '100vh' }}>

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Sign-up
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your order.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Your order number is #2001539. We have emailed your order
                                        confirmation, and will send you an update when your order has
                                        shipped.
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {activeStep !== 0 && activeStep !== steps.length && (
                                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                                Back
                                            </Button>
                                        )}
                                        {activeStep !== steps.length - 1 && (


                                            < Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 3, ml: 1 }}
                                            >
                                                Next
                                            </Button>)}
                                    </Box>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                    <Copyright />
                </Container>
            </Grid>
        </ThemeProvider >
    );
}