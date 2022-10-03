import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restProps }) {
  const isloggedin = false;
  if (isloggedin) {
    return <Component {...restProps} />;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
