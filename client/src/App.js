import React, { Suspense } from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import routes from "./routes";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div style={{ backgroundColor: '#000', color : '#fff', height : '100vh', display : 'flex', alignItems : 'center', justifyContent : 'center' }}>Loading...</div>}>
                <Routes>
                    {routes.map((route, i) =>
                    <Route
                        key={i}
                        path={route.path}
                        element={route.element}
                    />
                    )}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
export default App;
