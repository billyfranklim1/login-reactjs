import React from "react";
import { Route } from "react-router-dom";
import { deepMerge } from "../helpers/deepMerge";
import renderMergedProps from "./renderMergedProps";

const PublicRoute = ({ ...rest }) => {
     return (
        <Route
        {...rest}
        render={(routeProps) => {
            return renderMergedProps(rest.element, deepMerge(routeProps, rest));
        }}
      />
   );
};

export default PublicRoute;