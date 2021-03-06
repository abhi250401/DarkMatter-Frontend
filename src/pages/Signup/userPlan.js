import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export const Review = ({ formData, setForm, navigation }) => {
    const { go } = navigation;
    const {
        plan1, plan2, plan3
    } = formData;
    async function registerUser(event) {
        event.preventDefault()

        const response = await fetch(process.env.API_URL + '/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formData
            }),
        })

        const data = await response.json()

        if (data.status === 'ok') {
            console.log('registration success')
        } else {
            alert('error email already exists')
        }
    }

    return (
        <Container maxWidth='sm'>
            <h3>Select Plan </h3>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardName"
                        label="Name on card"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        label="Expiry date"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                    />
                </Grid>
            </Grid>
            <Button
                color="primary"
                variant="contained"
                style={{ marginTop: '1.5rem' }}
                onClick={registerUser}
            >
                Submit
            </Button>

        </Container >
    );
};