import { Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const ProtectedRoute = ({
  onlyAdmin = false,
  onlyInstructor = false,
  onlyStudent = false,
  onlyInstructorAndStudent = false,
}) => {
  // TODO: make a component to handle Authorization message
  // FIXME: Fix layout when goes to mobile for these typographies
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
  if (onlyInstructorAndStudent && auth.user.isAdmin)
    return (
      <Typography>
        You can't access this page (Only Instructors + Students) because it's
        protected
      </Typography>
    );

  return <Outlet />;
};

export default ProtectedRoute;
