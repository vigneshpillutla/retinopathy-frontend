import React, { useState } from 'react';
import validator from 'validator';
import Form from './Form';

function Login() {
  const [formData, setFormData] = useState({
    email: {
      value: '',
      isValid: false,
      dirty: false,
      validate(value) {
        return validator.isEmail(value);
      }
    },
    password: {
      value: '',
      isValid: false,
      dirty: false,
      validate(value) {
        return !validator.isEmpty(value);
      }
    }
  });

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const inputField = prev[name];
      return {
        ...prev,
        [name]: {
          ...inputField,
          value,
          dirty: true,
          isValid: inputField.validate(value)
        }
      };
    });
  };

  return (
    <Form mode="signIn" formData={formData} onChange={handleFormDataChange} />
  );
}

export default Login;
