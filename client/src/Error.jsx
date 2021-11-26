import React from 'react'
<<<<<<< HEAD
import Navbar from "./pages/navbar"
=======
import Navbar from './pages/navbar';

>>>>>>> 7e7e6a8083338775b2e562e15bae3da3e0df57dc
const PageNotFound = () => {
    return (
        <div id="wrapper">
            <Navbar />
<<<<<<< HEAD
            <img src="https://i.imgur.com/qIufhof.png" />
            <div id="info">
                <h3>This page could not be found</h3>
=======
            <div id="info" style={{ textAlign: "center", color : '#000' }}>
                <h1>OOPS! Page Not Found</h1>
                <h3 style={{ color : '#979797' }}>ERROR: 404</h3>
                <p>This page could not be found</p>
                <img src="/images/error-404.png" style={{ height : '30vw' }}/>
>>>>>>> 7e7e6a8083338775b2e562e15bae3da3e0df57dc
            </div>
        </div >
    )
}
export default PageNotFound;