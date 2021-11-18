import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Newlogin';
import Register from './pages/Newregister';
import Navbar from './pages/navbar';
import Home from './pages/home';
import { useState } from 'react';
import Admin from './pages/Admin';
import Phone from "./pages/phone";
import './App.css'
import FirstPage from "./pages/FirstPage";
import Checkout from "./pages/checkout/checkout";
import EditUser from "./pages/Edituser";
function App() {


  return (
    <BrowserRouter>
      <div>

        <Routes>

          <Route exact path="/dashboard" element={<Home />}>
          </Route>
          <Route exact path="/" element={<FirstPage />}>
          </Route>
          <Route exact path="/tracks" element={<Checkout />}>
          </Route>

          <Route exact path="/login" element={<Login />}>
          </Route>
          <Route exact path="/signup" element={<Register />}>
          </Route>
          <Route exact path="/phone" element={<Phone />}>
          </Route>
          <Route exact path="/signin" element={<Phone />}>
          </Route>
          <Route exact path="/edit/:id" element={<EditUser />}>
          </Route>
          <Route exact path="/admin2" element={<Admin />}>
          </Route>
        </Routes>



      </div ></BrowserRouter>
  );
}

export default App;
