import React from "react";
import { Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";

const PrivateRoute = (props) => {
  const { isAutenticated } = props;
  return (
    <>
      {isAutenticated && <PublicRoute {...props} />} 
      {!isAutenticated && <Navigate to="/" />} 
    </>
  );
};

export default PrivateRoute;