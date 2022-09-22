// App.css
// import './App.css';
import React, { useState, useEffect } from 'react';
import Contato from './Home';
import Sobre from './Sobre';
import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
// AXIOS
import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Router from './router';

/* Import Custom Routes */
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";



function App() {
  return (
    <Router/>
  );
}

export default App;
