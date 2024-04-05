import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { LoginForm } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import fetchFromAPI from '../../utils/constans/fetchFromApi';
import { getUserBaseURL } from '../../App';

const LoginPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');
  const onLogin = async (loginCredentials, loginType) => {
    try {
      console.log({ loginCredentials });
      const { user, token } = await fetchFromAPI({
        method: 'POST',
        url: `/auth/${loginType}/signin`,
        data: loginCredentials,
      });
      setServerError('');
      setAuth({ user, token });
      localStorage.setItem('token', token);
      navigate(location.state?.from.pathname || getUserBaseURL(user));
    } catch (e) {
      setServerError(e.response.data.message);
      // Ask ahmed if he prefers showing server error inside the component or in a snackbar
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
        flexDirection: 'column',
      }}
    >
      <LoginForm onLogin={onLogin} />
      {serverError && (
        <Typography color="indianred" variant="h6" textTransform="uppercase">
          {serverError}
        </Typography>
      )}
    </Box>
  );
};

export default LoginPage;
