import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const styleClasses = {
  loginWindow: {
    height: '90%',
    width: 'clamp(400px,90%,700px)',
    display: 'flex'
  }
};

const LoginWindow = styled(Paper)({
  ...styleClasses.loginWindow
});

function Form(props) {
  const { mode, formData, onChange, onSubmit } = props;

  const formActions = {
    signIn: {
      heading: 'SIGN IN',
      btnText: 'SIGN IN',
      inputFields: [
        {
          label: 'Email',
          value: formData.email,
          name: 'email'
        },
        {
          label: 'Password',
          value: formData.password,
          name: 'password'
        }
      ],
      redirectText: (
        <Typography variant="subtitle2" color="textSecondary" align="center">
          DON'T HAVE AN ACCOUNT?{'  '}
          <Link to="/sign-up">SIGN UP</Link>
        </Typography>
      )
    },
    signUp: {
      heading: 'SIGN UP',
      btnText: 'SIGN UP',
      inputFields: [
        {
          label: 'Name',
          value: formData.name,
          name: 'name'
        },
        {
          label: 'Email',
          value: formData.email,
          name: 'email'
        },
        {
          label: 'Password',
          value: formData.password,
          name: 'password'
        }
      ],
      redirectText: (
        <Typography variant="subtitle2" color="textSecondary" align="center">
          ALREADY HAVE AN ACCOUNT?{'  '}
          <Link to="/sign-in">SIGN IN</Link>
        </Typography>
      )
    }
  };

  const currentForm = formActions[mode];
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LoginWindow elevation={3}>
        <Box
          sx={{
            width: '50%',
            display: {
              xs: 'none',
              md: 'block'
            },
            background: 'gray'
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
            flexGrow: 1,
            padding: 2
          }}
        >
          <Typography variant="h5" align="center">
            {currentForm.heading}
          </Typography>
          {currentForm.inputFields.map((data) => (
            <TextField
              variant="outlined"
              fullWidth
              {...data}
              onChange={onChange}
            />
          ))}
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 100 }}
            onClick={onSubmit}
          >
            {currentForm.btnText}
          </Button>
          {currentForm.redirectText}
        </Box>
      </LoginWindow>
    </Box>
  );
}

export default Form;
