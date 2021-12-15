import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Container from '@mui/material/Container';



export const Names = ({ formData, setForm, navigation, step }) => {
    const { firstName, phone, email, password } = formData;
    return (
        <Container maxWidth="xs">
            <TextField
                label="Mobile Number"
                name="phone"
                value={phone}
                margin="normal"
                disabled
                variant="outlined"
                autoComplete="off"
                fullWidth
            />
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
        </Container>
    );
};
