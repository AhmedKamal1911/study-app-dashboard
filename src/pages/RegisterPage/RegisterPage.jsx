import { Box } from '@mui/material';
import React from 'react';
import { RegisterForm } from '../../components';

import { useNavigate } from 'react-router-dom';

import fetchFromAPI from '../../utils/constans/fetchFromApi';
import { useAuth } from '../../contexts/authContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const onRegister = async (registerData, endPoint = 'users') => {
    try {
      console.log({ registerData });
      console.log([...registerData.entries()]);
      const response = await fetchFromAPI({
        url: `/${endPoint}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data: registerData,
      });
      console.log({ registerResponse: response });
      // TODO: close Modal and show Alert of success
      navigate('/');
    } catch (e) {
      // TODO: show Alert of failure
      console.log({ loginError: e });
    }
  };
  return (
    <Box
      bgcolor="#f7f7f7"
      sx={{
        height: '100vh',
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <RegisterForm onRegister={onRegister} />
    </Box>
  );
};

export default RegisterPage;
