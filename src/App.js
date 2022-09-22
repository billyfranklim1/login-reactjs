import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";


// layouts

import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth.js";
import Finance from "./layouts/Finance.js";
// views without layouts

import Landing from "./views/Landing.js";
import Profile from "./views/Profile.js";
import Index from "./views/Index.js";

import Category from "./views/finance/Category.js";
import Account from "./views/finance/Account.js";
import Supplier from "./views/finance/Supplier.js";
import Transaction from "./views/finance/Transaction.js";
import FooterAdmin from "./components/Footers/FooterAdmin.js";

import Sidebar from "./components/Sidebar/Sidebar.js";


function App() {

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
      {/* <Sidebar /> */}

      {!isAutenticating && (

        <BrowserRouter>
          <Sidebar />
          <div className="relative md:ml-64 bg-sky-50	min-h-screen flex flex-col">
            <div className=" mx-auto w-full -m-24">
              <Routes>
                {/* add routes with layouts */}
                <PrivateRoute {...childProps} path="/admin/*" element={<Admin />} />
                <PrivateRoute {...childProps} path="/finance/*" element={<Finance />} />


                <PublicRoute {...childProps} path="/auth/*" element={<Auth />} />
                <PublicRoute {...childProps} path="/landing/*" exact element={<Landing />} />
                <PrivateRoute {...childProps} path="/profile/*" exact element={<Profile />} />
                <PublicRoute {...childProps} path="/" exact element={<Index />} />
                {/* add redirect for first page */}
                <Navigate from="*" to="/" />
              </Routes>
            </div>
          <FooterAdmin />

          </div>

        </BrowserRouter>
      )}
    </>
  );
}

export default App;
