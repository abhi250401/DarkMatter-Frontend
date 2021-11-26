import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';


import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();
export const Names = ({ formData, setForm, navigation, step }) => {
    const { firstName, phone, email, password } = formData;
    return (


        <Container maxWidth="xs">

            <TextField
                label="Name"
                name="firstName"
                value={firstName}
                onChange={setForm}
                type="name"
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={setForm}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
            <TextField
                label="Phone number"
                name="phone"
                value={phone}
                margin="normal"
                disabled
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
            <TextField
                label="Email"
                name="email"
                value={email}
                type="email"
                onChange={setForm}
                margin="normal"
                variant="outlined"
                autoComplete="off"
                fullWidth
            />

        </Container>



    );
};
