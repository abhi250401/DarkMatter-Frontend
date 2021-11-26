import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import './App.css'

import routes from "./routes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
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
