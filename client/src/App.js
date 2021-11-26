import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import routes from "./routes";
import './App.css';


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
