import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Newlogin';
import Register from './pages/Newregister';
import Navbar from './pages/navbar';
import Home from './pages/home';
import Admin from './pages/Admin';
import Phone from "./pages/phone";
import './App.css'
import FirstPage from "./pages/FirstPage";
import Checkout from "./pages/checkout/checkout";
import EditUser from "./pages/Edituser";
import DeleteUser from "./pages/Deleteuser";
import UserProfile from "./pages/UserProfile";
function App() {


  return (
    <BrowserRouter>
      <div>

        <Routes>

          <Route exact path="/home" element={<Home />}>
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
          </Route><Route exact path="/delete/:id" element={<DeleteUser />}>
          </Route>

          <Route exact path="/user/profile" element={<UserProfile />}>
          </Route>
          <Route exact path="/admin/users" element={<Admin />}>
          </Route>
        </Routes>



      </div ></BrowserRouter>
  );
}

export default App;
