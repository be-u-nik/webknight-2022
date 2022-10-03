import React from "react";
import { Navigate, useParams } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restProps }) {
  // const routes = useRoutes();
  const { id } = useParams();
  localStorage.setItem("referalFrom", id);
  const isloggedin = false;
  if (isloggedin) {
    return <Component {...restProps} />;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
