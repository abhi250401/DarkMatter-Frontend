import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";
import routes from './routes';
import './App.css';

const AppRoutes = () => {
  return useRoutes( routes );
};

function App() {
    return (
        <Router>
            <Suspense fallback={<div style={{ backgroundColor: '#191919', color : '#999', height : '100vh', display : 'flex', alignItems : 'center', justifyContent : 'center' }}>Loading...</div>}>
                <AppRoutes />
            </Suspense>
        </Router>
    );
}
export default App;
