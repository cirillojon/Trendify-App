import React from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isLoggedIn } from "../tokenStorage";

const PrivateRoute = ({
  redirectPath = '/login',
  children
}) => {

  const location = useLocation();

  return isLoggedIn() ? (
    children ? children : <Outlet />
  ) : (
    <Navigate to={redirectPath} state={{from: location}} replace />
  );
};

export default PrivateRoute;