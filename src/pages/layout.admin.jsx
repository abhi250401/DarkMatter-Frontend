import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import Navbar from './navbar'
import './home.css'
import { Container } from '@mui/material';
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
            <Container maxWidth="lg" sx={{ mt: 1 }}>

                <Outlet />
            </Container>



        </div>
    )
}
