import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router';
import { accordionClasses } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Home() {
    const history = useNavigate();
    const [tok, setTok] = useState(null);
    const [data, setdata] = useState(null);
    const [loading, setLoading] = useState(false)
    async function populateHome() {
        const req = await fetch( process.env.REACT_APP_API_URL + '/user/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        }).then((req) => {
            const d = req.json();
            setdata(d);
            console.log(data);
        })
    }

    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token);
            setTok(user);
            setLoading(true);
            console.log(tok);
            if (!user) {
                localStorage.removeItem('token')
                history('/');
            }
        }
    }, [])

    if (!loading)
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", height: "100vh" }}><h1 style={{ color: "black" }}>No access ...
                <Link to="/login" > Login</Link>  </h1></div >
        );
    return (
        <div>
            <div style={{ backgroundColor: "#36454f", height: "5vh", fontSize: "0.8em", justifyContent: "center", alignItems: "center", display: "flex" }}>
                TICKER COMES HERE....
            </div>
            <Navbar Token={tok} />
            <div style={{ fontSize: "3rem", color: "black", display: "grid", justifyContent: "center", alignContent: "center", height: "83.5vh" }}> Dashboard </div>

        </div >
    )
}
