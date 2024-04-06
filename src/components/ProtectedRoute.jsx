import { Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Unauthorized } from ".";

const ProtectedRoute = ({
  onlyAdmin = false,
  onlyInstructor = false,
  onlyStudent = false,
  onlyInstructorAndStudent = false,
}) => {
  const { auth } = useAuth();
  if (onlyAdmin && !auth.user.isAdmin) {
    return (
      <Unauthorized message="You can't access this page (Only admins) because it's protected" />
    );
  }
  if (onlyInstructor && !auth.user.isInstructor) {
    return (
      <Unauthorized message="You can't access this page (Only Instructors) because it's protected" />
    );
  }
  if (onlyStudent && (auth.user.isAdmin || auth.user.isInstructor)) {
    return (
      <Unauthorized message="You can't access this page (Only Students) because it's protected" />
    );
  }
  if (onlyInstructorAndStudent && auth.user.isAdmin)
    return (
      <Unauthorized
        message="You can't access this page (Only Instructors + Students) because it's
      protected"
      />
    );

  return <Outlet />;
};

export default ProtectedRoute;
