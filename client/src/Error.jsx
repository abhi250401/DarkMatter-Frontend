import React from 'react'
import Navbar from "./pages/navbar"
const PageNotFound = () => {
    return (
        <div id="wrapper">
            <Navbar />
            <img src="https://i.imgur.com/qIufhof.png" />
            <div id="info">
                <h3>This page could not be found</h3>
            </div>
        </div >
    )
}
export default PageNotFound;