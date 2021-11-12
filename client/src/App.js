import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import Navbar from './pages/navbar';
import Home from './pages/home';
import { useState } from 'react';
import DarkMode from "./pages/darkmode";
import Phone from "./pages/phone";
import './App.css'
import Signup from "./pages/Signup";
function App() {


  return (
    <BrowserRouter>
      <div>

        <Routes>

          <Route exact path="/" element={<Home />}>
          </Route>

          <Route exact path="/login" element={<Login />}>
          </Route>
          <Route exact path="/signup" element={<Register />}>
          </Route>
          <Route exact path="/phone" element={<Phone />}>
          </Route>
          <Route exact path="/signin" element={<Signup />}>
          </Route>
        </Routes>



      </div ></BrowserRouter>
  );
}

export default App;
