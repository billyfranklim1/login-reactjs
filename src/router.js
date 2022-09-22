import React, { useEffect, useState } from "react";
import { Routes, BrowserRouter } from "react-router-dom";

import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Index from "./views/Index.js";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";


import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth.js";

const Router = () => {
  console.log("Router");
  const [isAutenticating, setAutnticating] = useState(true); 
  const [childProps, setChildProps] = useState({ isAutenticated: false }); 

  useEffect(() => { 
    const isAuth = localStorage.getItem("token");
    if (isAuth) {
      setChildProps({ isAutenticated: true });
    }
    setAutnticating(false);
  }, []);
  
  return (
    <>
      {!isAutenticating && ( 
        <BrowserRouter>
          <Routes>
              <PublicRoute {...childProps} path="/" element={<Login/>} exact />
              <PublicRoute {...childProps} path="register" element={<Register />} exact/>
              <PublicRoute {...childProps} path="/teste" element={<Index />} exact/>

              <PublicRoute {...childProps} path="/admin/*" element={<Admin />} />
              <PublicRoute {...childProps} path="/auth/*" element={<Auth />} />
              <PrivateRoute {...childProps} path="/home" element={<Home />} exact />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default Router;