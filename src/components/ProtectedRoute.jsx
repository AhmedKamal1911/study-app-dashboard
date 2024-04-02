import { Typography } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({ onlyAdmin = false }) => {
  const location = useLocation();
  const { auth } = useAuth();
  if (auth.user) {
    if (onlyAdmin && !auth.user.isAdmin) {
      return (
        <Typography>
          You can't access this page because it's protected
        </Typography>
      );
    }
    return <Outlet />;
  }
  return <Navigate to="/login" replace state={{ to: location }} />;
};

export default ProtectedRoute;
