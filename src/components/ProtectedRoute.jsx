import { Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const ProtectedRoute = ({
  onlyAdmin = false,
  onlyInstructor = false,
  onlyStudent = false,
}) => {
  const { auth } = useAuth();
  if (onlyAdmin && !auth.user.isAdmin) {
    return (
      <Typography>
        You can't access this page (Only admins) because it's protected
      </Typography>
    );
  }
  if (onlyInstructor && !auth.user.isInstructor) {
    return (
      <Typography>
        You can't access this page (Only Instructors) because it's protected
      </Typography>
    );
  }
  if (onlyStudent && onlyInstructor && auth.user.isAdmin)
    return (
      <Typography>
        You can't access this page (Only Instructors + Students) because it's
        protected
      </Typography>
    );
  return <Outlet />;
};

export default ProtectedRoute;
