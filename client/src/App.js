import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import routes from "./routes";
import './App.css';
import Home from "./pages/home"
import jwt_decode from "jwt-decode";
import { useState } from "react";
function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/home" element={<Home />} />
                {routes.map((route, i) =>
                    <Route

                        key={i}
                        path={route.path}
                        exact={route.exact}
                        element={route.element}
                    />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
