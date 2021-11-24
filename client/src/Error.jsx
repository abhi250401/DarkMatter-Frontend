import React from 'react'
import Navbar from './pages/navbar';

const PageNotFound = () => {
    return (
        <div id="wrapper">
            <Navbar />
            <div id="info" style={{ textAlign: "center", color : '#000' }}>
                <h1>OOPS! Page Not Found</h1>
                <h3 style={{ color : '#979797' }}>ERROR: 404</h3>
                <p>This page could not be found</p>
                <img src="/images/error-404.png" style={{ height : '30vw' }}/>
            </div>
        </div >
    )
}
export default PageNotFound;