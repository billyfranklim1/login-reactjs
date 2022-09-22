import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Headers/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";




import PublicRoute from "../routes/PublicRoute";
import PrivateRoute from "../routes/PrivateRoute";

// views

import Category from "../views/finance/Category.js";
import Account from "../views/finance/Account.js";
import Supplier from "../views/finance/Supplier.js";
import Transaction from "../views/finance/Transaction.js";


export default function Finance() {
  return (
    <>
      {/* <Sidebar /> */}
      {/* <div className="my-auto h-full md:ml-64 bg-sky-50 min-h-screen flex flex-col"> */}
      {/* <div className="relative md:ml-64 bg-sky-50	"> */}
        {/* <div className="px-4 md:px-10 mx-auto w-full -m-24"> */}
          <Routes>
            <Route path="/transaction" exact element={<Transaction />} />
            <Route path="/category" exact element={<Category />} />
            <Route path="/account" exact element={<Account />} />
            <Route path="/supplier" exact element={<Supplier />} />
            <Navigate from="/admin" to="/admin/dashboard" />
          </Routes>
          {/* <FooterAdmin /> */}

        {/* </div>
      </div> */}

    </>
  );
}
