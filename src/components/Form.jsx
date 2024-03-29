import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import validator from 'validator';
import Ophthalmologist_1 from 'img/opthalmologist_1.jpeg';

const styleClasses = {
  loginWindow: {
    height: '80%',
    width: 'clamp(400px,90%,700px)',
    display: 'flex'
  }
};

const LoginWindow = styled(Paper)({
  ...styleClasses.loginWindow
});

function Form(props) {
  const { mode, formData, onChange, onSubmit, loading } = props;

  const formActions = {
    signIn: {
      heading: 'SIGN IN',
      btnText: 'SIGN IN',
      inputFields: [
        {
          label: 'Email',
          value: formData.email?.value,
          name: 'email',
          type: 'email',
          required: true,
          errorText: 'Invalid email format'
        },
        {
          label: 'Password',
          value: formData.password?.value,
          name: 'password',
          type: 'password',
          required: true,
          errorText: 'Password cannot be empty'
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
          value: formData.name?.value,
          name: 'name',
          type: 'text',
          required: true,
          errorText: 'Name cannot be empty'
        },
        {
          label: 'Email',
          value: formData.email?.value,
          name: 'email',
          type: 'email',
          required: true,
          errorText: 'Invalid email format'
        },
        {
          label: 'Password',
          value: formData.password?.value,
          name: 'password',
          type: 'password',
          required: true,
          errorText: 'Password is too weak'
        },
        {
          label: 'I am a certified ophthalmologist.',
          value: formData.ophthalmologist?.value,
          name: 'ophthalmologist',
          type: 'checkbox'
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

  const isFormValid =
    Object.values(formData).every((inputField) => inputField.isValid) &&
    !loading;
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
            background: `url(${Ophthalmologist_1}) no-repeat`,
            backgroundSize: 'contain'
          }}
        ></Box>
        <Box
          component="form"
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
          {currentForm.inputFields.map(({ errorText, ...data }) => {
            const { isValid, dirty } = formData[data.name];
            const showError = !isValid && dirty;

            if (data.type === 'checkbox') {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={data.value}
                      onChange={onChange}
                      name={data.name}
                    />
                  }
                  label={data.label}
                />
                // <FormGroup>
                // </FormGroup>
              );
            }

            return (
              <TextField
                variant="outlined"
                fullWidth
                {...data}
                onChange={onChange}
                error={showError}
                helperText={showError && errorText}
              />
            );
          })}
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 100 }}
            onClick={onSubmit}
            disabled={!isFormValid}
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
