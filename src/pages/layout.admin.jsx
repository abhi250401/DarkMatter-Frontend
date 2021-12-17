import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import Navbar from './navbar'

export default function Home(props) {
    if (!props.user || !props.user.userID)
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", height: "100vh" }}><h1 style={{ color: "black" }}>No access ...
                <Link to="/login" > Login</Link>  </h1></div >
        );
    return (
        <div>
            <Navbar {...props} />
            <Grid container component="main" sx={{ height: 'calc( 100vh - 102px )' }}>


                <Outlet />

            </Grid>

        </div>
    )
}
