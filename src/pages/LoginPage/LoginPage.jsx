import { Box } from '@mui/material';
import React from 'react';
import { LoginForm } from '../../components';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import fetchFromAPI from '../../utils/constans/fetchFromApi';
import { usersBaseURL } from '../../App';

const LoginPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogin = async (loginCredentials, loginType) => {
    try {
      console.log({ loginCredentials });
      // TODO: login request here + storing localStorage token
      const { user, token } = await fetchFromAPI({
        method: 'POST',
        url: `/auth/${loginType}/signin`,
        data: loginCredentials,
      });
      // const currentUserResponse = await fetchFromAPI({
      //   url: "/auth/user/profile",
      //   headers: {
      //     Authorization: `Bearer ${signInResponse.token}`,
      //   },
      // });
      // console.log({ signInResponse, currentUserResponse });
      const userType = user.isAdmin
        ? 'admin'
        : user.isInstructor
        ? 'instructor'
        : 'student';
      setAuth({ user, token });
      localStorage.setItem('token', token);
      navigate(location.state?.to.pathname || usersBaseURL[userType]);
    } catch (e) {
      // TODO:Show snackbar if there is error
      console.log({ loginError: e });
    }
  };
  return (
    <Box
      bgcolor="rgb(245,245,249)"
      sx={{
        height: '100vh',
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoginForm onLogin={onLogin} />
    </Box>
  );
};

export default LoginPage;
