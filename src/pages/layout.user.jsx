import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import Navbar from './navbar'
import './home.css'
import Wishlist from '../components/wishlist/wishlist';
export default function Home(props) {
    if (!props.user || !props.user.userID)
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", height: "100vh" }}><h1 style={{ color: "black" }}>No access ...
                <Link to="/login" > Login</Link>  </h1></div >
        );
    return (
        <div>
            <Navbar {...props} />
            <Wishlist {...props} />
            <Grid container component="main" sx={{ height: 'calc( 100vh - )' }} style={{ marginBottom: '10px' }} >


                <Grid item xs={10} sm={8} md={8} component={Paper} elevation={2} square sx={{ mt: 15.4 }} style={{ borderRadius: '8px', border: '3px solid #C3BABA', padding: '10px', color: "#000", position: "relative", zIndex: 1, left: "29%" }}>
                    <Outlet />

                </Grid>
            </Grid>

        </div >
    )
}
